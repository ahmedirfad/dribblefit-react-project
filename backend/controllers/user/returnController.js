const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const submitReturnRequest = async (req, res) => {
  try {
    const { orderNumber, reason, product, condition, comments, userName, userEmail } = req.body;

    // Email to admin
    const adminMailOptions = {
      from: `"DribbleFit Returns" <${process.env.EMAIL_USER}>`,
      to: 'dribblefit10@gmail.com',
      subject: `🔄 Return Request - Order ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 30px; border-radius: 10px; border: 1px solid #00ff00;">
          <h2 style="color: #00ff00;">New Return Request</h2>
          <p><strong>Customer:</strong> ${userName}</p>
          <p><strong>Email:</strong> ${userEmail}</p>
          <p><strong>Order Number:</strong> ${orderNumber}</p>
          <p><strong>Product:</strong> ${product}</p>
          <p><strong>Reason:</strong> ${reason}</p>
          <p><strong>Condition:</strong> ${condition}</p>
          <p><strong>Comments:</strong> ${comments || 'No additional comments'}</p>
        </div>
      `
    };

    // Auto-reply to customer
    const customerMailOptions = {
      from: `"DribbleFit Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: 'Return Request Received - DribbleFit',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 30px; border-radius: 10px; border: 1px solid #00ff00;">
          <h2 style="color: #00ff00;">Return Request Received</h2>
          <p>Dear ${userName},</p>
          <p>We have received your return request for order <strong>${orderNumber}</strong>.</p>
          <p>Our team will review your request and contact you within 24 hours with further instructions.</p>
          <br/>
          <p>Thank you for shopping with DribbleFit!</p>
        </div>
      `
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.json({ success: true, message: 'Return request submitted successfully' });
  } catch (error) {
    console.error('Return request error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit return request' });
  }
};

module.exports = { submitReturnRequest };