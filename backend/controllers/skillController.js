const Skill = require('../models/Skill');

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
const getSkills = async (req, res, next) => {
  try {
    const { category, sort = 'displayOrder' } = req.query;

    // Build query
    const query = { isActive: true };
    if (category) query.category = category;

    const skills = await Skill.find(query).sort(sort);

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: {
        skills,
        skillsByCategory,
        totalSkills: skills.length
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single skill
// @route   GET /api/skills/:id
// @access  Public
const getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill || !skill.isActive) {
      return res.status(404).json({
        success: false,
        error: { message: 'Skill not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create skill
// @route   POST /api/skills
// @access  Private
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: { message: 'Skill not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!skill) {
      return res.status(404).json({
        success: false,
        error: { message: 'Skill not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: { message: 'Skill deleted successfully' }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get skills by category
// @route   GET /api/skills/category/:category
// @access  Public
const getSkillsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    
    const skills = await Skill.find({ 
      category, 
      isActive: true 
    }).sort({ displayOrder: 1, name: 1 });

    res.status(200).json({
      success: true,
      data: skills
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get skill statistics
// @route   GET /api/skills/stats
// @access  Public
const getSkillStats = async (req, res, next) => {
  try {
    const stats = await Skill.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgProficiency: { $avg: '$proficiency' },
          maxProficiency: { $max: '$proficiency' },
          totalYearsExp: { $sum: '$yearsOfExperience' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const totalSkills = await Skill.countDocuments({ isActive: true });
    const avgOverallProficiency = await Skill.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avg: { $avg: '$proficiency' } } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalSkills,
        avgOverallProficiency: avgOverallProficiency[0]?.avg || 0,
        categoryStats: stats
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillsByCategory,
  getSkillStats
};