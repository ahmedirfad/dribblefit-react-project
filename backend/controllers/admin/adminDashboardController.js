const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

// @desc    Get admin dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Admin only
const getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Get out of stock products
    const outOfStock = await Product.countDocuments({ inStock: false });
    
    // Get pending orders (processing status)
    const pendingOrders = await Order.countDocuments({ status: 'processing' });
    
    // Calculate total revenue from completed/delivered orders
    const revenueResult = await Order.aggregate([
      { $match: { status: { $in: ['Delivered', 'completed'] } } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    
    // Get recent orders (last 5)
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('orderNumber username total status createdAt');
    
    // Get top selling products
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      { $group: {
          _id: '$items.id',
          name: { $first: '$items.name' },
          team: { $first: '$items.team' },
          price: { $first: '$items.priceString' },
          totalSold: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders,
        outOfStock
      },
      recentOrders,
      topProducts
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };