const express = require('express');
const router = express.Router();
const {
  getAllSections,
  getSectionById,
  updateSection
} = require('../controllers/admin/adminHomeController');
const protectRoutes = require('../middleware/protectRoutes');
const adminMiddleware = require('../middleware/adminMiddleware');

// All routes require admin authentication
router.get('/home/sections', protectRoutes, adminMiddleware, getAllSections);
router.get('/home/sections/:sectionId', protectRoutes, adminMiddleware, getSectionById);
router.put('/home/sections/:sectionId', protectRoutes, adminMiddleware, updateSection);

module.exports = router;