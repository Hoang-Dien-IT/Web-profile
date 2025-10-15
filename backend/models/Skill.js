const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'soft-skills', 'other'],
    required: true
  },
  proficiency: {
    type: Number,
    min: 1,
    max: 100,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    min: 0,
    default: 0
  },
  icon: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: '#3498db'
  },
  description: {
    type: String,
    maxlength: 300
  },
  certifications: [{
    name: String,
    issuer: String,
    date: Date,
    url: String
  }],
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
skillSchema.index({ category: 1, displayOrder: 1 });

module.exports = mongoose.model('Skill', skillSchema);