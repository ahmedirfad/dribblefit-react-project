import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../Contexts/CartContext'
import WishlistButton from '../Common/WishlistButton'

function BestSellers() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [imageIndex, setImageIndex] = useState({ 1: 0, 2: 0, 3: 0 })

  // Update the bestSellers data structure to have proper 'id' field
  const bestSellers = [
    {
      id: 7, // Use productId as id for WishlistButton
      bestsellerId: 1,
      name: "AS ROMA 2025/26 THIRD JERSEY",
      price: "₹899",
      images: [
        "src/assets/roma-third-1.webp", 
        "src/assets/romaa.webp", 
        "src/assets/romaaa.webp",
      ],
      team: "AS Roma",
      inStock: true,
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 6, // Use productId as id for WishlistButton
      bestsellerId: 2,
      name: "REAL MADRID 2025/26 THIRD KIT",
      price: "₹1099",
      images: [
        "src/assets/real-third.webp", 
        "src/assets/realll.webp", 
        "src/assets/realll-1.webp", 
      ],
      team: "Real Madrid",
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2, // Use productId as id for WishlistButton
      bestsellerId: 3,
      name: "LIVERPOOL 2025/26 AWAY JERSEY",
      price: "₹999",
      images: [
        "public/images/liv-newaway.webp", 
        "src/assets/LIV-1.webp", 
        "src/assets/LIV-2.webp"
      ],
      team: "Liverpool",
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL']
    }
  ]

  const handleImageHover = (bestsellerId) => {
    setImageIndex(prev => ({
      ...prev,
      [bestsellerId]: (prev[bestsellerId] + 1) % 3
    }))
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = `Sorry! ${product.name} is out of stock`
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
      return
    }
    
    const cartProduct = {
      id: product.id, // Use product.id instead of product.productId
      name: product.name,
      price: product.price,
      image: product.images[0],
      team: product.team,
      inStock: product.inStock
    }
    
    addToCart(cartProduct, 'M', 1)
    
    const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = `Added ${product.name} to cart!`
      document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] to-[#001a00] py-20 px-4 border-y border-[#00ff00]/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            BEST <span className="text-[#00ff00]">SELLERS</span>
          </h2>
          <p className="text-gray-400 text-lg font-poppins max-w-2xl mx-auto">
            Discover our most popular football jerseys loved by fans worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <div 
              key={product.bestsellerId}
              className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 flex flex-col group"
            >
              
              <div 
                className="relative h-80 mb-6 overflow-hidden rounded-xl bg-[#1a1a1a] cursor-pointer flex-shrink-0"
                onMouseEnter={() => handleImageHover(product.bestsellerId)}
                onClick={() => handleViewDetails(product.id)} // Use product.id
              >
                <div className="relative w-full h-full">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageIndex[product.bestsellerId] === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  />
                  <img 
                    src={product.images[1]} 
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageIndex[product.bestsellerId] === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  />
                  <img 
                    src={product.images[2]} 
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageIndex[product.bestsellerId] === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  />
                </div>

                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {[0, 1, 2].map((dotIndex) => (
                    <div 
                      key={dotIndex}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        imageIndex[product.bestsellerId] === dotIndex ? 'bg-[#00ff00]' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Wishlist Button - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <WishlistButton product={product} size="sm" />
                </div>

                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Hover to scroll
                </div>

                {!product.inStock && (
                  <div className="absolute top-3 left-10 bg-red-500 text-white font-bold px-3 py-1 rounded text-xs">
                    OUT OF STOCK
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-white font-poppins font-semibold text-sm mb-3 line-clamp-2 leading-tight min-h-[2.8rem] text-center group-hover:text-[#00ff00] transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <div className="text-center mb-2">
                    <span className="text-gray-400 text-xs font-poppins">
                      {product.team}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center mb-4">
                    <p className="text-[#00ff00] font-poppins font-bold text-xl text-center">
                      {product.price}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 font-poppins font-bold py-3 rounded-lg transition-all duration-300 text-sm uppercase tracking-wider group/btn ${
                      product.inStock 
                        ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]' 
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <span className="group-hover/btn:scale-105 transition-transform duration-200">
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </span>
                  </button>
                  <button 
                    onClick={() => handleViewDetails(product.id)} // Use product.id
                    className="px-4 bg-transparent border border-[#00ff00] text-[#00ff00] font-poppins font-bold py-3 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm"
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleShopNow}
            className="border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold px-12 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm uppercase tracking-wider"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>

      </div>
    </div>
  )
}

export default BestSellers