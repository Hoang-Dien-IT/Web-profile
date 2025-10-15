const express = require('express');
const router = express.Router();
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience
} = require('../controllers/experienceController');
const { validate, schemas } = require('../middleware/validation');

// Public routes
router.get('/', getExperiences);
router.get('/:id', getExperience);

// Private routes (add authentication middleware when needed)
router.post('/', validate(schemas.experience), createExperience);
router.put('/:id', validate(schemas.experience), updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;