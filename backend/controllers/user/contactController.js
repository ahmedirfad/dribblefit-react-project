const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendContactEmail = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Email to admin (dribblefit10@gmail.com)
    const adminMailOptions = {
      from: `"DribbleFit Contact" <${process.env.EMAIL_USER}>`,
      to: 'dribblefit10@gmail.com',
      subject: `📧 Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 30px; border-radius: 10px; border: 1px solid #00ff00;">
          <div style="text-align: center;">
            <h1 style="color: #00ff00;">DRIBBLEFIT</h1>
            <h2>New Contact Form Submission</h2>
          </div>
          
          <div style="background: #1a1a1a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #00ff00;">Name:</strong> ${name}</p>
            <p><strong style="color: #00ff00;">Email:</strong> ${email}</p>
            <p><strong style="color: #00ff00;">Subject:</strong> ${subject}</p>
            <p><strong style="color: #00ff00;">Message:</strong></p>
            <p style="background: #0a0a0a; padding: 15px; border-radius: 5px;">${message}</p>
          </div>
          
          <hr style="border-color: #333;">
          <p style="font-size: 12px; color: #666; text-align: center;">Sent from DribbleFit Contact Form</p>
        </div>
      `
    };

    // Auto-reply to user
    const userMailOptions = {
      from: `"DribbleFit Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting DribbleFit',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: white; padding: 30px; border-radius: 10px; border: 1px solid #00ff00;">
          <div style="text-align: center;">
            <h1 style="color: #00ff00;">DRIBBLEFIT</h1>
            <h2>Thank You for Reaching Out!</h2>
          </div>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for contacting DribbleFit. We have received your message and will get back to you within 24 hours.</p>
          
          <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong style="color: #00ff00;">Your Message:</strong></p>
            <p style="font-style: italic;">"${message.substring(0, 200)}${message.length > 200 ? '...' : ''}"</p>
          </div>
          
          <p>In the meantime, you can:</p>
          <ul style="color: #ccc;">
            <li>Check our <a href="http://localhost:5173/faq" style="color: #00ff00;">FAQ page</a> for quick answers</li>
            <li>Track your order in <a href="http://localhost:5173/orders" style="color: #00ff00;">My Orders</a></li>
            <li>Call us at +91 7736919863 (Mon-Sat, 10AM-7PM)</li>
          </ul>
          
          <hr style="border-color: #333;">
          <p style="font-size: 12px; color: #666; text-align: center;">&copy; 2026 DribbleFit. All rights reserved.</p>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.json({ 
      success: true, 
      message: 'Message sent successfully!' 
    });
  } catch (error) {
    console.error('Contact email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.' 
    });
  }
};

module.exports = { sendContactEmail };