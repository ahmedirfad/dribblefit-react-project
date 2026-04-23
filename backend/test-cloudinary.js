require('dotenv').config();
const cloudinary = require('./config/cloudinary');

console.log('Testing Cloudinary...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY);
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '****' : 'Missing');

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('❌ Cloudinary connection failed:', error.message);
  } else {
    console.log('✅ Cloudinary connected successfully!', result);
  }
});