const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res, next) => {
  try {
    const { sort = '-startDate' } = req.query;

    const experiences = await Experience.find({ isActive: true })
      .sort(sort);

    res.status(200).json({
      success: true,
      data: experiences
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single experience
// @route   GET /api/experience/:id
// @access  Public
const getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience || !experience.isActive) {
      return res.status(404).json({
        success: false,
        error: { message: 'Experience not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create experience
// @route   POST /api/experience
// @access  Private
const createExperience = async (req, res, next) => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private
const updateExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: { message: 'Experience not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: experience
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        error: { message: 'Experience not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: { message: 'Experience deleted successfully' }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
};