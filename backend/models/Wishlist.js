const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
  user: { type: String, required: true, unique: true },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String, required: true },
    team: { type: String, default: '' }
  }]
}, { timestamps: true });

const wishlistModule = mongoose.model("Wishlist", wishlistSchema);

module.exports = wishlistModule;