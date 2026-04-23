const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const Product = require('../models/Product');

const fixPaths = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const products = await Product.find({
      image: { $not: { $regex: '^https://res.cloudinary.com' } }
    });
    
    console.log(`Found ${products.length} products not on Cloudinary:\n`);
    
    let updated = 0;
    
    for (const product of products) {
      let oldImage = product.image;
      let newImage = oldImage;
      
      // Fix common path issues
      newImage = newImage.replace(/^images\\/, '/images/');
      newImage = newImage.replace(/^\\images\\/, '/images/');
      newImage = newImage.replace(/^images\//, '/images/');
      newImage = newImage.replace(/\\/g, '/');
      
      if (!newImage.startsWith('/') && !newImage.startsWith('http')) {
        newImage = '/' + newImage;
      }
      
      if (newImage !== oldImage) {
        product.image = newImage;
        await product.save();
        updated++;
        console.log(`✅ Fixed: ${product.name}`);
        console.log(`   Old: ${oldImage}`);
        console.log(`   New: ${newImage}`);
      }
    }
    
    console.log(`\n✅ Fixed ${updated} products`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixPaths();