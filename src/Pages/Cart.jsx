import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Contexts/CartContext'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getCouponDiscount,
    getFinalTotal
  } = useCart()
  
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateQuantity(productId, size, newQuantity)
  }

  const handleRemoveItem = (productId, size) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(productId, size)
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed with checkout')
      navigate('/login')
      return
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }

    navigate('/checkout')
  }

  const handleContinueShopping = () => {
    navigate('/products')
  }

  const handleApplyCoupon = () => {
    setCouponError('')
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    if (couponCode.toUpperCase() === 'DRIBBLEFIT20') {
      applyCoupon({ 
        discount: 20, 
        type: 'percentage', 
        message: '20% off your entire order!',
        code: 'DRIBBLEFIT20'
      })
      setCouponError('')
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
      removeCoupon()
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponCode('')
    setCouponError('')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-[#00ff00] text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins">
            SHOPPING <span className="text-[#00ff00]">CART</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.size}`}
                className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl bg-[#1a1a1a]"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-poppins font-semibold text-lg">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-gray-400 text-sm mb-4">
                      <div>Team: {item.team}</div>
                      <div>Size: {item.size}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-white font-poppins font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-[#00ff00] font-poppins font-bold text-lg">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-poppins font-semibold text-xl mb-6">
                ORDER SUMMARY
              </h3>

              <div className="mb-6">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter DRIBBLEFIT20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                    disabled={appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300 text-sm"
                    >
                      Apply
                    </button>
                  )}
                </div>
                
                {couponError && (
                  <div className="text-red-400 text-sm">{couponError}</div>
                )}
                
                {appliedCoupon && (
                  <div className="text-[#00ff00] text-sm font-semibold">
                    ✅ {appliedCoupon.message}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#00ff00]">FREE</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-[#00ff00]">
                    <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{getCouponDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white font-poppins font-bold text-lg">
                    <span>Total</span>
                    <span>₹{getFinalTotal().toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="text-[#00ff00] text-sm mt-2 text-right">
                      You save ₹{getCouponDiscount().toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#00ff00] text-black font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300 mb-4"
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300"
              >
                CONTINUE SHOPPING
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Checkout • 100% Authentic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart