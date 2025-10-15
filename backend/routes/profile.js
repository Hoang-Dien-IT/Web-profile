const express = require('express');
const router = express.Router();
const {
  getProfile,
  createOrUpdateProfile,
  uploadAvatar,
  uploadResume,
  getProfileStats
} = require('../controllers/profileController');
const { validate, schemas } = require('../middleware/validation');
const uploadConfigs = require('../middleware/upload');

// Public routes
router.get('/', getProfile);
router.get('/stats', getProfileStats);

// Private routes (add authentication middleware when needed)
router.post('/', validate(schemas.profile), createOrUpdateProfile);
router.post('/avatar', uploadConfigs.avatar, uploadAvatar);
router.post('/resume', uploadConfigs.resume, uploadResume);

module.exports = router;