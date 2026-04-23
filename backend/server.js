const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Serve static images from public folder
app.use('/images', express.static(path.join(__dirname, '../public/images')));
// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/wishlist', require('./routes/wishlistRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/returns', require('./routes/returnRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/admin', require('./routes/adminHomeRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` API available at http://localhost:${PORT}/api`);
});