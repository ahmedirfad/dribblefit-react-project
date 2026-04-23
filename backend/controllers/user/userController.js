const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const GenerateToken = require('../../services/generateToken');
const { getCookieOptions } = require('../../services/tokenRegenerator');
const { sendVerificationEmail } = require('../../services/emailService');
const generateOTP = require('../../utils/generateOTP');
const { storeOtp, verifyOtp, resendOtp } = require('../../services/redisOtpService');

//get users (login)
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    console.log('📥 Registration:', req.body);

    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const newUser = new User({
      username,
      email,
      password,
      id: Date.now().toString(),
      role: 'user',
      isBlocked: false,
      isEmailVerified: false,
      cart: [],
      addresses: [],
      orders: [],
      phone: '',
      fullName: '',
      dateOfBirth: '',
      profilePhoto: '',
      createdAt: new Date()
    });

    const savedUser = await newUser.save();
    console.log(' User saved:', savedUser.email);

    const otp = generateOTP();
    await storeOtp(email, otp);

    await sendVerificationEmail(email, otp, username);

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please verify your email.',
      email
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: "Account blocked" });
    }

    // check email verified
    if (!user.isEmailVerified) {
      return res.status(403).json({ message: "Please verify your email first" });
    }

    // generate tokens
    const { AccessToken, RefreshToken } = await GenerateToken(
      user.email,
      user.id,
      user.role
    );

    const cookieOptions = getCookieOptions();

    res.cookie("Access_Token", AccessToken, cookieOptions);
    res.cookie("Refresh_Token", RefreshToken, cookieOptions);

    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      user: userResponse,
      AccessToken,
      RefreshToken
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    console.log('Updating user with custom id:', req.params.id);
    console.log('Update data:', req.body);

    const user = await User.findOneAndUpdate(
      { id: req.params.id },
      { $set: req.body },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log(' User updated:', user.email);
    res.json(user);

  } catch (error) {
    console.error(' Update error:', error);
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const cookieOptions = getCookieOptions();

    res
      .clearCookie("Access_Token", cookieOptions)
      .clearCookie("Refresh_Token", cookieOptions)
      .status(200)
      .json({ message: "Logout successful" });

  } catch (error) {
    res.status(500).json({ message: "Logout error", error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.Id }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 RESEND OTP (USING REDIS)
const resendVerificationOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email already verified' });
    }

    const otp = generateOTP();
    await resendOtp(email, otp);

    await sendVerificationEmail(email, otp, user.username);

    res.json({
      success: true,
      message: 'New OTP sent to your email'
    });

  } catch (error) {
    console.error(' Resend OTP error:', error);
    res.status(500).json({ message: error.message });
  }
};

// verify email using redis
const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const isValid = await verifyOtp(email, otp);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    //genrating tokens after verify
    const { AccessToken, RefreshToken } = await GenerateToken(
      user.email,
      user.id,
      user.role
    );

    const cookieOptions = getCookieOptions();

    res.cookie("Access_Token", AccessToken, cookieOptions);
    res.cookie("Refresh_Token", RefreshToken, cookieOptions);

    res.json({
      success: true,
      message: 'Email verified successfully!',
      user,
      AccessToken,
      RefreshToken
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  logoutUser,
  getCurrentUser,
  resendVerificationOtp,
  verifyEmail
};