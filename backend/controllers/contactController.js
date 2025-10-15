const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Email transporter configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res, next) => {
  try {
    // Get client info
    const clientInfo = {
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    };

    // Create contact record
    const contact = await Contact.create({
      ...req.body,
      ...clientInfo
    });

    // Send notification email to admin
    try {
      await sendNotificationEmail(contact);
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // Don't fail the request if email fails
    }

    // Send confirmation email to user
    try {
      await sendConfirmationEmail(contact);
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      success: true,
      data: {
        message: 'Message sent successfully! I\'ll get back to you soon.',
        id: contact._id
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private
const getContacts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isSpam: false };
    
    if (status) query.status = status;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const contacts = await Contact.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-userAgent -ipAddress')
      .exec();

    const totalContacts = await Contact.countDocuments(query);
    const totalPages = Math.ceil(totalContacts / limit);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalContacts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single contact
// @route   GET /api/contact/:id
// @access  Private
const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: { message: 'Contact not found' }
      });
    }

    // Mark as read
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private
const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Invalid status' }
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: { message: 'Contact not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reply to contact
// @route   POST /api/contact/:id/reply
// @access  Private
const replyToContact = async (req, res, next) => {
  try {
    const { message } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: { message: 'Contact not found' }
      });
    }

    // Send reply email
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for contacting me!</h2>
          <p>Hi ${contact.name},</p>
          <p>${message}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            This is a reply to your message: "${contact.subject}"
          </p>
          <p style="color: #666; font-size: 14px;">
            Original message sent on: ${contact.createdAt.toLocaleDateString()}
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    // Update contact status
    contact.status = 'replied';
    await contact.save();

    res.status(200).json({
      success: true,
      data: {
        message: 'Reply sent successfully',
        contact
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark contact as spam
// @route   PUT /api/contact/:id/spam
// @access  Private
const markAsSpam = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isSpam: true, status: 'closed' },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: { message: 'Contact not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: { message: 'Contact marked as spam' }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get contact statistics
// @route   GET /api/contact/stats
// @access  Private
const getContactStats = async (req, res, next) => {
  try {
    const [
      totalContacts,
      newContacts,
      repliedContacts,
      spamContacts
    ] = await Promise.all([
      Contact.countDocuments({ isSpam: false }),
      Contact.countDocuments({ status: 'new', isSpam: false }),
      Contact.countDocuments({ status: 'replied', isSpam: false }),
      Contact.countDocuments({ isSpam: true })
    ]);

    // Get contacts by month for the last 12 months
    const monthlyStats = await Contact.aggregate([
      {
        $match: {
          isSpam: false,
          createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalContacts,
        newContacts,
        repliedContacts,
        spamContacts,
        monthlyStats
      }
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to send notification email
const sendNotificationEmail = async (contact) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission: ${contact.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px;">
          <p><strong>Name:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${contact.company || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Project Type:</strong> ${contact.projectType}</p>
          <p><strong>Budget:</strong> ${contact.budget}</p>
          <p><strong>Timeline:</strong> ${contact.timeline}</p>
        </div>
        <div style="margin-top: 20px;">
          <h3>Message:</h3>
          <p style="background: #fff; padding: 15px; border-left: 4px solid #007bff; margin: 0;">
            ${contact.message}
          </p>
        </div>
        <div style="margin-top: 20px; font-size: 12px; color: #666;">
          <p>Sent from: ${contact.ipAddress}</p>
          <p>User Agent: ${contact.userAgent}</p>
          <p>Timestamp: ${contact.createdAt}</p>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

// Helper function to send confirmation email
const sendConfirmationEmail = async (contact) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: contact.email,
    subject: 'Thank you for contacting me!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Thank you for your message!</h2>
        <p>Hi ${contact.name},</p>
        <p>Thank you for reaching out! I've received your message about "${contact.subject}" and I'll get back to you as soon as possible.</p>
        <p>I typically respond within 24-48 hours during business days.</p>
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Your Message Summary:</h3>
          <p><strong>Subject:</strong> ${contact.subject}</p>
          <p><strong>Project Type:</strong> ${contact.projectType}</p>
          <p><strong>Timeline:</strong> ${contact.timeline}</p>
        </div>
        <p>Best regards,<br>Your Name</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  replyToContact,
  markAsSpam,
  getContactStats
};