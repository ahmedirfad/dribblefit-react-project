const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const cloudinary = require('../config/cloudinary');
const Product = require('../models/Product');
const fs = require('fs');

const uploadToCloudinary = async () => {
  try {
    console.log('Cloudinary Config Check:');
    console.log('- Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Missing');
    console.log('- API Key:', process.env.CLOUDINARY_API_KEY ? '✅' : '❌ Missing');

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');
    
    const products = await Product.find();
    console.log(`📁 Found ${products.length} products`);
    
    let updatedCount = 0;
    let errorCount = 0;
    
    for (const product of products) {
      try {
        let imagePath = product.image;
        
        // ✅ Extract just the filename (remove any paths)
        let filename = imagePath.split('/').pop();
        
        // ✅ Remove any query parameters if present
        filename = filename.split('?')[0];
        
        console.log(`\n📸 Processing: ${product.name}`);
        console.log(`   DB image path: ${imagePath}`);
        console.log(`   Filename: ${filename}`);
        
        // ✅ Try multiple possible locations
        const possiblePaths = [
          path.join(__dirname, '../../public/images', filename),           // public/images/filename
          path.join(__dirname, '../../public', filename),                   // public/filename
          path.join(__dirname, '../../public/images/images', filename),     // public/images/images/filename (if double nested)
        ];
        
        let localFilePath = null;
        for (const tryPath of possiblePaths) {
          if (fs.existsSync(tryPath)) {
            localFilePath = tryPath;
            break;
          }
        }
        
        if (!localFilePath) {
          console.log(`   ❌ File not found in any location`);
          errorCount++;
          continue;
        }
        
        console.log(`   ✅ Found at: ${localFilePath}`);
        
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
          folder: 'dribblefit/products',
          public_id: product.id,
          overwrite: true
        });
        
        // Update product in database
        product.image = result.secure_url;
        await product.save();
        
        updatedCount++;
        console.log(`   ✅ Uploaded: ${result.secure_url}`);
        
      } catch (err) {
        console.log(`   ❌ Error: ${err.message}`);
        errorCount++;
      }
    }
    
    console.log(`\n🎉 Migration complete!`);
    console.log(`   ✅ Success: ${updatedCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
};

uploadToCloudinary();