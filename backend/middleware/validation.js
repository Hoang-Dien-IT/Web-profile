const Joi = require('joi');

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation Error',
          details: errors
        }
      });
    }
    
    next();
  };
};

// Common validation schemas
const schemas = {
  // Profile validation
  profile: Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    title: Joi.string().min(5).max(100).required(),
    bio: Joi.string().min(10).max(1000).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/).optional(),
    location: Joi.object({
      city: Joi.string().min(2).max(50),
      country: Joi.string().min(2).max(50)
    }).optional(),
    socialLinks: Joi.object({
      github: Joi.string().uri().optional(),
      linkedin: Joi.string().uri().optional(),
      twitter: Joi.string().uri().optional(),
      instagram: Joi.string().uri().optional(),
      facebook: Joi.string().uri().optional(),
      website: Joi.string().uri().optional()
    }).optional()
  }),

  // Project validation
  project: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(500).required(),
    longDescription: Joi.string().max(2000).optional(),
    technologies: Joi.array().items(Joi.string()).min(1).required(),
    category: Joi.string().valid('web', 'mobile', 'desktop', 'api', 'other').required(),
    status: Joi.string().valid('completed', 'in-progress', 'planned').optional(),
    featured: Joi.boolean().optional(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
    links: Joi.object({
      demo: Joi.string().uri().optional(),
      github: Joi.string().uri().optional(),
      live: Joi.string().uri().optional()
    }).optional(),
    displayOrder: Joi.number().integer().min(0).optional()
  }),

  // Skill validation
  skill: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    category: Joi.string().valid('frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills', 'other').required(),
    proficiency: Joi.number().integer().min(1).max(100).required(),
    yearsOfExperience: Joi.number().min(0).max(50).optional(),
    color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).optional(),
    description: Joi.string().max(300).optional(),
    displayOrder: Joi.number().integer().min(0).optional()
  }),

  // Experience validation
  experience: Joi.object({
    company: Joi.string().min(2).max(100).required(),
    position: Joi.string().min(2).max(100).required(),
    employmentType: Joi.string().valid('full-time', 'part-time', 'contract', 'internship', 'freelance').required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
    isCurrent: Joi.boolean().optional(),
    description: Joi.string().min(10).max(1000).required(),
    achievements: Joi.array().items(Joi.string().max(200)).optional(),
    technologies: Joi.array().items(Joi.string()).optional(),
    location: Joi.object({
      city: Joi.string().min(2).max(50),
      country: Joi.string().min(2).max(50)
    }).optional(),
    companyWebsite: Joi.string().uri().optional(),
    displayOrder: Joi.number().integer().min(0).optional()
  }),

  // Education validation
  education: Joi.object({
    institution: Joi.string().min(2).max(100).required(),
    degree: Joi.string().min(2).max(100).required(),
    field: Joi.string().min(2).max(100).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).optional(),
    isCurrent: Joi.boolean().optional(),
    gpa: Joi.number().min(0).max(4).optional(),
    description: Joi.string().max(500).optional(),
    achievements: Joi.array().items(Joi.string().max(200)).optional(),
    relevantCourses: Joi.array().items(Joi.string()).optional(),
    location: Joi.object({
      city: Joi.string().min(2).max(50),
      country: Joi.string().min(2).max(50)
    }).optional(),
    institutionWebsite: Joi.string().uri().optional(),
    displayOrder: Joi.number().integer().min(0).optional()
  }),

  // Contact validation
  contact: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(5).max(200).required(),
    message: Joi.string().min(10).max(2000).required(),
    phone: Joi.string().pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/).optional(),
    company: Joi.string().max(100).optional(),
    projectType: Joi.string().valid('web-development', 'mobile-app', 'consultation', 'collaboration', 'other').optional(),
    budget: Joi.string().valid('under-1k', '1k-5k', '5k-10k', '10k-plus', 'not-specified').optional(),
    timeline: Joi.string().valid('asap', '1-month', '1-3months', '3-6months', 'flexible').optional()
  })
};

module.exports = {
  validate,
  schemas
};