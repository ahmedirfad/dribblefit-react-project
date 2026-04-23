const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

// Image storage (for product images and home section images)
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dribblefit/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }]
  }
});

// Video storage (for Mexico De Oro video)
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'dribblefit/videos',
    resource_type: 'video',  // Important for videos
    allowed_formats: ['mp4', 'mov', 'avi', 'webm', 'mkv'],
    transformation: [{ width: 1920, height: 1080, crop: 'limit' }]
  }
});

const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit for videos
});

module.exports = { uploadImage, uploadVideo };