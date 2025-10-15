const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      featured,
      search,
      sort = '-createdAt'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured === 'true';
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Execute query with pagination
    const projects = await Project.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalProjects = await Project.countDocuments(query);
    const totalPages = Math.ceil(totalProjects / limit);

    res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProjects,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project || !project.isActive) {
      return res.status(404).json({
        success: false,
        error: { message: 'Project not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ 
      isActive: true, 
      featured: true 
    })
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(6);

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { message: 'Project not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        error: { message: 'Project not found' }
      });
    }

    res.status(200).json({
      success: true,
      data: { message: 'Project deleted successfully' }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload project images
// @route   POST /api/projects/:id/images
// @access  Private
const uploadProjectImages = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'No files uploaded' }
      });
    }

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        error: { message: 'Project not found' }
      });
    }

    // Process uploaded images
    const newImages = req.files.map((file, index) => ({
      url: `/uploads/projects/${file.filename}`,
      alt: `${project.title} - Image ${index + 1}`,
      isPrimary: index === 0 && project.images.length === 0
    }));

    project.images.push(...newImages);
    await project.save();

    res.status(200).json({
      success: true,
      data: {
        images: newImages,
        message: 'Images uploaded successfully'
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get projects by category
// @route   GET /api/projects/category/:category
// @access  Public
const getProjectsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const projects = await Project.find({ 
      category, 
      isActive: true 
    })
    .sort({ displayOrder: 1, createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit);

    const totalProjects = await Project.countDocuments({ category, isActive: true });

    res.status(200).json({
      success: true,
      data: projects,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProjects / limit),
        totalProjects
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  getProject,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages,
  getProjectsByCategory
};