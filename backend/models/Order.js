const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  orderNumber: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  userEmail: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'Delivered', 'Cancelled', 'completed'], 
    default: 'pending' 
  },
  items: { type: Array, required: true },
  subtotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  couponDiscount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  
  paymentMethod: { type: String, default: 'cod' },
  shippingAddress: { type: Object, required: true },
  
  couponApplied: { type: String, default: null },
  
  codCharges: { type: Number, default: 0 },
  
  trackingNumber: { type: String, default: '' },
  
  addressSource: { type: String, default: 'saved_address' },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function() {
  this.updatedAt = new Date();
});

module.exports = mongoose.model('Order', orderSchema);