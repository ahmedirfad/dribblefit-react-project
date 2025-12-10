import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const hasLoaded = useRef(false)

  // Load from localStorage ONCE
  useEffect(() => {
    if (hasLoaded.current) return
    
    console.log('🔄 Loading wishlist...')
    const saved = localStorage.getItem('dribblefit-wishlist')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setWishlistItems(parsed)
        console.log('✅ Loaded:', parsed)
      } catch {
        console.log('❌ Error loading, starting fresh')
      }
    }
    
    hasLoaded.current = true
  }, [])

  // Save to localStorage when wishlist changes
  useEffect(() => {
    if (!hasLoaded.current) return
    
    console.log('💾 Saving wishlist:', wishlistItems)
    localStorage.setItem('dribblefit-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev // Already exists
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist
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