import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'
import { useNavigate, useParams, Link } from 'react-router-dom'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [product, setProduct] = useState(null)
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

  useEffect(() => {
    fetchProduct()
  }, [id])

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

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/products/${id}`)
      const productData = response.data || response
      
      setProduct(productData)
      
      // Parse price values (remove ₹ and commas)
      const price = productData.price ? productData.price.replace('₹', '').replace(/,/g, '') : ''
      const originalPrice = productData.originalPrice ? 
        productData.originalPrice.replace('₹', '').replace(/,/g, '') : ''
      const discount = productData.discount ? 
        productData.discount.replace('% OFF', '') : ''

      setFormData({
        name: productData.name || '',
        price: price,
        originalPrice: originalPrice,
        discount: discount,
        image: productData.image || '',
        category: productData.category || '2025-26-season-kits',
        team: productData.team || '',
        league: productData.league || '',
        description: productData.description || '',
        sizes: productData.sizes || ['S', 'M', 'L', 'XL'],
        inStock: productData.inStock !== undefined ? productData.inStock : true,
        featured: productData.featured || false
      })

    } catch (error) {
      console.error('Error fetching product:', error)
      showNotification('Failed to load product', 'error')
      navigate('/admin/products')
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const value = e.target.value
    const normalizedValue = value.replace(/\\/g, '/')
    setFormData({ ...formData, image: normalizedValue })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    // Validation
    if (!formData.name.trim()) {
      alert('Product name is required')
      setSaving(false)
      return
    }

    if (!formData.price) {
      alert('Price is required')
      setSaving(false)
      return
    }

    if (!formData.image.trim()) {
      alert('Image URL is required')
      setSaving(false)
      return
    }

    try {
      const productData = {
        ...formData,
        price: `₹${parseInt(formData.price || 0).toLocaleString('en-IN')}`,
        originalPrice: formData.originalPrice ? `₹${parseInt(formData.originalPrice).toLocaleString('en-IN')}` : undefined,
        discount: formData.discount ? `${formData.discount}% OFF` : undefined
      }

      await api.patch(`/products/${id}`, productData)
      
      showNotification('Product updated successfully!', 'success')
      
      // Redirect to product detail page
      setTimeout(() => {
        navigate(`/admin/products/${id}`)
      }, 1500)

    } catch (error) {
      console.error('Error updating product:', error)
      showNotification('Failed to update product', 'error')
      setSaving(false)
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

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <Link
          to={`/admin/products/${id}`}
          className="inline-flex items-center text-gray-400 hover:text-white mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Product
        </Link>
        <h1 className="text-2xl font-bold text-white">Edit Product</h1>
        <p className="text-gray-400">Update product details</p>
        <div className="mt-2 text-sm text-gray-500">
          Product ID: <span className="font-mono text-white">{id}</span>
        </div>
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
              placeholder="Enter image URL or local path"
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
            />
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
              onClick={() => navigate(`/admin/products/${id}`)}
              className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Update Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditProduct