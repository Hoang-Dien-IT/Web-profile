const Education = require('../models/Education');

// @desc    Get all education
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res, next) => {
  try {
    const { sort = '-startDate' } = req.query;

    const education = await Education.find({ isActive: true })
      .sort(sort);

    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single education
// @route   GET /api/education/:id
// @access  Public
const getSingleEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education || !education.isActive) {
      return res.status(404).json({
        success: false,
        error: { message: 'Education not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create education
// @route   POST /api/education
// @access  Private
const createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      data: education
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update education
// @route   PUT /api/education/:id
// @access  Private
const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        error: { message: 'Education not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: education
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education
// @route   DELETE /api/education/:id
// @access  Private
const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!education) {
      return res.status(404).json({
        success: false,
        error: { message: 'Education not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: { message: 'Education deleted successfully' }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  getSingleEducation,
  createEducation,
  updateEducation,
  deleteEducation
};