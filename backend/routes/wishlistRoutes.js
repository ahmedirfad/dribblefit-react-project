const express = require('express');
const protectRoutes = require('../middleware/protectRoutes');
const { 
  getWishlistData, 
  wishlistToggle,
  clearWishlist 
} = require('../controllers/user/wishlistController');

const route = express.Router();

route.use(protectRoutes);

route.get("/", getWishlistData);

route.patch("/:productId", wishlistToggle);

route.delete("/clear", clearWishlist);

module.exports = route;