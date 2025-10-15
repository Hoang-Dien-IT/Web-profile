const Profile = require('../models/Profile');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

// @desc    Get profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ isActive: true });
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: { message: 'Profile not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update profile
// @route   POST /api/profile
// @access  Private (if authentication is added)
const createOrUpdateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    
    if (profile) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      // Create new profile
      profile = await Profile.create(req.body);
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload avatar
// @route   POST /api/profile/avatar
// @access  Private
const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: { message: 'No file uploaded' }
      });
    }

    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: { message: 'Profile not found' }
      });
    }

    // Delete old avatar if exists
    if (profile.avatar) {
      try {
        await deleteFromCloudinary(profile.avatar);
      } catch (deleteError) {
        console.log('Error deleting old avatar:', deleteError);
      }
    }

    // Upload new avatar
    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    profile.avatar = avatarUrl;
    await profile.save();

    res.status(200).json({
      success: true,
      data: {
        avatar: avatarUrl,
        message: 'Avatar uploaded successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload resume
// @route   POST /api/profile/resume
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: { message: 'No file uploaded' }
      });
    }

    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: { message: 'Profile not found' }
      });
    }

    // Delete old resume if exists
    if (profile.resume) {
      try {
        await deleteFromCloudinary(profile.resume);
      } catch (deleteError) {
        console.log('Error deleting old resume:', deleteError);
      }
    }

    // Upload new resume
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;
    profile.resume = resumeUrl;
    await profile.save();

    res.status(200).json({
      success: true,
      data: {
        resume: resumeUrl,
        message: 'Resume uploaded successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get profile stats
// @route   GET /api/profile/stats
// @access  Public
const getProfileStats = async (req, res, next) => {
  try {
    const Project = require('../models/Project');
    const Experience = require('../models/Experience');
    const Skill = require('../models/Skill');

    const [projectCount, experienceCount, skillCount] = await Promise.all([
      Project.countDocuments({ isActive: true }),
      Experience.countDocuments({ isActive: true }),
      Skill.countDocuments({ isActive: true })
    ]);

    // Calculate years of experience
    const experiences = await Experience.find({ isActive: true }).sort({ startDate: 1 });
    let totalExperience = 0;
    if (experiences.length > 0) {
      const firstJob = experiences[0].startDate;
      const now = new Date();
      totalExperience = Math.floor((now - firstJob) / (365.25 * 24 * 60 * 60 * 1000));
    }

    const stats = {
      projectsCompleted: projectCount,
      yearsOfExperience: totalExperience,
      technicalSkills: skillCount,
      workExperiences: experienceCount
    };

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  createOrUpdateProfile,
  uploadAvatar,
  uploadResume,
  getProfileStats
};