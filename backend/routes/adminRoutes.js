const express = require('express');
const router = express.Router();
const protectRoutes = require('../middleware/protectRoutes');
const adminMiddleware = require('../middleware/adminMiddleware');
const { uploadImage, uploadVideo } = require('../middleware/upload');  // ✅ UPDATED

// Dashboard Controller
const { getDashboardStats } = require('../controllers/admin/adminDashboardController');

// User Management Controller
const {
  getAllUsers,
  getUserById,
  toggleUserBlock,
  updateUserRole,
  deleteUser
} = require('../controllers/admin/adminUserController');

// Product Management Controller
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByStock
} = require('../controllers/admin/adminProductController');

// Order Management Controller
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/admin/adminOrderController');

// All admin routes require authentication AND admin role
router.use(protectRoutes, adminMiddleware);

// Dashboard Stats
router.get('/dashboard/stats', getDashboardStats);

// ✅ IMAGE Upload endpoint (single)
router.post('/upload', uploadImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    
    res.json({
      success: true,
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ MULTIPLE Image Upload endpoint (up to 10 images at once)
router.post('/upload-multiple', uploadImage.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }
    
    const uploadedImages = req.files.map(file => ({
      imageUrl: file.path,
      publicId: file.filename,
      originalName: file.originalname
    }));
    
    res.json({
      success: true,
      message: `Successfully uploaded ${uploadedImages.length} images`,
      count: uploadedImages.length,
      images: uploadedImages
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ VIDEO Upload endpoint (NEW)
router.post('/upload-video', uploadVideo.single('video'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No video uploaded' });
    }
    
    res.json({
      success: true,
      videoUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Video upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// User Management Routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.patch('/users/:id/block', toggleUserBlock);
router.patch('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// Product Management Routes
router.get('/products', getAllProducts);
router.get('/products/stock/:status', getProductsByStock);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Order Management Routes
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.patch('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', deleteOrder);

module.exports = router;