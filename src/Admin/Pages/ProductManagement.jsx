import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'
import { useLocation, useNavigate } from 'react-router-dom'

const ProductManagement = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: '2025-26-season-kits',
    team: '',
    league: '',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false
  })
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    // Check if URL has action=add parameter
    const params = new URLSearchParams(location.search)
    if (params.get('action') === 'add') {
      handleAddProduct()
      // Clean up the URL
      navigate('/admin/products', { replace: true })
    }
  }, [location.search])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory])

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image'
    
    // If it's already a full URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // If it's a local path starting with / or ./
    if (imagePath.startsWith('/') || imagePath.startsWith('./')) {
      return `http://localhost:5173${imagePath.startsWith('/') ? imagePath : imagePath.substring(1)}`
    }
    
    return imagePath
  }

  // Update image preview when form image changes
  useEffect(() => {
    if (formData.image) {
      setImagePreview(getImageUrl(formData.image))
    } else {
      setImagePreview('')
    }
  }, [formData.image])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      
      // Log the response to debug
      console.log('Products API Response:', response)
      
      // Handle different response structures
      const productsData = response.data || response || []
      
      if (Array.isArray(productsData)) {
        setProducts(productsData)
      } else if (productsData.products) {
        setProducts(productsData.products)
      } else if (productsData.data) {
        setProducts(productsData.data)
      } else {
        console.error('Unexpected products response structure:', productsData)
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Show error to user
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Failed to load products. Check console.'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
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
    console.log('Filtered products:', filtered.length, 'from total:', products.length)
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await api.delete(`/products/${productId}`)
      setProducts(products.filter(product => product.id !== productId))

      // Show success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Product deleted successfully!'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    } catch (error) {
      console.error('Error deleting product:', error)

      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Failed to delete product'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  const handleEditProduct = (product) => {
    console.log('Editing product:', product)
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      price: product.price ? product.price.replace('₹', '').replace(/,/g, '') : '',
      originalPrice: product.originalPrice ? product.originalPrice.replace('₹', '').replace(/,/g, '') : '',
      discount: product.discount ? product.discount.replace('% OFF', '') : '',
      image: product.image || '',
      category: product.category || '2025-26-season-kits',
      team: product.team || '',
      league: product.league || '',
      description: product.description || '',
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      inStock: product.inStock !== undefined ? product.inStock : true,
      featured: product.featured || false
    })
    setShowModal(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: '2025-26-season-kits',
      team: '',
      league: '',
      description: '',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      featured: false
    })
    setImagePreview('')
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const value = e.target.value
    // Normalize backslashes to forward slashes
    const normalizedValue = value.replace(/\\/g, '/')
    setFormData({ ...formData, image: normalizedValue })
  }

  const isValidImageUrl = (url) => {
    if (!url) return true // Allow empty for preview purposes
    
    // Accept any string as valid - let the browser handle invalid URLs
    // We'll use onError handlers to show fallback images
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim()) {
      alert('Product name is required')
      return
    }

    if (!formData.price) {
      alert('Price is required')
      return
    }

    if (!formData.image.trim()) {
      alert('Image URL is required')
      return
    }

    try {
      const productData = {
        ...formData,
        price: `₹${parseInt(formData.price || 0).toLocaleString('en-IN')}`,
        originalPrice: formData.originalPrice ? `₹${parseInt(formData.originalPrice).toLocaleString('en-IN')}` : undefined,
        discount: formData.discount ? `${formData.discount}% OFF` : undefined
      }

      if (editingProduct) {
        // Update existing product
        await api.patch(`/products/${editingProduct.id}`, productData)
        setProducts(products.map(p =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        ))

        // Show success notification
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
        notification.textContent = 'Product updated successfully!'
        document.body.appendChild(notification)
        setTimeout(() => notification.remove(), 3000)
      } else {
        // Create new product
        const newProduct = {
          ...productData,
          id: Date.now().toString()
        }
        await api.post('/products', newProduct)
        setProducts([...products, newProduct])

        // Show success notification
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
        notification.textContent = 'Product added successfully!'
        document.body.appendChild(notification)
        setTimeout(() => notification.remove(), 3000)
      }

      setShowModal(false)
    } catch (error) {
      console.error('Error saving product:', error)

      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Failed to save product'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">

      {/* Header */}
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
          <button
            onClick={handleAddProduct}
            className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden hover:border-[#00ff00]/40 transition-colors"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-[#1a1a1a] overflow-hidden">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', product.image)
                    e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'
                  }}
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
                  <p>
                    {product.team || 'No team'} 
                    {product.league && ` • ${product.league}`}
                  </p>
                  <p className="mt-1">
                    Sizes: {product.sizes?.join(', ') || 'N/A'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
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

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
                    <div className="w-32 h-32 bg-[#1a1a1a] rounded-lg overflow-hidden mx-auto">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      min="0"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Discount (%)</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      min="0"
                      max="100"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    >
                      <option value="2025-26-season-kits">2025/26 Season Kits</option>
                      <option value="international-kits">International Kits</option>
                      <option value="retro-jerseys">Retro Jerseys</option>
                      <option value="anthem-jackets">Anthem Jackets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Team *</label>
                    <input
                      type="text"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">League</label>
                    <input
                      type="text"
                      value={formData.league}
                      onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Image URL *</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={handleImageChange}
                      required
                      placeholder="Paste URL or enter local path like /images/..."
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Supports: Local paths (/images/...) or URLs (https://...)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Sizes *</label>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          const newSizes = formData.sizes.includes(size)
                            ? formData.sizes.filter(s => s !== size)
                            : [...formData.sizes, size]
                          setFormData({ ...formData, sizes: newSizes.sort() })
                        }}
                        className={`px-3 py-1 rounded-lg transition-colors ${formData.sizes.includes(size)
                            ? 'bg-[#00ff00] text-black'
                            : 'bg-[#1a1a1a] text-gray-400 border border-gray-700'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4 text-[#00ff00] bg-[#1a1a1a] border-gray-700 rounded focus:ring-[#00ff00] focus:ring-2"
                      />
                      <span className="text-gray-400 text-sm">In Stock</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-[#00ff00] bg-[#1a1a1a] border-gray-700 rounded focus:ring-[#00ff00] focus:ring-2"
                      />
                      <span className="text-gray-400 text-sm">Featured Product</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement