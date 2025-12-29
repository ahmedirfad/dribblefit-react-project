import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'
import { useNavigate, Link } from 'react-router-dom'

const ProductManagement = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(9)

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
    setCurrentPage(1)
  }, [products, searchTerm, selectedCategory])

  // ✅ UPDATED IMAGE FUNCTION - More robust
  const getImageUrl = (imagePath) => {
    if (!imagePath || imagePath.trim() === '') {
      return 'https://via.placeholder.com/300x400?text=No+Image'
    }

    // Already absolute URL - return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }

    // Handle relative paths
    let cleanPath = imagePath
    
    // Remove "./" if present
    if (cleanPath.startsWith('./')) {
      cleanPath = cleanPath.substring(2)
    }
    
    // Remove leading "/" if present (we'll add it properly)
    if (cleanPath.startsWith('/')) {
      cleanPath = cleanPath.substring(1)
    }

    // Get base URL from axios config
    const baseURL = api.defaults.baseURL || ''
    
    // Ensure proper URL construction
    if (baseURL && !baseURL.endsWith('/')) {
      return `${baseURL}/${cleanPath}`
    }
    
    return `${baseURL}${cleanPath}`
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      const productsData = response.data || response || []
      
      let productsArray = []
      if (Array.isArray(productsData)) {
        productsArray = productsData
      } else if (productsData.products) {
        productsArray = productsData.products
      } else if (productsData.data) {
        productsArray = productsData.data
      } else {
        productsArray = []
      }
      
      console.log('Fetched products:', productsArray)
      console.log('Sample image path:', productsArray[0]?.image)
      console.log('Generated image URL:', getImageUrl(productsArray[0]?.image))
      
      setProducts(productsArray)
    } catch (error) {
      console.error('Error fetching products:', error)
      showNotification('Failed to load products', 'error')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (product.team?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      )
    }

    setFilteredProducts(filtered)
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

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return

    try {
      await api.delete(`/products/${productId}`)
      setProducts(products.filter(product => product.id !== productId))
      showNotification('Product deleted successfully!', 'success')
    } catch (error) {
      console.error('Error deleting product:', error)
      showNotification('Failed to delete product', 'error')
    }
  }

  const handleViewProduct = (product) => {
    navigate(`/admin/products/${product.id}`)
  }

  const handleEditProduct = (product) => {
    navigate(`/admin/products/edit/${product.id}`)
  }

  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 'bg-red-500 text-white'
    } font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce`
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  const categories = [
    'all',
    '2025-26-season-kits',
    'international-kits',
    'retro-jerseys',
    'anthem-jackets'
  ]

  const getCategoryDisplayName = (category) => {
    const names = {
      'all': 'All Categories',
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits',
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading products...</div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6 p-4">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Management</h1>
          <p className="text-gray-400">Manage your football jersey inventory</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-full md:w-64 text-sm"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <Link
            to="/admin/products/add"
            className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {getCategoryDisplayName(category)}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm('')
            setSelectedCategory('all')
            setCurrentPage(1)
          }}
          className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-white">{products.length}</p>
        </div>
        <div className="bg-[#111111] border border-green-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">In Stock</p>
          <p className="text-2xl font-bold text-white">
            {products.filter(p => p.inStock).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-red-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-white">
            {products.filter(p => !p.inStock).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-yellow-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-white">
            {products.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden hover:border-[#00ff00]/40 transition-colors group"
            >
              {/* Product Image - UPDATED: Removed hover overlay */}
              <div 
                className="relative h-48 bg-[#1a1a1a] overflow-hidden cursor-pointer"
                onClick={() => handleViewProduct(product)}
              >
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    console.error('Image failed to load:', product.image, 'Generated URL:', getImageUrl(product.image))
                    e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'
                    e.target.className = 'w-full h-full object-contain bg-[#1a1a1a] p-4'
                  }}
                  onLoad={() => console.log('Image loaded successfully:', getImageUrl(product.image))}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {product.featured && (
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                  {product.name || 'Unnamed Product'}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#00ff00] font-bold">
                    {product.price || '₹0'}
                  </span>
                  {product.discount && (
                    <span className="bg-[#00ff00] text-black text-xs font-bold px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="text-gray-400 text-sm mb-4">
                  <p className="line-clamp-1">
                    {product.team || 'No team'} 
                    {product.league && ` • ${product.league}`}
                  </p>
                  <p className="mt-1">
                    ID: <span className="text-white font-mono">{product.id}</span>
                  </p>
                  <p className="mt-1">
                    Sizes: {product.sizes?.join(', ') || 'N/A'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="flex-1 bg-[#00ff00]/20 text-[#00ff00] py-2 rounded-lg hover:bg-[#00ff00]/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 border border-dashed border-gray-700 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {searchTerm || selectedCategory !== 'all'
              ? `No products found matching "${searchTerm}" in ${getCategoryDisplayName(selectedCategory)}`
              : 'No products available. Click "Add Product" to create your first product.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && ( 
        <div className="flex items-center justify-center space-x-2 py-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
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
              className={`px-3 py-2 rounded-lg min-w-[40px] ${
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
            className={`px-3 py-2 rounded-lg flex items-center gap-1 ${
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
    </div>
  )
}

export default ProductManagement