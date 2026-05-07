const express = require('express');
const router = express.Router();
const {
  getAllSections,
  getSectionById,
} = require('../controllers/admin/adminHomeController');

// ✅ PUBLIC ROUTES - No authentication needed for customers
router.get('/sections', getAllSections);
router.get('/sections/:sectionId', getSectionById);

module.exports = router;