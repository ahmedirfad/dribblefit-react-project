import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    loadCartFromDB()
    loadCouponFromStorage() // Load coupon from localStorage
  }, [])

  // Load cart from db.json
  const loadCartFromDB = async () => {
    try {
      const currentUserId = localStorage.getItem('currentUserId')
      
      if (currentUserId) {
        const response = await api.get(`/users/${currentUserId}`)
        const user = response.data
        
        if (user && user.cart) {
          setCartItems(user.cart)
          updateCartCount(user.cart)
        } else {
          setCartItems([])
          updateCartCount([])
        }
      } else {
        const savedCart = localStorage.getItem('dribblefit-cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setCartItems(parsedCart)
          updateCartCount(parsedCart)
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      const savedCart = localStorage.getItem('dribblefit-cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
        updateCartCount(parsedCart)
      }
    } finally {
      setIsInitialized(true)
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

  // Save cart to db.json
  const saveCartToDB = async (items) => {
    try {
      const currentUserId = localStorage.getItem('currentUserId')
      
      if (currentUserId) {
        await api.patch(`/users/${currentUserId}`, {
          cart: items
        })
      } else {
        localStorage.setItem('dribblefit-cart', JSON.stringify(items))
      }
    } catch (error) {
      console.error('Error saving cart:', error)
      localStorage.setItem('dribblefit-cart', JSON.stringify(items))
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

  // Auto-save when cart changes
  useEffect(() => {
    if (isInitialized && cartItems.length >= 0) {
      saveCartToDB(cartItems)
    }
  }, [cartItems, isInitialized])

  // Auto-save when coupon changes
  useEffect(() => {
    if (isInitialized) {
      saveCouponToStorage(appliedCoupon)
    }
  }, [appliedCoupon, isInitialized])

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)
  }

  const addToCart = (product, size, quantity = 1, customizationData = null) => {
    setCartItems(prevItems => {
      // Check if item with same ID, size AND customization exists
      const existingItem = prevItems.find(item =>
        item.id === product.id &&
        item.size === size &&
        JSON.stringify(item.customizationData || {}) === JSON.stringify(customizationData || {})
      )

      let newItems
      if (existingItem) {
        // If same item with same customization exists, update quantity
        newItems = prevItems.map(item =>
          item.id === product.id &&
          item.size === size &&
          JSON.stringify(item.customizationData || {}) === JSON.stringify(customizationData || {})
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        // Create new item with customization data
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price, // Keep the original price string
          image: product.image,
          size: size,
          quantity: quantity,
          inStock: product.inStock,
          team: product.team,
          league: product.league,
          customizationData: customizationData
        }
        newItems = [...prevItems, newItem]
      }
      
      // UPDATE CART COUNT IMMEDIATELY
      updateCartCount(newItems)
      
      return newItems
    })
  }

  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => !(item.id === productId && item.size === size))
      
      // UPDATE CART COUNT IMMEDIATELY
      updateCartCount(newItems)
      
      return newItems
    })
  }

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size)
      return
    }

    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
      
      // UPDATE CART COUNT IMMEDIATELY
      updateCartCount(newItems)
      
      return newItems
    })
  }

  const clearCart = () => {
    setCartItems([])
    updateCartCount([])
  }

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  // Helper function to extract price from string and add customization
  const getItemPrice = (item) => {
    // Extract numeric value from price string (handles formats like "₹3,999" or "₹2999")
    const priceString = item.price ? item.price.replace('₹', '').replace(/,/g, '') : '0'
    const basePrice = parseFloat(priceString) || 0
    
    // Add customization cost if exists
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
    const item = cartItems.find(item => item.id === productId && item.size === size)
    return item ? item.quantity : 0
  }

  const syncCartOnLogin = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      const user = response.data
      
      const guestCartJson = localStorage.getItem('dribblefit-cart')
      const guestCart = guestCartJson ? JSON.parse(guestCartJson) : []
      
      const mergedCart = mergeCarts(user.cart || [], guestCart)
      
      setCartItems(mergedCart)
      updateCartCount(mergedCart)
      
      await api.patch(`/users/${userId}`, {
        cart: mergedCart
      })
      
      localStorage.removeItem('dribblefit-cart')
      
    } catch (error) {
      console.error('Error syncing cart on login:', error)
    }
  }

  const mergeCarts = (dbCart, localCart) => {
    const merged = [...dbCart]
    
    localCart.forEach(localItem => {
      // Check for exact match including customization
      const existingItem = merged.find(item => 
        item.id === localItem.id && 
        item.size === localItem.size &&
        JSON.stringify(item.customizationData || {}) === JSON.stringify(localItem.customizationData || {})
      )
      
      if (existingItem) {
        existingItem.quantity += localItem.quantity
      } else {
        merged.push(localItem)
      }
    })
    
    return merged
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      appliedCoupon,
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
      getItemPrice // Export this helper function
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