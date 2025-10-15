const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: {
    type: String,
    required: true,
    trim: true
  },
  degree: {
    type: String,
    required: true,
    trim: true
  },
  field: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    city: String,
    country: String
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
  gpa: {
    type: Number,
    min: 0,
    max: 4
  },
  description: {
    type: String,
    maxlength: 500
  },
  achievements: [{
    type: String,
    maxlength: 200
  }],
  relevantCourses: [{
    type: String
  }],
  institutionLogo: {
    type: String,
    default: null
  },
  institutionWebsite: {
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
educationSchema.index({ startDate: -1, displayOrder: 1 });

module.exports = mongoose.model('Education', educationSchema);