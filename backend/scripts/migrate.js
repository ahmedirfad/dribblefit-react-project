const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const dbPath = path.join(__dirname, '../../db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    
    console.log(`Found ${dbData.products?.length || 0} products`);

    if (dbData.products && dbData.products.length) {
      await Product.insertMany(dbData.products);
      console.log(` Imported ${dbData.products.length} products`);
    }

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error(' Error:', error.message);
    process.exit(1);
  }
};

migrate();