const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/user/contactController');

router.post('/send', sendContactEmail);

module.exports = router;