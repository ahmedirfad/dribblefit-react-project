import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'
import { useNavigate, Link } from 'react-router-dom'

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

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

  const getImageUrl = (imagePath) => {
    if (!imagePath) return ''
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    if (imagePath.startsWith('/') || imagePath.startsWith('./')) {
      return `http://localhost:5173${imagePath.startsWith('/') ? imagePath : imagePath.substring(1)}`
    }
    
    return imagePath
  }

  useEffect(() => {
    if (formData.image) {
      setImagePreview(getImageUrl(formData.image))
    } else {
      setImagePreview('')
    }
  }, [formData.image])

  const handleImageChange = (e) => {
    const value = e.target.value
    const normalizedValue = value.replace(/\\/g, '/')
    setFormData({ ...formData, image: normalizedValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Validation
    if (!formData.name.trim()) {
      alert('Product name is required')
      setLoading(false)
      return
    }

    if (!formData.price) {
      alert('Price is required')
      setLoading(false)
      return
    }

    if (!formData.image.trim()) {
      alert('Image URL is required')
      setLoading(false)
      return
    }

    try {
      const productData = {
        ...formData,
        price: `₹${parseInt(formData.price || 0).toLocaleString('en-IN')}`,
        originalPrice: formData.originalPrice ? `₹${parseInt(formData.originalPrice).toLocaleString('en-IN')}` : undefined,
        discount: formData.discount ? `${formData.discount}% OFF` : undefined,
        id: Date.now().toString() // Generate unique ID
      }

      const response = await api.post('/products', productData)
      
      showNotification('Product added successfully!', 'success')
      
      // Redirect to product list or view the new product
      setTimeout(() => {
        navigate(`/admin/products/${productData.id}`)
      }, 1500)

    } catch (error) {
      console.error('Error adding product:', error)
      showNotification('Failed to add product', 'error')
      setLoading(false)
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

  const handleReset = () => {
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
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          to="/admin/products"
          className="inline-flex items-center text-gray-400 hover:text-white mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-white">Add New Product</h1>
        <p className="text-gray-400">Create a new football jersey product</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-6">
            <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
            <div className="w-48 h-48 bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-700">
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
              placeholder="e.g., Manchester United Home Jersey 2025"
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
              step="1"
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
              placeholder="3999"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Original Price (₹)</label>
            <input
              type="number"
              value={formData.originalPrice}
              onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
              min="0"
              step="1"
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
              placeholder="4999"
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
              step="1"
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
              placeholder="20"
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
              placeholder="e.g., Manchester United"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">League</label>
            <input
              type="text"
              value={formData.league}
              onChange={(e) => setFormData({ ...formData, league: e.target.value })}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
              placeholder="e.g., Premier League"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Image URL *</label>
            <input
              type="text"
              value={formData.image}
              onChange={handleImageChange}
              required
              placeholder="Enter image URL or local path"
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
            />
            <p className="text-gray-500 text-xs mt-1">
              Example: https://example.com/image.jpg or /images/products/manutd.jpg
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
                className={`px-3 py-1 rounded-lg transition-colors ${
                  formData.sizes.includes(size)
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
            rows="6"
            className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
            placeholder="Describe the product features, material, design, etc..."
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
              onClick={handleReset}
              className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProduct