import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function CouponPage() {
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const validCoupons = {
    DRIBBLEFIT20: {
      discount: 20,
      type: 'percentage',
      message: '20% off your entire order!',
      description: 'Get massive 20% discount on all products'
    }
  }

  const handleApplyCoupon = () => {
    setCouponError('')
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    const coupon = validCoupons[couponCode.toUpperCase()]
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon })
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const handleShopNow = () => navigate('/products')

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            EXCLUSIVE <span className="text-[#00ff00]">OFFER</span>
          </h1>
          <p className="text-gray-400 text-lg">Unlock special discounts with coupon codes</p>
        </div>

        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white font-poppins mb-6">APPLY COUPON CODE</h2>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Enter DRIBBLEFIT20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-500 text-lg"
                  disabled={appliedCoupon}
                />
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300"
                  >
                    Apply
                  </button>
                )}
              </div>

              {couponError && <div className="text-red-400 text-sm">{couponError}</div>}
              {appliedCoupon && <div className="text-[#00ff00] text-lg font-semibold">✅ {appliedCoupon.message}</div>}
            </div>
          </div>

          {appliedCoupon && (
            <div className="bg-[#00ff00]/10 border-2 border-[#00ff00] rounded-xl p-6 text-center mb-8">
              <div className="text-[#00ff00] text-2xl font-bold mb-2">{appliedCoupon.code} APPLIED!</div>
              <div className="text-white text-lg font-semibold mb-2">{appliedCoupon.discount}% OFF YOUR ORDER</div>
              <div className="text-gray-300">{appliedCoupon.description}</div>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-white font-poppins font-semibold text-xl mb-4">AVAILABLE COUPON</h3>
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#00ff00]/30 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-[#00ff00] text-2xl font-bold mb-2">DRIBBLEFIT20</div>
              <div className="text-white text-lg font-semibold mb-2">20% OFF ALL ORDERS</div>
              <div className="text-gray-400 text-sm mb-4">Apply this code at checkout for instant 20% discount</div>
              <button
                onClick={() => setCouponCode('DRIBBLEFIT20')}
                className="bg-[#00ff00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300 text-sm"
              >
                USE THIS CODE
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300"
            >
              VIEW CART
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CouponPage