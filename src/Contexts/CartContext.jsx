import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'
import { useAuth } from './AuthContext.jsx'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuth()

  // Load cart from backend API
  const loadCartFromAPI = async () => {
    if (!isAuthenticated) {
      setLoading(false)
      setIsInitialized(true)
      return
    }

    try {
      setLoading(true)
      const response = await api.get('/cart')

      if (response.data.success && response.data.cart) {
        const items = response.data.cart.items || []
        setCartItems(items)
        updateCartCount(items)
      } else {
        setCartItems([])
        updateCartCount([])
      }
    } catch (error) {
      console.error('Error loading cart from API:', error)
      loadCartFromLocalStorage()
    } finally {
      setLoading(false)
      setIsInitialized(true)
    }
  }
  // Fallback: Load cart from localStorage
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('dribblefit-cart')
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart)
      setCartItems(parsedCart)
      updateCartCount(parsedCart)
    }
  }

  // Save guest cart to localStorage
  const saveCartToLocalStorage = (items) => {
    if (!isAuthenticated) {
      localStorage.setItem('dribblefit-cart', JSON.stringify(items))
    }
  }

  // Load coupon from localStorage
  const loadCouponFromStorage = () => {
    const savedCoupon = localStorage.getItem('dribblefit-coupon')
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon))
      } catch (error) {
        console.error('Error loading coupon:', error)
        localStorage.removeItem('dribblefit-coupon')
      }
    }
  }

  // Save coupon to localStorage
  const saveCouponToStorage = (coupon) => {
    if (coupon) {
      localStorage.setItem('dribblefit-coupon', JSON.stringify(coupon))
    } else {
      localStorage.removeItem('dribblefit-coupon')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadCartFromAPI()
    } else {
      loadCartFromLocalStorage()
      setIsInitialized(true)
      setLoading(false)
    }
    loadCouponFromStorage()
  }, [isAuthenticated])
  
  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)
  }

  // Add item to cart (uses backend API)
  const addToCart = async (product, size, quantity = 1, customizationData = null) => {
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      quantity: quantity,
      team: product.team,
      league: product.league,
      customizationData: customizationData
    }

    if (isAuthenticated) {
      // Logged in user - call backend API
      try {
        const response = await api.post('/cart/add', newItem)
        if (response.data.success) {
          // Reload cart to get updated data
          await loadCartFromAPI()
        }
      } catch (error) {
        console.error('Error adding to cart:', error)
        // Fallback to local update
        addToCartLocal(newItem)
      }
    } else {
      // Guest user - update locally
      addToCartLocal(newItem)
    }
  }

  // Local cart update (for guest users or fallback)
  const addToCartLocal = (newItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item =>
        item.product === newItem.productId &&
        item.size === newItem.size &&
        JSON.stringify(item.customizationData || {}) === JSON.stringify(newItem.customizationData || {})
      )

      let newItems
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.product === newItem.productId &&
            item.size === newItem.size &&
            JSON.stringify(item.customizationData || {}) === JSON.stringify(newItem.customizationData || {})
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        )
      } else {
        newItems = [...prevItems, {
          product: newItem.productId,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          size: newItem.size,
          quantity: newItem.quantity,
          team: newItem.team,
          league: newItem.league,
          customizationData: newItem.customizationData
        }]
      }

      updateCartCount(newItems)
      return newItems
    })
  }

  // Remove item from cart
  const removeFromCart = async (productId, size) => {
    if (isAuthenticated) {
      try {
        await api.delete(`/cart/remove/${productId}/${size}`)
        await loadCartFromAPI()
      } catch (error) {
        console.error('Error removing from cart:', error)
        removeFromCartLocal(productId, size)
      }
    } else {
      removeFromCartLocal(productId, size)
    }
  }

  const removeFromCartLocal = (productId, size) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => !(item.product === productId && item.size === size))
      updateCartCount(newItems)
      return newItems
    })
  }

  // Update quantity
  const updateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size)
      return
    }

    if (isAuthenticated) {
      try {
        if (newQuantity > (cartItems.find(i => i.product === productId && i.size === size)?.quantity || 0)) {
          await api.put(`/cart/increase/${productId}/${size}`)
        } else if (newQuantity < (cartItems.find(i => i.product === productId && i.size === size)?.quantity || 0)) {
          await api.put(`/cart/decrease/${productId}/${size}`)
        }
        await loadCartFromAPI()
      } catch (error) {
        console.error('Error updating quantity:', error)
        updateQuantityLocal(productId, size, newQuantity)
      }
    } else {
      updateQuantityLocal(productId, size, newQuantity)
    }
  }

  const updateQuantityLocal = (productId, size, newQuantity) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.product === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
      updateCartCount(newItems)
      return newItems
    })
  }

  // Clear entire cart
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        await api.delete('/cart/clear')
        setCartItems([])
        updateCartCount([])
      } catch (error) {
        console.error('Error clearing cart:', error)
        setCartItems([])
        updateCartCount([])
      }
    } else {
      setCartItems([])
      updateCartCount([])
    }
  }

  // Sync guest cart after login
  const syncCartOnLogin = async () => {
    const guestCart = cartItems
    if (guestCart.length === 0) return

    try {
      await api.post('/cart/sync', { guestCart })
      await loadCartFromAPI()
    } catch (error) {
      console.error('Error syncing cart:', error)
    }
  }

  // Coupon functions (same as before)
  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  // Helper functions
  const getItemPrice = (item) => {
    const priceString = item.price ? item.price.replace('₹', '').replace(/,/g, '') : '0'
    const basePrice = parseFloat(priceString) || 0
    const customizationTotal = item.customizationData?.customizationTotal || 0
    return basePrice + customizationTotal
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = getItemPrice(item)
      return total + (itemPrice * item.quantity)
    }, 0)
  }

  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0
    const subtotal = getCartTotal()
    return (subtotal * appliedCoupon.discount) / 100
  }

  const getFinalTotal = () => {
    const subtotal = getCartTotal()
    const discount = getCouponDiscount()
    return subtotal - discount
  }

  const getCartItemCount = (productId, size) => {
    const item = cartItems.find(item => item.product === productId && item.size === size)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      appliedCoupon,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      getCartTotal,
      getCouponDiscount,
      getFinalTotal,
      getCartItemCount,
      syncCartOnLogin,
      getItemPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}