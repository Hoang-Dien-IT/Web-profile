const express = require('express');
const router = express.Router();
const {
  getEducation,
  getSingleEducation,
  createEducation,
  updateEducation,
  deleteEducation
} = require('../controllers/educationController');
const { validate, schemas } = require('../middleware/validation');

// Public routes
router.get('/', getEducation);
router.get('/:id', getSingleEducation);

// Private routes (add authentication middleware when needed)
router.post('/', validate(schemas.education), createEducation);
router.put('/:id', validate(schemas.education), updateEducation);
router.delete('/:id', deleteEducation);

module.exports = router;