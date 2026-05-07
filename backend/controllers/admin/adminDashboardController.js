
const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

const getDashboardStats = async (req, res) => {
  try {
    
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const outOfStock = await Product.countDocuments({ inStock: false });
    
    
    const orders = await Order.find();
    const totalOrders = orders.length;
    
    
    let totalRevenue = 0;
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      let orderAmount = 0;
      
     
      if (order.total) {
        orderAmount = parseFloat(order.total);
      } else if (order.amount) {
        orderAmount = parseFloat(order.amount);
      } else if (order.finalTotal) {
        orderAmount = parseFloat(order.finalTotal);
      }
      
      
      if (isNaN(orderAmount)) {
        orderAmount = 0;
      }
      
      totalRevenue = totalRevenue + orderAmount;
    }
    
    
    const pendingOrders = await Order.countDocuments({ 
      status: { $in: ['pending', 'processing'] } 
    });
    
    
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    
    const topProducts = await Product.find().limit(5);
    
    res.json({
      success: true,
      stats: {
        totalUsers: totalUsers,
        totalProducts: totalProducts,
        totalOrders: totalOrders,
        totalRevenue: totalRevenue,
        pendingOrders: pendingOrders,
        outOfStock: outOfStock
      },
      recentOrders: recentOrders,
      topProducts: topProducts
    });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = { getDashboardStats };