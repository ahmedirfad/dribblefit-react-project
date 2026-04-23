import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import api from '../Api/Axios.jsx'
import { useAuth } from './AuthContext.jsx'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [loading, setLoading] = useState(true)
  const hasLoaded = useRef(false)
  const { isAuthenticated } = useAuth()

  // Load from localStorage (guest user)
  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('dribblefit-wishlist')
    if (saved) {
      try {
        setWishlistItems(JSON.parse(saved))
      } catch (error) {
        console.error('Error parsing wishlist:', error)
      }
    }
    setLoading(false)
    hasLoaded.current = true
  }

  // Load wishlist from backend
  const loadWishlist = async () => {
    if (!isAuthenticated) {
      loadFromLocalStorage()
      return
    }

    try {
      setLoading(true)
      const response = await api.get('/wishlist')

      if (response.data.success && response.data.wishlist?.items) {
        const items = response.data.wishlist.items.map(item => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          team: item.team
        }))
        setWishlistItems(items)
      } else {
        setWishlistItems([])
      }
    } catch (error) {
      console.error('Error loading wishlist:', error)
      loadFromLocalStorage()
    } finally {
      setLoading(false)
      hasLoaded.current = true
    }
  }

  // Save to localStorage (guest user)
  const saveToLocalStorage = (items) => {
    if (!isAuthenticated) {
      localStorage.setItem('dribblefit-wishlist', JSON.stringify(items))
    }
  }

  // ✅ FIXED: Only load wishlist if token exists
  useEffect(() => {
  if (isAuthenticated) {
    loadWishlist()
  } else {
    loadFromLocalStorage()
    setLoading(false)
    hasLoaded.current = true
  }
}, [isAuthenticated])

  // Toggle wishlist
  const toggleWishlist = async (product) => {
    const productData = {
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      team: product.team || ''
    }

    if (isAuthenticated) {
      try {
        const response = await api.patch(`/wishlist/${product.id}`, productData)

        if (response.data.action === 'added') {
          setWishlistItems(prev => [...prev, {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image || product.images?.[0],
            team: product.team || ''
          }])
        } else {
          setWishlistItems(prev => prev.filter(item => item.id !== product.id))
        }
      } catch (error) {
        console.error('Error toggling wishlist:', error)
        toggleWishlistLocal(product)
      }
    } else {
      toggleWishlistLocal(product)
    }
  }

  const toggleWishlistLocal = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      } else {
        return [...prev, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0],
          team: product.team || ''
        }]
      }
    })
  }

  const removeFromWishlist = (id) => {
    if (isAuthenticated) {
      api.patch(`/wishlist/${id}`, {}).catch(console.error)
    }
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const clearWishlist = async () => {
    if (isAuthenticated) {
      try {
        await api.delete('/wishlist/clear')
      } catch (error) {
        console.error('Error clearing wishlist:', error)
      }
    }
    setWishlistItems([])
  }

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id)
  }

  const syncWishlistOnLogin = async () => {
    const guestWishlist = wishlistItems
    if (guestWishlist.length === 0) return

    for (const item of guestWishlist) {
      try {
        await api.patch(`/wishlist/${item.id}`, {
          name: item.name,
          price: item.price,
          image: item.image,
          team: item.team
        })
      } catch (error) {
        console.error('Error syncing item:', item.id, error)
      }
    }

    localStorage.removeItem('dribblefit-wishlist')
    await loadWishlist()
  }

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      loading,
      toggleWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist,
      syncWishlistOnLogin
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}