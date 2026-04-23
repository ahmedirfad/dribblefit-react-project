const express = require('express');
const router = express.Router();
const { submitReturnRequest } = require('../controllers/user/returnController');
router.post('/request', submitReturnRequest);

module.exports = router;