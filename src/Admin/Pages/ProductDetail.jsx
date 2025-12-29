import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image'
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    if (imagePath.startsWith('/') || imagePath.startsWith('./')) {
      return `http://localhost:5173${imagePath.startsWith('/') ? imagePath : imagePath.substring(1)}`
    }
    
    return imagePath
  }

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/products/${id}`)
      const productData = response.data || response
      setProduct(productData)
    } catch (error) {
      console.error('Error fetching product:', error)
      showNotification('Failed to load product', 'error')
      navigate('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await api.delete(`/products/${id}`)
      showNotification('Product deleted successfully!', 'success')
      setTimeout(() => {
        navigate('/admin/products')
      }, 1000)
    } catch (error) {
      console.error('Error deleting product:', error)
      showNotification('Failed to delete product', 'error')
    } finally {
      setShowDeleteConfirm(false)
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-white text-xl mb-2">Product not found</h2>
        <Link
          to="/admin/products"
          className="text-[#00ff00] hover:underline"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  const getCategoryDisplayName = (category) => {
    const names = {
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits',
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Back Button */}
      <Link
        to="/admin/products"
        className="inline-flex items-center text-gray-400 hover:text-white mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{product.name}</h1>
          <p className="text-gray-400">Product Details</p>
          <div className="mt-1 text-sm text-gray-500">
            ID: <span className="font-mono text-white">{id}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/admin/products/edit/${id}`}
            className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Product
          </Link>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div>
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
            <div className="relative h-96 bg-[#1a1a1a]">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', product.image)
                  e.target.src = 'https://via.placeholder.com/600x800?text=Image+Not+Found'
                }}
              />
              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.featured && (
                  <span className="bg-yellow-500 text-black text-sm font-bold px-3 py-1 rounded-full inline-block">
                    FEATURED
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full inline-block">
                    OUT OF STOCK
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div>
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
            {/* Price Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#00ff00] text-3xl font-bold">
                    {product.price || '₹0'}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through ml-2">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <span className="bg-[#00ff00] text-black font-bold px-3 py-1 rounded">
                    {product.discount}
                  </span>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm">Team</label>
                <p className="text-white font-medium">{product.team || 'N/A'}</p>
              </div>
              
              <div>
                <label className="text-gray-400 text-sm">League</label>
                <p className="text-white font-medium">{product.league || 'N/A'}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Category</label>
                <p className="text-white font-medium">{getCategoryDisplayName(product.category)}</p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Available Sizes</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {product.sizes?.map(size => (
                    <span
                      key={size}
                      className="bg-[#1a1a1a] border border-gray-700 text-white px-3 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Stock Status</label>
                <p className={`font-medium ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Created/Updated</label>
                <p className="text-white font-medium">
                  {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm block mb-2">Description</label>
              <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{product.description || 'No description available.'}</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-gray-400 text-sm mb-2">Additional Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-xs">Product ID</label>
                  <p className="text-white font-mono text-sm">{id}</p>
                </div>
                <div>
                  <label className="text-gray-500 text-xs">Featured</label>
                  <p className={`text-sm ${product.featured ? 'text-green-500' : 'text-gray-400'}`}>
                    {product.featured ? 'Yes' : 'No'}
                  </p>
                </div>
                <div>
                  <label className="text-gray-500 text-xs">Image URL</label>
                  <p className="text-gray-300 text-sm truncate">{product.image || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-red-500/20 rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Delete Product</h3>
                <p className="text-gray-400">
                  Are you sure you want to delete <span className="text-white font-bold">"{product.name}"</span>? This action cannot be undone.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 border border-gray-700 text-gray-400 py-3 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail