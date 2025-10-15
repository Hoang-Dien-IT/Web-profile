const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts,
  getContact,
  updateContactStatus,
  replyToContact,
  markAsSpam,
  getContactStats
} = require('../controllers/contactController');
const { validate, schemas } = require('../middleware/validation');
const rateLimit = require('express-rate-limit');

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    error: {
      message: 'Too many contact form submissions, please try again later.'
    }
  }
});

// Public routes
router.post('/', contactLimiter, validate(schemas.contact), submitContact);

// Private routes (add authentication middleware when needed)
router.get('/', getContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContact);
router.put('/:id/status', updateContactStatus);
router.post('/:id/reply', replyToContact);
router.put('/:id/spam', markAsSpam);

module.exports = router;