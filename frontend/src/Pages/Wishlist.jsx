import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useWishlist } from '../Contexts/WishlistContext'
import { useCart } from '../Contexts/CartContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    const defaultSize = 'M' // Default size
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      team: product.team,
      inStock: product.inStock
    }
    
    addToCart(cartProduct, defaultSize, 1)
    
    // Show notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Added ${product.name} to cart!`
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const handleRemoveItem = (productId, productName) => {
    removeFromWishlist(productId)
    
    // Show notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Removed ${productName} from wishlist`
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist()
      
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Wishlist cleared!'
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-red-500 text-6xl mb-6">❤️</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-gray-400 mb-8">
              Save your favorite football jerseys here for later!
            </p>
            <button
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              BROWSE PRODUCTS
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
            MY <span className="text-[#00ff00]">WISHLIST</span>
            <span className="text-gray-400 text-lg ml-4">({wishlistItems.length} items)</span>
          </h1>
          
          <div className="flex gap-4">
            <button
              onClick={handleClearWishlist}
              className="text-red-400 hover:text-red-300 transition-colors text-sm border border-red-400/30 hover:border-red-300/50 px-4 py-2 rounded-lg"
            >
              Clear All
            </button>
            <button
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id}
              className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-4 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-[#1a1a1a]">
                <img 
                  src={item.image} // FIXED: Remove the localhost prefix
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                  }}
                />
                
                {/* Remove Button - Top Right */}
                <button
                  onClick={() => handleRemoveItem(item.id, item.name)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:text-red-400 hover:scale-110 transition-all duration-300"
                  aria-label="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Team Badge */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {item.team}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-2">
                <h3 className="text-white font-poppins font-semibold text-sm mb-2 line-clamp-2 min-h-[2.8rem]">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#00ff00] font-poppins font-bold text-lg">
                    {item.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-[#00ff00] text-black font-poppins font-bold py-2 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/product/${item.id}`}
                    className="bg-transparent border border-[#00ff00] text-[#00ff00] font-poppins font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm flex items-center justify-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Wishlist