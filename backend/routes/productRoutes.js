const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const protectRoutes = require('../middleware/protectRoutes');
const {
  getAllProducts,
  searchProducts,        // ← ADD THIS
  getProductById,
} = require('../controllers/user/productController');

// Routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);     // ← ADD THIS - MUST be before /:id
router.get('/:id', getProductById);


module.exports = router;