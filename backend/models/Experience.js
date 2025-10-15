const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: String,
    country: String
  },
  employmentType: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship', 'freelance'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  isCurrent: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  achievements: [{
    type: String,
    maxlength: 200
  }],
  technologies: [{
    type: String
  }],
  companyLogo: {
    type: String,
    default: null
  },
  companyWebsite: {
    type: String
  },
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
experienceSchema.index({ startDate: -1, displayOrder: 1 });

module.exports = mongoose.model('Experience', experienceSchema);