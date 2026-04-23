const redisClient = require('../config/redis');

// Store OTP (expires in 10 minutes)
const storeOtp = async (email, otp) => {
  await redisClient.setEx(`otp:${email}`, 600, otp);
  console.log(`OTP stored for ${email}`);
};

// Verify OTP
const verifyOtp = async (email, otp) => {
  const storedOtp = await redisClient.get(`otp:${email}`);
  if (storedOtp === otp) {
    await redisClient.del(`otp:${email}`);
    return true;
  }
  return false;
};

// Resend OTP (delete old, store new)
const resendOtp = async (email, newOtp) => {
  await redisClient.del(`otp:${email}`);
  await redisClient.setEx(`otp:${email}`, 600, newOtp);
  console.log(` New OTP stored for ${email}`);
};

module.exports = { storeOtp, verifyOtp, resendOtp };