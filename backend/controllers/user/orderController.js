const Order = require('../../models/Order');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderByNumber = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getOrdersByStatus = async (req, res) => {
  try {
    const orders = await Order.find({ status: req.params.status }).sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createOrder = async (req, res) => {
  try {
    console.log('📥 Creating order:', JSON.stringify(req.body).substring(0, 200))
    const orderData = {
      ...req.body,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const order = new Order(orderData);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('❌ Order error:', error.message) // ← see exact error
    res.status(400).json({ message: error.message })
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ id: req.params.id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getOrderByNumber,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder
};