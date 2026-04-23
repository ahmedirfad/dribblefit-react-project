const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const protectRoutes = require('../middleware/protectRoutes');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create Razorpay order (REQUIRED)
router.post('/create-order', protectRoutes, async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid amount' 
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: req.user?.id || 'guest',
        timestamp: new Date().toISOString()
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create order'
    });
  }
});

// Verify payment (REQUIRED)
router.post('/verify-payment', protectRoutes, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing payment details' 
      });
    }

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      res.json({ 
        success: true, 
        message: 'Payment verified successfully',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id
      });
    } else {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid signature - Payment verification failed' 
      });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Payment verification failed' 
    });
  }
});

module.exports = router;