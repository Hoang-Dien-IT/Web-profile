const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  getFeaturedProjects,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectImages,
  getProjectsByCategory
} = require('../controllers/projectController');
const { validate, schemas } = require('../middleware/validation');
const uploadConfigs = require('../middleware/upload');

// Public routes
router.get('/', getProjects);
router.get('/featured', getFeaturedProjects);
router.get('/category/:category', getProjectsByCategory);
router.get('/:id', getProject);

// Private routes (add authentication middleware when needed)
router.post('/', validate(schemas.project), createProject);
router.put('/:id', validate(schemas.project), updateProject);
router.delete('/:id', deleteProject);
router.post('/:id/images', uploadConfigs.projectImages, uploadProjectImages);

module.exports = router;