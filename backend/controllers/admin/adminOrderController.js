const Order = require('../../models/Order');

// @desc    Get all orders (admin view with pagination and filters)
// @route   GET /api/admin/orders
// @access  Admin only
const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { status, search } = req.query;
    
    let query = {};
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { username: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } }
      ];
    }
    
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Order.countDocuments(query);
    
    // Get status counts for stats
    const statusCounts = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    const stats = {
      total: await Order.countDocuments(),
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0
    };
    
    statusCounts.forEach(item => {
      if (stats.hasOwnProperty(item._id)) {
        stats[item._id] = item.count;
      }
    });
    
    res.json({
      success: true,
      orders,
      stats,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order by ID
// @route   GET /api/admin/orders/:id
// @access  Admin only
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PATCH /api/admin/orders/:id/status
// @access  Admin only
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status, updatedAt: new Date() },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json({
      success: true,
      message: `Order status updated to ${status}`,
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/admin/orders/:id
// @access  Admin only
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};

