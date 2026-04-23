const express = require('express');
const router = express.Router();
const protectRoutes = require('../middleware/protectRoutes');
const {
  getCartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  syncCart
} = require('../controllers/user/cartController');

// All cart routes require authentication
router.use(protectRoutes);

router.get('/', getCartItems);
router.post('/add', addToCart);
router.delete('/remove/:productId/:size', removeFromCart);
router.put('/increase/:productId/:size', increaseQuantity);
router.put('/decrease/:productId/:size', decreaseQuantity);
router.delete('/clear', clearCart);
router.post('/sync', syncCart);

module.exports = router;