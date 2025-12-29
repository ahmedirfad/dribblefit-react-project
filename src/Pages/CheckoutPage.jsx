import React, { useState, useEffect } from 'react'
import api from '../Api/Axios'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../Contexts/CartContext'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function CheckoutPage() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const { cartItems, getCartTotal, getCouponDiscount, getFinalTotal, appliedCoupon, clearCart } = useCart()
  
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  
  // Store order summary for success page
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    couponDiscount: 0,
    codCharges: 0
  })

  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated === false) {
      navigate('/login')
    } else if (isAuthenticated === true) {
      setCheckingAuth(false)
    }
  }, [isAuthenticated, navigate])

  const [state, setState] = useState({
    selectedPayment: 'cod',
    orderPlaced: false,
    orderNumber: '',
    useSavedAddress: true,
    selectedAddressIndex: 0,
    formData: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    upiId: '',
    cardData: {
      cardNumber: '',
      expiry: '',
      cvv: ''
    },
    showCvv: false,
    formErrors: {},
    codCharges: 0
  })

  // Get saved addresses from user
  const savedAddresses = user?.addresses || []

  // Initialize form with default address or user info
  useEffect(() => {
    if (user) {
      const defaultAddress = savedAddresses.find(addr => addr.isDefault)
      
      if (defaultAddress) {
        setState(prev => ({
          ...prev,
          formData: {
            name: defaultAddress.name || user.username || '',
            email: user.email || '',
            phone: defaultAddress.phone || '',
            address: defaultAddress.address || '',
            city: defaultAddress.city || '',
            state: defaultAddress.state || '',
            pincode: defaultAddress.pincode || '',
            landmark: defaultAddress.landmark || ''
          }
        }))
      } else if (savedAddresses.length > 0) {
        const firstAddress = savedAddresses[0]
        setState(prev => ({
          ...prev,
          selectedAddressIndex: 0,
          formData: {
            name: firstAddress.name || user.username || '',
            email: user.email || '',
            phone: firstAddress.phone || '',
            address: firstAddress.address || '',
            city: firstAddress.city || '',
            state: firstAddress.state || '',
            pincode: firstAddress.pincode || '',
            landmark: firstAddress.landmark || ''
          }
        }))
      } else {
        setState(prev => ({
          ...prev,
          useSavedAddress: false,
          formData: {
            ...prev.formData,
            name: user.username || '',
            email: user.email || ''
          }
        }))
      }
    }
  }, [user, savedAddresses])

  useEffect(() => {
    setState(prev => ({ ...prev, codCharges: state.selectedPayment === 'cod' ? 10 : 0 }))
  }, [state.selectedPayment])

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  const updateFormData = (name, value) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [name]: value }
    }))
  }

  // Handle address selection
  const handleAddressSelect = (index) => {
    const selectedAddress = savedAddresses[index]
    setState(prev => ({
      ...prev,
      useSavedAddress: true,
      selectedAddressIndex: index,
      formData: {
        name: selectedAddress.name || user.username || '',
        email: user.email || '',
        phone: selectedAddress.phone || '',
        address: selectedAddress.address || '',
        city: selectedAddress.city || '',
        state: selectedAddress.state || '',
        pincode: selectedAddress.pincode || '',
        landmark: selectedAddress.landmark || ''
      }
    }))
  }

  // Toggle between saved address and manual entry
  const toggleAddressMode = () => {
    setState(prev => ({
      ...prev,
      useSavedAddress: !prev.useSavedAddress
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let processedValue = value
    
    if (name === 'phone' || name === 'pincode') {
      processedValue = value.replace(/\D/g, '').slice(0, name === 'phone' ? 10 : 6)
      
      if ((name === 'phone' && processedValue.length < 10 && processedValue.length > 0) ||
          (name === 'pincode' && processedValue.length < 6 && processedValue.length > 0)) {
        setState(prev => ({
          ...prev,
          formErrors: { ...prev.formErrors, [name]: `${name === 'phone' ? 'Phone number' : 'Pincode'} must be ${name === 'phone' ? '10' : '6'} digits` }
        }))
      } else {
        setState(prev => ({
          ...prev,
          formErrors: { ...prev.formErrors, [name]: '' }
        }))
      }
    }
    
    updateFormData(name, processedValue || value)
  }

  const handleUpiIdChange = (e) => {
    const value = e.target.value
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    const phonePattern = /^[6-9]\d{9}$/
    
    setState(prev => ({ ...prev, upiId: value }))
    
    if (value.trim() === '') {
      setState(prev => ({ ...prev, formErrors: { ...prev.formErrors, upiId: '' } }))
    } else if (!upiPattern.test(value) && !phonePattern.test(value.replace(/\D/g, ''))) {
      setState(prev => ({ ...prev, formErrors: { ...prev.formErrors, upiId: 'Enter valid UPI ID or Phone Number' } }))
    } else {
      setState(prev => ({ ...prev, formErrors: { ...prev.formErrors, upiId: '' } }))
    }
  }

  const handleCardInput = (type, value) => {
    let formattedValue = value.replace(/\D/g, '')
    
    switch(type) {
      case 'cardNumber':
        formattedValue = formattedValue.slice(0, 16)
        formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1-')
        break
      case 'expiry':
        formattedValue = formattedValue.slice(0, 4)
        if (formattedValue.length >= 2) formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2)
        break
      case 'cvv':
        formattedValue = formattedValue.slice(0, 3)
        break
      default:
        break
    }
    
    setState(prev => ({
      ...prev,
      cardData: { ...prev.cardData, [type]: formattedValue }
    }))
    
    if ((type === 'cardNumber' && formattedValue.replace(/\D/g, '').length < 16 && formattedValue.replace(/\D/g, '').length > 0) ||
        (type === 'expiry' && formattedValue.replace(/\D/g, '').length < 4 && formattedValue.replace(/\D/g, '').length > 0) ||
        (type === 'cvv' && formattedValue.length < 3 && formattedValue.length > 0)) {
      setState(prev => ({
        ...prev,
        formErrors: { 
          ...prev.formErrors, 
          [type]: `${type === 'cardNumber' ? 'Card number must be 16 digits' : 
                  type === 'expiry' ? 'Expiry must be MM/YY format' : 
                  'CVV must be 3 digits'}` 
        }
      }))
    } else {
      setState(prev => ({
        ...prev,
        formErrors: { ...prev.formErrors, [type]: '' }
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    const { formData } = state
    
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode']
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'This field is required'
      }
    })
    
    if (formData.phone && formData.phone.length !== 10) {
      errors.phone = 'Phone number must be exactly 10 digits'
    }
    
    if (formData.pincode && formData.pincode.length !== 6) {
      errors.pincode = 'Pincode must be exactly 6 digits'
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address'
    }
    
    if (state.selectedPayment === 'upi') {
      if (!state.upiId.trim()) {
        errors.upiId = 'Please enter UPI ID or Phone Number'
      } else {
        const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
        const phonePattern = /^[6-9]\d{9}$/
        if (!upiPattern.test(state.upiId) && !phonePattern.test(state.upiId.replace(/\D/g, ''))) {
          errors.upiId = 'Enter valid UPI ID or Phone Number'
        }
      }
    }
    
    if (state.selectedPayment === 'card') {
      if (state.cardData.cardNumber.replace(/\D/g, '').length !== 16) {
        errors.cardNumber = 'Card number must be 16 digits'
      }
      if (state.cardData.expiry.replace(/\D/g, '').length !== 4) {
        errors.expiry = 'Expiry must be MM/YY format'
      }
      if (state.cardData.cvv.length !== 3) {
        errors.cvv = 'CVV must be 3 digits'
      }
    }
    
    return errors
  }

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-yellow-500 text-black'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  // Function to extract numeric value from price string INCLUDING customization
  const extractPriceValue = (priceString) => {
    if (!priceString) return 0;
    if (typeof priceString === 'number') return priceString;
    if (typeof priceString === 'string') {
      // Remove ₹ symbol and commas, then parse
      const numericString = priceString.replace('₹', '').replace(/,/g, '');
      const parsedValue = parseFloat(numericString);
      return isNaN(parsedValue) ? 0 : parsedValue;
    }
    return 0;
  };

  // Get item price including customization
  const getItemPrice = (item) => {
    const basePrice = extractPriceValue(item.price);
    const customizationTotal = item.customizationData?.customizationTotal || 0;
    return basePrice + customizationTotal;
  };

  // Get item total (price × quantity)
  const getItemTotal = (item) => {
    const itemPrice = getItemPrice(item);
    const quantity = parseInt(item.quantity) || 1;
    return itemPrice * quantity;
  };

  // Format price for display
  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Calculate cart subtotal including customization
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0);
  };

  // Calculate final total with COD charges
  const calculateFinalTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = parseFloat(getCouponDiscount()) || 0;
    const codCharges = state.selectedPayment === 'cod' ? 10 : 0;
    const total = subtotal - discount + codCharges;
    return total;
  };

  const handlePlaceOrder = async () => {
    const errors = validateForm()
    
    if (Object.keys(errors).length > 0) {
      setState(prev => ({ ...prev, formErrors: errors }))
      showToast('Please fix the errors in the form', 'error')
      return
    }
    
    // SHOW PROCESSING SCREEN IMMEDIATELY
    setIsProcessingOrder(true)
    
    // IMPORTANT: Force React to render the processing screen before continuing
    await new Promise(resolve => setTimeout(resolve, 100))
    
    try {
      const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`
      
      // Calculate using our helper functions
      const subtotal = calculateSubtotal();
      const discount = parseFloat(getCouponDiscount()) || 0;
      const codCharges = state.selectedPayment === 'cod' ? 10 : 0;
      const total = subtotal - discount + codCharges;
      
      // Create cart items with proper price format
      const orderItems = cartItems.map(item => {
        const itemPrice = getItemPrice(item);
        const quantity = parseInt(item.quantity) || 1;
        const itemTotal = getItemTotal(item);
        
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          price: itemPrice, // Unit price including customization
          priceString: formatPrice(itemPrice), // Formatted price string
          size: item.size,
          quantity: quantity,
          team: item.team,
          league: item.league,
          customizationData: item.customizationData || null,
          total: itemTotal
        };
      });
      
      // SAVE ORDER SUMMARY BEFORE CLEARING CART
      setOrderSummary({
        items: [...cartItems],
        subtotal: subtotal,
        discount: discount,
        total: total,
        couponDiscount: discount,
        codCharges: codCharges
      })
      
      // Create order object
      const orderData = {
        id: Date.now().toString(),
        orderNumber: newOrderNumber,
        userId: user.id,
        username: user.username,
        userEmail: user.email,
        date: new Date().toISOString(),
        status: 'Processing',
        items: orderItems,
        subtotal: parseFloat(subtotal.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        couponDiscount: parseFloat(discount.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        paymentMethod: state.selectedPayment,
        shippingAddress: {
          ...state.formData,
          name: state.formData.name || user.username || ''
        },
        couponApplied: appliedCoupon?.code || null,
        codCharges: codCharges,
        trackingNumber: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
        addressSource: state.useSavedAddress ? 'saved_address' : 'manual_entry'
      }
      
      console.log('Order data to save:', orderData)
      
      // ADD ARTIFICIAL DELAY TO SHOW PROCESSING SCREEN (2 seconds)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Save order to orders collection
      try {
        const orderResponse = await api.post('/orders', orderData)
        console.log('Order saved to /orders:', orderResponse.data)
      } catch (orderError) {
        console.warn('Could not save to /orders:', orderError.message)
        // Don't fail the order if this fails
      }
      
      // Update user's orders
      const updatedUserOrders = [...(user.orders || []), orderData]
      try {
        await api.patch(`/users/${user.id}`, {
          orders: updatedUserOrders
        })
        console.log('User orders updated')
      } catch (userError) {
        console.warn('Could not update user orders:', userError.message)
        // Don't fail the order if this fails
      }
      
      // Clear the cart
      if (clearCart) {
        clearCart()
      }
      
      // Add small delay before showing success
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update local state to show success page
      updateState('orderNumber', newOrderNumber)
      updateState('orderPlaced', true)
      setIsProcessingOrder(false)
      
      showToast('Order placed successfully!', 'success')
      
    } catch (error) {
      console.error('Order placement error:', error)
      showToast('Failed to place order. Please try again.', 'error')
      setIsProcessingOrder(false)
    }
  }

  const handleContinueShopping = () => {
    navigate('/products')
  }

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <div className="text-[#00ff00] text-lg">Loading checkout...</div>
        </div>
      </div>
    )
  }

  // Only redirect if explicitly false, not if undefined/null (loading)
  if (isAuthenticated === false) {
    return null // Will redirect in useEffect
  }

  if (isProcessingOrder) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-[#00ff00] text-6xl mb-6 animate-pulse">⏳</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              PROCESSING YOUR ORDER
            </h2>
            <div className="text-gray-400 mb-8">
              Please wait while we confirm your order...
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 border-4 border-[#00ff00]/30 border-t-[#00ff00] rounded-full animate-spin"></div>
            </div>
            
            <div className="text-gray-400 text-sm space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                <span>Verifying payment details</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse"></div>
                <span>Confirming inventory</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                <span>Generating order confirmation</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (state.orderPlaced) {
    const itemsCount = orderSummary.items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0)
    
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-[#00ff00] text-6xl mb-6 animate-bounce">✅</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">ORDER PLACED SUCCESSFULLY!</h2>
            <div className="text-[#00ff00] text-xl font-bold mb-4">Order #{state.orderNumber}</div>
            <p className="text-gray-400 mb-6">Thank you for your purchase!</p>
            
            <div className="bg-[#1a1a1a] border border-[#00ff00]/20 rounded-xl p-6 mb-8">
              <div className="text-white font-poppins font-semibold text-lg mb-4">Order Summary</div>
              
              {orderSummary.items.map((item, index) => {
                const itemPrice = getItemPrice(item);
                const quantity = parseInt(item.quantity) || 1;
                const itemTotal = getItemTotal(item);
                
                return (
                  <div key={index} className="flex items-center justify-between bg-[#111111] p-3 rounded-lg mb-3">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg"/>
                      <div className="text-left">
                        <div className="text-white text-sm font-poppins font-medium">{item.name}</div>
                        <div className="text-gray-400 text-xs">Size: {item.size} • Qty: {item.quantity}</div>
                        {item.customizationData && (
                          <div className="text-xs text-[#00ff00] mt-1">
                            Customized: 
                            {item.customizationData.playerName && ` ${item.customizationData.playerName.toUpperCase()}`}
                            {item.customizationData.playerNumber && ` #${item.customizationData.playerNumber}`}
                            {item.customizationData.patch && ` +${item.customizationData.patch.name}`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#00ff00] font-poppins font-bold">{formatPrice(itemPrice)}</div>
                      {quantity > 1 && (
                        <div className="text-gray-400 text-xs">
                          {quantity} × {formatPrice(itemPrice)} = {formatPrice(itemTotal)}
                        </div>
                      )}
                      {item.customizationData?.customizationTotal > 0 && (
                        <div className="text-gray-400 text-xs">
                          +{formatPrice(item.customizationData.customizationTotal)} customization
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              <div className="space-y-2 text-left border-t border-gray-700 pt-4 mt-4">
                <div className="flex justify-between text-gray-400">
                  <span>Items ({itemsCount})</span>
                  <span>{formatPrice(orderSummary.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#00ff00]">FREE</span>
                </div>
                {appliedCoupon && orderSummary.discount > 0 && (
                  <div className="flex justify-between text-[#00ff00]">
                    <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span>-{formatPrice(orderSummary.discount || 0)}</span>
                  </div>
                )}
                {state.selectedPayment === 'cod' && (
                  <div className="flex justify-between text-yellow-400">
                    <span>COD Charges</span>
                    <span>+{formatPrice(orderSummary.codCharges || 0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-poppins font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>{formatPrice(orderSummary.total || 0)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleContinueShopping}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">Your Cart is Empty</h2>
            <button
              onClick={handleContinueShopping}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery (COD)', icon: '💵', desc: 'Pay when you receive your order', charge: 'Additional ₹10 COD charges apply' },
    { id: 'upi', label: 'UPI Payment', icon: '📱', desc: 'Pay via Google Pay, PhonePe, etc.', charge: 'No additional charges' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Secure card payment', charge: 'No additional charges' }
  ]

  const formFields = [
    { name: 'name', label: 'Full Name *', type: 'text' },
    { name: 'email', label: 'Email *', type: 'email' },
    { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: 'Enter 10-digit mobile number', maxLength: 10 },
    { name: 'pincode', label: 'Pincode *', type: 'text', placeholder: 'Enter 6-digit pincode', maxLength: 6 },
    { name: 'city', label: 'City *', type: 'text' },
    { name: 'state', label: 'State *', type: 'text' }
  ]

  // Calculate cart totals for display
  const displaySubtotal = calculateSubtotal();
  const displayDiscount = parseFloat(getCouponDiscount()) || 0;
  const displayTotal = calculateFinalTotal();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            CHECKOUT <span className="text-[#00ff00]">PAGE</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* SHIPPING INFORMATION SECTION */}
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-poppins">SHIPPING INFORMATION</h2>
                
                {/* Toggle between saved addresses and manual entry */}
                {savedAddresses.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleAddressMode}
                    className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors text-sm font-semibold"
                  >
                    {state.useSavedAddress ? 'Enter Address Manually' : 'Use Saved Address'}
                  </button>
                )}
              </div>

              {/* SAVED ADDRESSES SELECTION */}
              {state.useSavedAddress && savedAddresses.length > 0 ? (
                <div className="mb-8">
                  <div className="text-gray-400 text-sm mb-4">Select a saved address:</div>
                  <div className="space-y-4">
                    {savedAddresses.map((address, index) => (
                      <div 
                        key={index}
                        onClick={() => handleAddressSelect(index)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          state.selectedAddressIndex === index 
                            ? 'border-[#00ff00] bg-[#00ff00]/10' 
                            : 'border-gray-700 hover:border-[#00ff00]/50'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            state.selectedAddressIndex === index ? 'border-[#00ff00]' : 'border-gray-600'
                          }`}>
                            {state.selectedAddressIndex === index && (
                              <div className="w-3 h-3 bg-[#00ff00] rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-white font-poppins font-semibold">{address.name}</div>
                              {address.isDefault && (
                                <span className="bg-[#00ff00] text-black text-xs font-bold px-2 py-1 rounded-full">
                                  DEFAULT
                                </span>
                              )}
                            </div>
                            <div className="text-gray-300 mb-2">{address.address}</div>
                            <div className="text-gray-400 text-sm">
                              {address.city}, {address.state} - {address.pincode}
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                              📞 {address.phone}
                              {address.landmark && <span> • Landmark: {address.landmark}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-xl">
                    <div className="text-white font-poppins font-semibold text-sm mb-2">
                      Selected Address Preview
                    </div>
                    <div className="text-gray-300">
                      <div className="mb-1"><strong>{state.formData.name}</strong></div>
                      <div className="mb-1">{state.formData.address}</div>
                      <div className="text-gray-400">
                        {state.formData.city}, {state.formData.state} - {state.formData.pincode}
                      </div>
                      <div className="text-gray-400 mt-1">📞 {state.formData.phone}</div>
                      {state.formData.landmark && (
                        <div className="text-gray-400">📍 {state.formData.landmark}</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* MANUAL ADDRESS ENTRY */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map(field => (
                    <div key={field.name}>
                      <label className="block text-gray-400 text-sm mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={state.formData[field.name]}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                        placeholder={field.placeholder || ''}
                        maxLength={field.maxLength}
                        required
                      />
                      {state.formErrors[field.name] && (
                        <div className="text-red-400 text-xs mt-1">{state.formErrors[field.name]}</div>
                      )}
                    </div>
                  ))}
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={state.formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
                      required
                    />
                    {state.formErrors.address && (
                      <div className="text-red-400 text-xs mt-1">{state.formErrors.address}</div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={state.formData.landmark}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      placeholder="Nearby landmark"
                    />
                  </div>
                </div>
              )}

              {/* NO SAVED ADDRESSES MESSAGE */}
              {state.useSavedAddress && savedAddresses.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-[#00ff00] text-4xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-white font-poppins mb-2">No Saved Addresses</h3>
                  <p className="text-gray-400 mb-6">You haven't saved any addresses yet.</p>
                  <button
                    onClick={toggleAddressMode}
                    className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors"
                  >
                    Enter Address Manually
                  </button>
                  <div className="mt-4 text-gray-500 text-sm">
                    Or <Link to="/profile" className="text-[#00ff00] hover:underline">add addresses in your profile</Link> for faster checkout
                  </div>
                </div>
              )}
            </div>

            {/* PAYMENT METHOD SECTION */}
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white font-poppins mb-6">PAYMENT METHOD</h2>
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      state.selectedPayment === method.id 
                        ? 'border-[#00ff00] bg-[#00ff00]/10' 
                        : 'border-gray-700 hover:border-[#00ff00]/50'
                    }`}
                    onClick={() => updateState('selectedPayment', method.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        state.selectedPayment === method.id ? 'border-[#00ff00]' : 'border-gray-600'
                      }`}>
                        {state.selectedPayment === method.id && <div className="w-3 h-3 bg-[#00ff00] rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-poppins font-semibold">{method.label}</div>
                        <div className="text-gray-400 text-sm">{method.desc}</div>
                        <div className={`text-xs mt-1 ${method.id === 'cod' ? 'text-yellow-400' : 'text-green-400'}`}>
                          {method.charge}
                        </div>
                      </div>
                      <div className="text-[#00ff00] text-lg">{method.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {state.selectedPayment === 'upi' && (
                <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-xl">
                  <label className="block text-white font-poppins font-semibold text-sm mb-2">
                    Enter UPI ID or Phone Number *
                  </label>
                  <input
                    type="text"
                    value={state.upiId}
                    onChange={handleUpiIdChange}
                    className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    placeholder="username@upi or 9876543210"
                  />
                  {state.formErrors.upiId && <div className="text-red-400 text-xs mt-1">{state.formErrors.upiId}</div>}
                </div>
              )}

              {state.selectedPayment === 'card' && (
                <div className="mt-6 space-y-4 p-4 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-xl">
                  <h3 className="text-white font-poppins font-semibold mb-2">Enter Card Details</h3>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={state.cardData.cardNumber}
                      onChange={(e) => handleCardInput('cardNumber', e.target.value)}
                      className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      placeholder="4444-5555-6666-7777"
                      maxLength="19"
                    />
                    {state.formErrors.cardNumber && <div className="text-red-400 text-xs mt-1">{state.formErrors.cardNumber}</div>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={state.cardData.expiry}
                        onChange={(e) => handleCardInput('expiry', e.target.value)}
                        className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {state.formErrors.expiry && <div className="text-red-400 text-xs mt-1">{state.formErrors.expiry}</div>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">CVV *</label>
                      <div className="relative">
                        <input
                          type={state.showCvv ? "text" : "password"}
                          value={state.cardData.cvv}
                          onChange={(e) => handleCardInput('cvv', e.target.value)}
                          className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] pr-10"
                          placeholder="123"
                          maxLength="3"
                        />
                        <button
                          type="button"
                          onClick={() => updateState('showCvv', !state.showCvv)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00ff00]"
                        >
                          {state.showCvv ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {state.formErrors.cvv && <div className="text-red-400 text-xs mt-1">{state.formErrors.cvv}</div>}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold py-3 rounded-lg hover:bg-[#00ff00]/10 transition-all duration-300"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-poppins font-semibold text-xl mb-6">ORDER SUMMARY</h3>

              {appliedCoupon && (
                <div className="mb-4 p-3 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded-lg">
                  <div className="text-[#00ff00] font-poppins font-bold text-sm">✅ {appliedCoupon.message}</div>
                </div>
              )}

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map(item => {
                  const itemPrice = getItemPrice(item);
                  const quantity = parseInt(item.quantity) || 1;
                  const itemTotal = getItemTotal(item);
                  
                  return (
                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                      <div className="flex-1">
                        <div className="text-white text-sm font-poppins font-semibold">{item.name}</div>
                        <div className="text-gray-400 text-xs">Size: {item.size} • Qty: {item.quantity}</div>
                        {item.customizationData && (
                          <div className="text-xs text-[#00ff00] mt-1">
                            Customized: 
                            {item.customizationData.playerName && ` ${item.customizationData.playerName.toUpperCase()}`}
                            {item.customizationData.playerNumber && ` #${item.customizationData.playerNumber}`}
                            {item.customizationData.patch && ` +${item.customizationData.patch.name}`}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-[#00ff00] font-poppins font-bold">{formatPrice(itemPrice)}</div>
                        {quantity > 1 && (
                          <div className="text-gray-400 text-xs">
                            {quantity} × {formatPrice(itemPrice)} = {formatPrice(itemTotal)}
                          </div>
                        )}
                        {item.customizationData?.customizationTotal > 0 && (
                          <div className="text-gray-400 text-xs">
                            +{formatPrice(item.customizationData.customizationTotal)} customization
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0)} items)</span>
                  <span>{formatPrice(displaySubtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#00ff00]">FREE</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#00ff00]">
                    <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span>-{formatPrice(displayDiscount)}</span>
                  </div>
                )}
                {state.selectedPayment === 'cod' && (
                  <div className="flex justify-between text-yellow-400">
                    <span>COD Charges</span>
                    <span>+₹10.00</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white font-poppins font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(displayTotal)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#00ff00] text-black font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300 mb-4"
              >
                PLACE ORDER
              </button>

              <div className="text-center text-gray-400 text-sm">
                100% Secure Payment • SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage