const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { type: String, required: true }, // product ID
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1, max: 10 },
  team: { type: String, default: '' },
  league: { type: String, default: '' },
  customizationData: { type: Object, default: null }
});

const cartSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true }, // user ID
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cart', cartSchema);