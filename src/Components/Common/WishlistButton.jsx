import React from 'react'
import { useWishlist } from '../../Contexts/WishlistContext'

function WishlistButton({ product, size = 'md' }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const productId = product.id
  const isWishlisted = isInWishlist(productId)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeFromWishlist(productId)
      
      // Simple notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50'
      notification.textContent = 'Removed from wishlist'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || '',
        team: product.team || ''
      })
      
      // Simple notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50'
      notification.textContent = 'Added to wishlist'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    }
  }

  const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <button
      onClick={handleClick}
      className={`${sizeClass} bg-black/70 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
        isWishlisted ? 'text-red-500' : 'text-white hover:text-red-500'
      }`}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWishlisted ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  )
}

export default WishlistButton