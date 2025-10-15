const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary (if credentials provided)
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

/**
 * Upload image to Cloudinary
 * @param {string} filePath - Local file path
 * @param {string} folder - Cloudinary folder name
 * @returns {Object} - Cloudinary upload result
 */
const uploadToCloudinary = async (filePath, folder = 'portfolio') => {
  try {
    // If Cloudinary is not configured, return local file info
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return {
        secure_url: `/uploads/${filePath.split('/').pop()}`,
        public_id: filePath.split('/').pop(),
        local: true
      };
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    });

    // Delete local file after upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return result;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    
    // Fallback to local storage
    return {
      secure_url: `/uploads/${filePath.split('/').pop()}`,
      public_id: filePath.split('/').pop(),
      local: true,
      error: error.message
    };
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Object} - Delete result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    // If Cloudinary is not configured or local file, skip
    if (!process.env.CLOUDINARY_CLOUD_NAME || !publicId || publicId.includes('/uploads/')) {
      return { result: 'ok', local: true };
    }

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return { error: error.message };
  }
};

/**
 * Get optimized image URL
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized image URL
 */
const getOptimizedImageUrl = (publicId, options = {}) => {
  try {
    if (!process.env.CLOUDINARY_CLOUD_NAME || publicId.includes('/uploads/')) {
      return publicId;
    }

    const defaultOptions = {
      quality: 'auto',
      fetch_format: 'auto',
      width: 800,
      height: 600,
      crop: 'limit'
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    return cloudinary.url(publicId, finalOptions);
  } catch (error) {
    console.error('Cloudinary URL error:', error);
    return publicId;
  }
};

/**
 * Generate multiple image sizes
 * @param {string} publicId - Cloudinary public ID
 * @returns {Object} - Different image sizes
 */
const generateImageSizes = (publicId) => {
  if (!process.env.CLOUDINARY_CLOUD_NAME || publicId.includes('/uploads/')) {
    return {
      thumbnail: publicId,
      medium: publicId,
      large: publicId,
      original: publicId
    };
  }

  return {
    thumbnail: cloudinary.url(publicId, {
      width: 150,
      height: 150,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto'
    }),
    medium: cloudinary.url(publicId, {
      width: 400,
      height: 300,
      crop: 'limit',
      quality: 'auto',
      fetch_format: 'auto'
    }),
    large: cloudinary.url(publicId, {
      width: 800,
      height: 600,
      crop: 'limit',
      quality: 'auto',
      fetch_format: 'auto'
    }),
    original: cloudinary.url(publicId, {
      quality: 'auto',
      fetch_format: 'auto'
    })
  };
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  getOptimizedImageUrl,
  generateImageSizes,
  cloudinary
};