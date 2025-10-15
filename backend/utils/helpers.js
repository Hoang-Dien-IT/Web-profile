// Utility functions for the portfolio backend

/**
 * Generate a slug from a string
 * @param {string} text - The text to slugify
 * @returns {string} - The slugified text
 */
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

/**
 * Calculate reading time for text
 * @param {string} text - The text to analyze
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} - Reading time in minutes
 */
const calculateReadingTime = (text, wordsPerMinute = 200) => {
  const wordCount = text.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
};

/**
 * Format date for display
 * @param {Date} date - The date to format
 * @param {string} locale - The locale for formatting (default: 'en-US')
 * @returns {string} - Formatted date string
 */
const formatDate = (date, locale = 'en-US') => {
  if (!date) return '';
  
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date (optional)
 * @param {boolean} isCurrent - Whether the period is ongoing
 * @returns {string} - Formatted date range
 */
const formatDateRange = (startDate, endDate, isCurrent = false) => {
  const start = formatDate(startDate);
  
  if (isCurrent || !endDate) {
    return `${start} - Present`;
  }
  
  const end = formatDate(endDate);
  return `${start} - ${end}`;
};

/**
 * Calculate duration between two dates
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date (optional, defaults to now)
 * @returns {Object} - Duration object with years and months
 */
const calculateDuration = (startDate, endDate = new Date()) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months };
};

/**
 * Format duration for display
 * @param {Object} duration - Duration object from calculateDuration
 * @returns {string} - Formatted duration string
 */
const formatDuration = (duration) => {
  const { years, months } = duration;
  
  if (years === 0 && months === 0) {
    return 'Less than 1 month';
  }
  
  const yearStr = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
  const monthStr = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
  
  if (years > 0 && months > 0) {
    return `${yearStr} ${monthStr}`;
  }
  
  return yearStr || monthStr;
};

/**
 * Generate color palette based on a base color
 * @param {string} baseColor - Base color in hex format
 * @returns {Object} - Color palette object
 */
const generateColorPalette = (baseColor) => {
  // Simple color manipulation (in a real app, you'd use a proper color library)
  const lighten = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };
  
  const darken = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  };
  
  return {
    primary: baseColor,
    light: lighten(baseColor, 20),
    lighter: lighten(baseColor, 40),
    dark: darken(baseColor, 20),
    darker: darken(baseColor, 40)
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitize HTML content
 * @param {string} html - HTML string to sanitize
 * @returns {string} - Sanitized HTML
 */
const sanitizeHtml = (html) => {
  if (!html) return '';
  
  // Basic HTML sanitization (in production, use a proper library like DOMPurify)
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Generate pagination metadata
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {number} total - Total items
 * @returns {Object} - Pagination metadata
 */
const generatePagination = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = parseInt(page);
  
  return {
    currentPage,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
    prevPage: currentPage > 1 ? currentPage - 1 : null
  };
};

/**
 * Generate API response format
 * @param {boolean} success - Success status
 * @param {*} data - Response data
 * @param {string} message - Optional message
 * @param {Object} meta - Optional metadata
 * @returns {Object} - Formatted API response
 */
const apiResponse = (success, data = null, message = '', meta = {}) => {
  const response = { success };
  
  if (data !== null) {
    response.data = data;
  }
  
  if (message) {
    response.message = message;
  }
  
  if (Object.keys(meta).length > 0) {
    response.meta = meta;
  }
  
  return response;
};

module.exports = {
  slugify,
  calculateReadingTime,
  formatDate,
  formatDateRange,
  calculateDuration,
  formatDuration,
  generateColorPalette,
  isValidEmail,
  sanitizeHtml,
  generatePagination,
  apiResponse
};