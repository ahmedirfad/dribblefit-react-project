import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useCart } from '../Contexts/CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import api from '../Api/Axios.jsx';

function Orders() {
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');

  // Get cart count
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Get saved addresses
  const savedAddresses = user?.addresses || [];

  // Fetch orders from user data
  useEffect(() => {
    const fetchOrders = () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      setLoading(true);
      setError('');
      
      try {
        // Get orders from user object (they're stored in user.orders)
        const userOrders = user.orders || [];
        
        // Sort orders by date (newest first)
        const sortedOrders = userOrders.sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        
        setOrders(sortedOrders);
        
        if (userOrders.length === 0) {
          setError('No orders found. Start shopping to place your first order.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusColor = (status) => {
    if (!status) return 'text-gray-400 bg-gray-400/10';
    
    switch(status.toLowerCase()) {
      case 'delivered': return 'text-green-400 bg-green-400/10';
      case 'shipped': return 'text-blue-400 bg-blue-400/10';
      case 'processing': return 'text-yellow-400 bg-yellow-400/10';
      case 'cancelled': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Calculate order statistics
  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    shipped: orders.filter(o => o.status === 'Shipped').length,
    processing: orders.filter(o => o.status === 'Processing').length,
    cancelled: orders.filter(o => o.status === 'Cancelled').length
  };

  const handleTrackOrder = (trackingNumber) => {
    if (!trackingNumber) {
      alert('No tracking number available for this order.');
      return;
    }
    alert(`Tracking for ${trackingNumber}\n\nThis is a demo. In a real app, this would redirect to the courier's tracking page.`);
  };

  const handleDownloadInvoice = async (orderId) => {
    alert(`Downloading invoice for order ${orderId}\n\nThis is a demo. In a real app, this would generate and download a PDF invoice.`);
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      return;
    }
    
    try {
      if (!user) {
        alert('User not found. Please login again.');
        return;
      }

      // Update order status in user's orders in the database
      const updatedOrders = user.orders.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      );

      // Update user in database
      await api.patch(`/users/${user.id}`, {
        orders: updatedOrders
      });

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ));
      
      alert('Order cancelled successfully!');
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const handleBuyAgain = (items) => {
    alert(`Adding ${items.length} items to cart...\n\nThis is a demo. In a real app, this would add all items to the cart.`);
    // In real app: Add all items to cart
    // items.forEach(item => addToCart(item.product, item.size, item.quantity));
  };

  // Helper function to get item price
  const getItemPrice = (item) => {
    if (!item) return '₹0';
    
    // If price is already a string with ₹ symbol
    if (typeof item.price === 'string') {
      return item.price;
    }
    
    // If price is a number
    if (typeof item.price === 'number') {
      return `₹${item.price.toFixed(2)}`;
    }
    
    // Try to extract price from item object
    const price = item.price || item.product?.price || 0;
    return `₹${parseFloat(price).toFixed(2)}`;
  };

  // Helper function to get payment method display
  const getPaymentMethod = (method) => {
    if (!method) return 'N/A';
    
    // Fix for "upi0" issue
    if (method.toLowerCase().includes('upi')) {
      return 'UPI';
    }
    
    // Capitalize first letter
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  // Helper function to calculate order total
  const calculateOrderTotal = (order) => {
    if (!order) return 0;
    
    // If total is already calculated
    if (order.total) {
      return parseFloat(order.total);
    }
    
    // Calculate from items
    return order.items?.reduce((sum, item) => {
      const price = typeof item.price === 'string' 
        ? parseFloat(item.price.replace('₹', '').replace(',', ''))
        : (item.price || 0);
      return sum + (price * (item.quantity || 1));
    }, 0) || 0;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-[#00ff00] text-6xl mb-6">📦</div>
            <div className="text-white text-2xl font-bold mb-4">Authentication Required</div>
            <p className="text-gray-400 mb-8">Please login to view your orders</p>
            <Link to="/login" className="bg-[#00ff00] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#00ff00]/90 transition-colors inline-block">
              Login Now
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white font-poppins mb-2">My Orders</h1>
            <p className="text-gray-400">Track and manage your orders</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center font-bold text-black text-2xl">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="text-white font-poppins font-bold text-lg">{user?.username}</div>
                    <div className="text-gray-400 text-sm truncate max-w-[180px]">{user?.email}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link to="/profile" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Profile
                  </Link>
                  <Link to="/address" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Addresses
                  </Link>
                  <Link to="/orders" className="block bg-[#00ff00] text-black font-bold py-3 px-4 rounded-lg">
                    My Orders
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="text-gray-400 text-sm mb-4">Quick Stats</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Cart Items</span>
                      <span className="text-[#00ff00] font-bold">{cartItemCount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Addresses</span>
                      <span className="text-[#00ff00] font-bold">{savedAddresses.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Total Orders</span>
                      <span className="text-[#00ff00] font-bold">{orderStats.total}</span>
                    </div>
                  </div>
                </div>

                {/* Order Status Stats */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <div className="text-gray-400 text-sm mb-4">Order Status</div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-gray-300">Delivered</span>
                      </div>
                      <span className="text-green-400 font-bold">{orderStats.delivered}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300">Shipped</span>
                      </div>
                      <span className="text-blue-400 font-bold">{orderStats.shipped}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-gray-300">Processing</span>
                      </div>
                      <span className="text-yellow-400 font-bold">{orderStats.processing}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2">
              {error && (
                <div className={`mb-6 p-4 rounded-xl ${
                  orders.length === 0 
                    ? 'bg-yellow-500/20 border border-yellow-500/30' 
                    : 'bg-red-500/20 border border-red-500/30'
                }`}>
                  <div className={orders.length === 0 ? 'text-yellow-400' : 'text-red-400'}>
                    {error}
                  </div>
                </div>
              )}

              {loading ? (
                <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12 text-center animate-fade-in">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00ff00]"></div>
                  <div className="text-white mt-4">Loading your orders...</div>
                </div>
              ) : orders.length === 0 ? (
                <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12 text-center animate-fade-in">
                  <div className="text-[#00ff00] text-6xl mb-6">📦</div>
                  <h3 className="text-2xl font-bold text-white font-poppins mb-4">No Orders Yet</h3>
                  <p className="text-gray-400 mb-8">Start shopping to see your orders here</p>
                  <Link 
                    to="/products"
                    className="bg-[#00ff00] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors inline-block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => {
                    const orderTotal = calculateOrderTotal(order);
                    
                    return (
                      <div 
                        key={order.id}
                        className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 transition-all duration-300 animate-fade-in"
                      >
                        {/* Order Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-800">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-white font-poppins font-bold text-xl">Order #{order.orderNumber || order.id?.slice(0, 8) || 'N/A'}</h3>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                {order.status || 'Processing'}
                              </span>
                            </div>
                            <div className="text-gray-400 text-sm">
                              Placed on {formatDateTime(order.date)}
                            </div>
                          </div>
                          
                          <button
                            onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
                            className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors text-sm font-semibold flex items-center gap-1"
                          >
                            {selectedOrder?.id === order.id ? (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                                Hide Details
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                View Details
                              </>
                            )}
                          </button>
                        </div>

                        {/* Order Items Summary */}
                        <div className="mb-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex -space-x-2">
                              {order.items?.slice(0, 3).map((item, idx) => (
                                <div 
                                  key={idx}
                                  className="w-12 h-12 rounded-lg border-2 border-[#111111] overflow-hidden bg-[#1a1a1a]"
                                >
                                  <img 
                                    src={item.image || item.product?.image || 'https://via.placeholder.com/150'} 
                                    alt={item.name || item.product?.name || 'Product'}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {order.items?.length > 3 && (
                                <div className="w-12 h-12 rounded-lg border-2 border-[#111111] bg-[#1a1a1a] flex items-center justify-center">
                                  <span className="text-[#00ff00] font-bold text-sm">+{order.items.length - 3}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="text-white font-poppins font-semibold">
                                {order.items?.length || 0} item{order.items?.length !== 1 ? 's' : ''}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {order.items?.map(item => (item.name || item.product?.name || 'Product').split(' ')[0]).join(', ')}
                                {order.items?.length > 3 && '...'}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-[#00ff00] font-poppins font-bold text-xl">
                                ₹{orderTotal.toFixed(2)}
                              </div>
                              <div className="text-gray-400 text-sm">
                                {getPaymentMethod(order.paymentMethod)}
                                {order.codCharges && order.paymentMethod?.toLowerCase() === 'cod' && ' (+₹10 COD)'}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Details (Collapsible) */}
                        {selectedOrder?.id === order.id && (
                          <div className="mt-6 pt-6 border-t border-gray-800 space-y-6 animate-fade-in">
                            {/* Items List */}
                            <div>
                              <h4 className="text-white font-poppins font-semibold mb-4">Items in this order</h4>
                              <div className="space-y-4">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-4 p-3 bg-[#1a1a1a] rounded-xl">
                                    <img 
                                      src={item.image || item.product?.image || 'https://via.placeholder.com/150'} 
                                      alt={item.name || item.product?.name || 'Product'}
                                      className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="text-white font-poppins font-semibold">{item.name || item.product?.name || 'Product'}</div>
                                      <div className="text-gray-400 text-sm">
                                        Size: {item.size || 'M'} • Qty: {item.quantity || 1}
                                      </div>
                                      {item.team && (
                                        <div className="text-gray-500 text-xs">Team: {item.team}</div>
                                      )}
                                    </div>
                                    <div className="text-[#00ff00] font-poppins font-bold">
                                      {getItemPrice(item)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-[#1a1a1a] rounded-xl p-4">
                              <h4 className="text-white font-poppins font-semibold mb-4">Order Summary</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Subtotal</span>
                                  <span className="text-white">
                                    ₹{order.items?.reduce((sum, item) => {
                                      const price = typeof item.price === 'string' 
                                        ? parseFloat(item.price.replace('₹', '').replace(',', ''))
                                        : (item.price || item.product?.price || 0);
                                      return sum + (price * (item.quantity || 1));
                                    }, 0).toFixed(2) || '0.00'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Shipping</span>
                                  <span className="text-[#00ff00]">FREE</span>
                                </div>
                                {order.couponApplied && order.couponApplied !== 'none' && (
                                  <div className="flex justify-between text-[#00ff00]">
                                    <span>Coupon Applied</span>
                                    <span>- ₹{order.couponDiscount || '0.00'}</span>
                                  </div>
                                )}
                                {order.codCharges && (
                                  <div className="flex justify-between text-yellow-400">
                                    <span>COD Charges</span>
                                    <span>+ ₹{order.codCharges.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between text-white font-poppins font-bold text-lg pt-2 border-t border-gray-700">
                                  <span>Total</span>
                                  <span>₹{orderTotal.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>

                            {/* Shipping & Order Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-white font-poppins font-semibold mb-3">Shipping Address</h4>
                                <div className="bg-[#1a1a1a] rounded-xl p-4">
                                  <div className="text-white font-semibold mb-2">{order.shippingAddress?.name || 'N/A'}</div>
                                  <div className="text-gray-300 mb-1">{order.shippingAddress?.address || 'N/A'}</div>
                                  <div className="text-gray-300">
                                    {order.shippingAddress?.city || ''}, {order.shippingAddress?.state || ''} - {order.shippingAddress?.pincode || ''}
                                  </div>
                                  {order.shippingAddress?.landmark && (
                                    <div className="text-gray-400 text-sm mt-1">📍 {order.shippingAddress.landmark}</div>
                                  )}
                                  <div className="text-gray-400 mt-2">📞 {order.shippingAddress?.phone || 'N/A'}</div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-white font-poppins font-semibold mb-3">Order Info</h4>
                                <div className="bg-[#1a1a1a] rounded-xl p-4 space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Payment Method</span>
                                    <span className="text-white">{getPaymentMethod(order.paymentMethod)}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Tracking Number</span>
                                    <span className="text-[#00ff00] font-mono">{order.trackingNumber || 'N/A'}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Status</span>
                                    <span className={`font-semibold ${getStatusColor(order.status).split(' ')[0]}`}>
                                      {order.status || 'Processing'}
                                    </span>
                                  </div>
                                  {order.couponApplied && order.couponApplied !== 'none' && (
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Coupon Used</span>
                                      <span className="text-[#00ff00]">{order.couponApplied}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4 border-t border-gray-800">
                              <button 
                                onClick={() => handleTrackOrder(order.trackingNumber)}
                                className="flex-1 bg-transparent border border-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Track Order
                              </button>
                              <button 
                                onClick={() => handleDownloadInvoice(order.id)}
                                className="flex-1 bg-[#00ff00] text-black font-bold py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center justify-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Invoice
                              </button>
                              {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                                <button 
                                  onClick={() => handleCancelOrder(order.id)}
                                  className="flex-1 bg-transparent border border-red-500 text-red-400 py-3 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Cancel Order
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Order Footer */}
                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-800">
                          <div className="text-gray-400 text-sm">
                            {order.trackingNumber && (
                              <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Track with: <span className="text-[#00ff00] font-mono">{order.trackingNumber}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex gap-4">
                            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                              Need Help?
                            </Link>
                            <button 
                              onClick={() => handleBuyAgain(order.items)}
                              className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors text-sm font-semibold"
                            >
                              Buy Again
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Orders;