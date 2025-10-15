const express = require('express');
const router = express.Router();
const {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
  getSkillsByCategory,
  getSkillStats
} = require('../controllers/skillController');
const { validate, schemas } = require('../middleware/validation');

// Public routes
router.get('/', getSkills);
router.get('/stats', getSkillStats);
router.get('/category/:category', getSkillsByCategory);
router.get('/:id', getSkill);

// Private routes (add authentication middleware when needed)
router.post('/', validate(schemas.skill), createSkill);
router.put('/:id', validate(schemas.skill), updateSkill);
router.delete('/:id', deleteSkill);

module.exports = router;