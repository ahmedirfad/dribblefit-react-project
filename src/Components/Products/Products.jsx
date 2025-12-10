import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../../Api/Axios.jsx'
import { useCart } from '../../Contexts/CartContext'
import WishlistButton from '../Common/WishlistButton'
import Navbar from '../Layout/Navbar.jsx'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()

  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')
  const urlSearch = searchParams.get('search')

  const categories = [
    'all',
    '2025-26-season-kits',
    'international-kits',
    'retro-jerseys',
    'anthem-jackets'
  ]

  const getCategoryDisplayName = (category) => {
    const names = {
      'all': 'All Products',
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits',
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory)
    }
    if (urlSearch) {
      setSearchTerm(urlSearch)
    }
  }, [urlCategory, urlSearch])


  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchTerm])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.league?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
    addToCart(product, defaultSize, 1)

    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Added ${product.name} to cart!`
    document.body.appendChild(notification)

    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  // In Products.jsx, update the getImageUrl function:
  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''

    // Normalize path: convert backslashes to forward slashes
    const normalizedPath = imagePath.replace(/\\/g, '/')

    // If it's a local path starting with / or images/
    if (normalizedPath.startsWith('/') || normalizedPath.startsWith('images/')) {
      // Ensure it starts with /
      const cleanPath = normalizedPath.startsWith('/')
        ? normalizedPath
        : `/${normalizedPath}`

      return `http://localhost:5173${cleanPath}`
    }

    // If it's already a full URL
    if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
      return normalizedPath
    }

    // Default: assume it's a local path
    return `http://localhost:5173/images/${normalizedPath}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-[#00ff00] text-lg">Loading products...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            OUR <span className="text-[#00ff00]">COLLECTIONS</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our complete range of football jerseys and accessories
          </p>

          {searchTerm && (
            <div className="mt-4">
              <p className="text-[#00ff00]">
                Showing results for: <span className="font-bold">"{searchTerm}"</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryDisplayName(category)}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              type="text"
              placeholder="Search jerseys, teams, leagues..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-500"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-500 hover:text-[#00ff00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
        </div>

        {/* products-count */}
        <div className="text-gray-400 mb-6">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedCategory !== 'all' && ` in ${getCategoryDisplayName(selectedCategory)}`}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              No products found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${getCategoryDisplayName(selectedCategory)}`}
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchTerm('')
              }}
              className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-4 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 group"
              >

                <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-[#1a1a1a]">
                  <img
                    src={getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Image failed to load:', product.image)
                      e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'
                      e.target.className = 'w-full h-full object-contain bg-gray-800 p-4'
                    }}
                  />

                  {/* Wishlist Button - Top Right */}
                  <div className="absolute top-2 right-2 z-10">
                    <WishlistButton product={product} size="sm" />
                  </div>

                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-[#00ff00] text-black font-bold px-2 py-1 rounded text-xs">
                      {product.discount}
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-2 right-10 bg-red-500 text-white font-bold px-2 py-1 rounded text-xs">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* product-info */}
                <div className="p-2">
                  <h3 className="text-white font-poppins font-semibold text-sm mb-2 line-clamp-2 min-h-[2.8rem]">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-xs">
                      {product.team} {product.league && `• ${product.league}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#00ff00] font-poppins font-bold text-lg">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 text-sm line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex-1 font-poppins font-bold py-2 rounded-lg transition-all duration-300 text-sm ${product.inStock
                          ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]'
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <Link
                      to={`/product/${product.id}`}
                      className="bg-transparent border border-[#00ff00] text-[#00ff00] font-poppins font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Products