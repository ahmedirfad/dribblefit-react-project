const express = require('express');
const router = express.Router();

const { TokenRegenerator } = require('../services/tokenRegenerator');
const protectRoutes = require('../middleware/protectRoutes');
const { Validate } = require('../middleware/validate')

const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator');

const {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  getCurrentUser,
  verifyEmail,
  resendVerificationOtp
} = require('../controllers/user/userController');

//Public routes WITH validation
router.get('/', protectRoutes, getUsers);
router.post('/login', Validate(loginValidator), loginUser);
router.post('/register', Validate(registerValidator), registerUser); // register

router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendVerificationOtp);

// Token refresh
router.post('/refresh-token', TokenRegenerator);

//Protected routes
router.get('/me', protectRoutes, getCurrentUser);
router.get('/:id', protectRoutes, getUserById);
router.patch('/:id', protectRoutes, updateUser);
router.delete('/:id', protectRoutes, deleteUser);
router.post('/logout', protectRoutes, logoutUser);

module.exports = router;
