const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  getOrderByNumber,
  getOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder
} = require('../controllers/user/orderController');

router.get('/', getAllOrders);
router.get('/user/:userId', getOrdersByUser);
router.get('/:id', getOrderById);
router.get('/number/:orderNumber', getOrderByNumber);
router.get('/status/:status', getOrdersByStatus);
router.post('/', createOrder);
router.patch('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;