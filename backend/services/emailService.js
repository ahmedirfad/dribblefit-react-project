const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail app password
  }
});

const sendVerificationEmail = async (email, otp, username) => {
  const mailOptions = {
    from: `"DribbleFit" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your DribbleFit Account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 30px; border-radius: 10px; border: 1px solid #00ff00;">
        <div style="text-align: center;">
          <h1 style="color: #00ff00;">DRIBBLEFIT</h1>
          <h2>Welcome ${username}!</h2>
          <p style="font-size: 16px; color: #ccc;">Thank you for registering with DribbleFit.</p>
          <p style="font-size: 16px; color: #ccc;">Please verify your email address using the OTP below:</p>
          <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #00ff00; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes.</p>
          <p style="font-size: 14px; color: #666;">If you didn't create an account, please ignore this email.</p>
          <hr style="border-color: #333; margin: 20px 0;">
          <p style="font-size: 12px; color: #444;">&copy; 2026 DribbleFit. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(` Verification email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

const sendPasswordResetEmail = async (email, otp, username) => {
  const mailOptions = {
    from: `"DribbleFit" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your DribbleFit Password',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 30px; border-radius: 10px; border: 1px solid #00ff00;">
        <div style="text-align: center;">
          <h1 style="color: #00ff00;">DRIBBLEFIT</h1>
          <h2>Password Reset Request</h2>
          <p style="font-size: 16px; color: #ccc;">Hello ${username},</p>
          <p style="font-size: 16px; color: #ccc;">You requested to reset your password. Use the OTP below:</p>
          <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h1 style="color: #00ff00; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p style="font-size: 14px; color: #666;">This OTP is valid for 10 minutes.</p>
          <p style="font-size: 14px; color: #666;">If you didn't request this, please ignore this email.</p>
          <hr style="border-color: #333; margin: 20px 0;">
          <p style="font-size: 12px; color: #444;">&copy; 2026 DribbleFit. All rights reserved.</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(` Password reset email sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};

module.exports = { sendVerificationEmail, sendPasswordResetEmail };