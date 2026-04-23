import React, { useState, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../../Api/Axios.jsx'
import { useCart } from '../../Contexts/CartContext'
import WishlistButton from '../Common/WishlistButton'
import Navbar from '../Layout/Navbar.jsx'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('') // ✅ New state for debounced search
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const { addToCart } = useCart()
  const itemsPerPage = 8

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

  // ✅ Debounce search term - waits 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchTerm])

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

  const fetchProducts = async () => {
    try {
      setLoading(true)
      let url = `/products?page=${currentPage}&limit=${itemsPerPage}`
      
      if (selectedCategory !== 'all') {
        url += `&category=${selectedCategory}`
      }
      
      if (debouncedSearchTerm.trim()) {  // ✅ Use debounced value
        url += `&search=${encodeURIComponent(debouncedSearchTerm)}`
      }
      
      const response = await api.get(url)
      const productsData = response.data.products || []
      
      setProducts(productsData)
      setTotalPages(response.data.pagination?.totalPages || 1)
      setTotalProducts(response.data.pagination?.totalProducts || 0)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)  // This updates immediately for UI
    setCurrentPage(1)     // Reset to first page on new search
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
    setSearchTerm('')
    setDebouncedSearchTerm('')
  }

  const clearSearch = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setCurrentPage(1)
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1)
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1)

  const getPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pageNumbers.push(i)
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pageNumbers.push(i)
      } else {
        pageNumbers.push(1)
        pageNumbers.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pageNumbers.push(i)
        pageNumbers.push('...')
        pageNumbers.push(totalPages)
      }
    }
    return pageNumbers
  }

  // ✅ Fetch when debouncedSearchTerm changes (not on every keystroke)
  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory)
    }
    if (urlSearch) {
      setSearchTerm(urlSearch)
      setDebouncedSearchTerm(urlSearch)
    }
  }, [urlCategory, urlSearch])

  useEffect(() => {
    fetchProducts()
  }, [currentPage, selectedCategory, debouncedSearchTerm])  // ✅ Use debouncedSearchTerm

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    const normalizedPath = imagePath.replace(/\\/g, '/')
    if (normalizedPath.startsWith('/') || normalizedPath.startsWith('images/')) {
      const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`
      return `http://localhost:5173${cleanPath}`
    }
    if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
      return normalizedPath
    }
    return `http://localhost:5173/images/${normalizedPath}`
  }

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
    addToCart(product, defaultSize, 1)

    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Added ${product.name} to cart!`
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
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
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryDisplayName(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search jerseys, teams, leagues..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-500"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="text-gray-400 mb-6">
          Showing {products.length} of {totalProducts} products
          {debouncedSearchTerm && ` matching "${debouncedSearchTerm}"`}
          {selectedCategory !== 'all' && ` in ${getCategoryDisplayName(selectedCategory)}`}
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              No products found
              {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
              {selectedCategory !== 'all' && ` in ${getCategoryDisplayName(selectedCategory)}`}
            </div>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchTerm('')
                setDebouncedSearchTerm('')
                setCurrentPage(1)
              }}
              className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
                        e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'
                        e.target.className = 'w-full h-full object-contain bg-gray-800 p-4'
                      }}
                    />
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

            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12 pb-8">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                    currentPage === 1
                      ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
                      : 'bg-[#1a1a1a] text-white hover:bg-[#00ff00] hover:text-black transition-colors'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>

                {getPageNumbers().map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() => typeof pageNumber === 'number' ? paginate(pageNumber) : null}
                    className={`px-4 py-2 rounded-lg min-w-[44px] ${
                      pageNumber === currentPage
                        ? 'bg-[#00ff00] text-black font-bold'
                        : typeof pageNumber === 'number'
                        ? 'bg-[#1a1a1a] text-white hover:bg-[#00ff00]/20 transition-colors'
                        : 'bg-transparent text-gray-500 cursor-default'
                    }`}
                    disabled={typeof pageNumber !== 'number'}
                  >
                    {pageNumber}
                  </button>
                ))}

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg flex items-center gap-1 ${
                    currentPage === totalPages
                      ? 'bg-[#1a1a1a] text-gray-600 cursor-not-allowed'
                      : 'bg-[#1a1a1a] text-white hover:bg-[#00ff00] hover:text-black transition-colors'
                  }`}
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  )
}

export default Products