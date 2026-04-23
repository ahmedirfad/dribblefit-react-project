const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const total = await Product.countDocuments();
    const onCloudinary = await Product.countDocuments({
      image: { $regex: '^https://res.cloudinary.com' }
    });
    
    console.log(`Total products: ${total}`);
    console.log(`On Cloudinary: ${onCloudinary}`);
    console.log(`Not on Cloudinary: ${total - onCloudinary}`);
    
    if (total === onCloudinary) {
      console.log('🎉 All products successfully migrated to Cloudinary!');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

verify();