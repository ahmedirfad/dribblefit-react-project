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

  // Auto-save when cart changes
  useEffect(() => {
    if (isInitialized && cartItems.length >= 0) {
      saveCartToDB(cartItems)
    }
  }, [cartItems, isInitialized])

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)
  }

  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === size
      )

      let newItems
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size,
          quantity: quantity,
          inStock: product.inStock,
          team: product.team
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

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceString = item.price.replace('₹', '').replace(',', '')
      const price = parseFloat(priceString)
      return total + (price * item.quantity)
    }, 0)
  }

  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0
    const subtotal = getCartTotal()
    return subtotal * (appliedCoupon.discount / 100)
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
      const existingItem = merged.find(item => 
        item.id === localItem.id && item.size === localItem.size
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
      syncCartOnLogin
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