import React, { useState, useEffect } from 'react'
import api from '../../../Api/Axios'

function BestSellersSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    section_title: 'BEST',
    highlighted_text: 'SELLERS',
    section_subtitle: 'Discover our most popular football jerseys loved by fans worldwide',
    view_all_button_text: 'VIEW ALL PRODUCTS',
    view_all_button_link: '/products',
    products: []
  })
  
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // ✅ Load settings from BACKEND API
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/bestsellers')
      
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
      }
    } catch (error) {
      console.error('Error fetching best sellers:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Save to BACKEND API
  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await api.put('/admin/home/sections/bestsellers', settings)
      
      if (response.data.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
        showToast('Settings saved successfully!', 'success')
      }
    } catch (error) {
      console.error('Save error:', error)
      showToast('Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  // Reset to default
  const handleReset = () => {
    const defaultSettings = {
      is_active: true,
      section_title: 'BEST',
      highlighted_text: 'SELLERS',
      section_subtitle: 'Discover our most popular football jerseys loved by fans worldwide',
      view_all_button_text: 'VIEW ALL PRODUCTS',
      view_all_button_link: '/products',
      products: []
    }
    setSettings(defaultSettings)
  }

  // Add new product
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "New Product",
      price: "₹999",
      images: ["", "", ""],
      team: "Team Name",
      inStock: true,
      sizes: ['M', 'L']
    }
    setSettings({
      ...settings,
      products: [...settings.products, newProduct]
    })
  }

  // Remove product
  const removeProduct = (index) => {
    const newProducts = settings.products.filter((_, i) => i !== index)
    setSettings({ ...settings, products: newProducts })
  }

  // Update product field
  const updateProduct = (index, field, value) => {
    const newProducts = [...settings.products]
    newProducts[index][field] = value
    setSettings({ ...settings, products: newProducts })
  }

  // Update product image
  const updateProductImage = (index, imageIndex, value) => {
    const newProducts = [...settings.products]
    if (!newProducts[index].images) newProducts[index].images = ["", "", ""]
    newProducts[index].images[imageIndex] = value
    setSettings({ ...settings, products: newProducts })
  }

  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-semibold shadow-lg animate-pulse ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 'bg-red-500 text-white'
    }`
    toast.textContent = message
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
        <div className="text-[#00ff00] text-lg">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Best Sellers Settings</h1>
        <p className="text-gray-400 text-sm">Manage your best selling products section</p>
      </div>

      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        
        <div className="p-5 border-b border-[#00ff00]/20">
          <h2 className="text-lg font-bold text-white mb-3">Section Settings</h2>
          
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10 mb-4">
            <div>
              <h3 className="text-white font-medium text-sm">Enable Best Sellers Section</h3>
              <p className="text-gray-400 text-xs">Show or hide best sellers on homepage</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, is_active: !settings.is_active })}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
                settings.is_active ? 'bg-[#00ff00]' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${settings.is_active ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Section Title</label>
              <input
                type="text"
                value={settings.section_title}
                onChange={(e) => setSettings({ ...settings, section_title: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="BEST"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Highlighted Text</label>
              <input
                type="text"
                value={settings.highlighted_text}
                onChange={(e) => setSettings({ ...settings, highlighted_text: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-[#00ff00] focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="SELLERS"
              />
            </div>
          </div>

          <div className="space-y-1 mb-3">
            <label className="block text-gray-300 text-xs font-medium">Section Subtitle</label>
            <textarea
              value={settings.section_subtitle}
              onChange={(e) => setSettings({ ...settings, section_subtitle: e.target.value })}
              rows="1"
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm resize-none"
              placeholder="Discover our most popular football jerseys..."
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">View All Button Text</label>
              <input
                type="text"
                value={settings.view_all_button_text}
                onChange={(e) => setSettings({ ...settings, view_all_button_text: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="VIEW ALL PRODUCTS"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">View All Button Link</label>
              <input
                type="text"
                value={settings.view_all_button_link}
                onChange={(e) => setSettings({ ...settings, view_all_button_link: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="/products"
              />
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-white">Products Management</h2>
            <button
              onClick={addProduct}
              className="px-3 py-1.5 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00ff00]/80 transition text-xs"
            >
              + Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.products.map((product, index) => (
              <div key={product.id} className="bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg p-3 hover:border-[#00ff00]/40 transition-all">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#00ff00]/10">
                  <h3 className="text-white font-semibold text-sm">Product {index + 1}</h3>
                  <button
                    onClick={() => removeProduct(index)}
                    className="text-red-500 hover:text-red-400 text-xs"
                  >
                    Remove
                  </button>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-400 text-xs mb-0.5">Product Name</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(index, 'name', e.target.value)}
                      className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-0.5">Team</label>
                    <input
                      type="text"
                      value={product.team}
                      onChange={(e) => updateProduct(index, 'team', e.target.value)}
                      className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-gray-400 text-xs mb-0.5">Price</label>
                      <input
                        type="text"
                        value={product.price}
                        onChange={(e) => updateProduct(index, 'price', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                        placeholder="₹899"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-xs mb-0.5">In Stock</label>
                      <select
                        value={product.inStock}
                        onChange={(e) => updateProduct(index, 'inStock', e.target.value === 'true')}
                        className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-xs mb-0.5">Images (3 URLs)</label>
                    <div className="space-y-1">
                      {[0, 1, 2].map((imgIndex) => (
                        <input
                          key={imgIndex}
                          type="text"
                          value={product.images?.[imgIndex] || ""}
                          onChange={(e) => updateProductImage(index, imgIndex, e.target.value)}
                          placeholder={`Image ${imgIndex + 1} URL`}
                          className="w-full px-2 py-1 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="block text-gray-500 text-xs">ID: {product.id}</label>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {settings.products.length === 0 && (
            <div className="text-center py-6 text-gray-400 text-sm">
              No products added. Click "Add New Product" to get started.
            </div>
          )}
        </div>

        <div className="border-t border-[#00ff00]/20 p-4 bg-[#1a1a1a] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-gray-400 hover:text-white transition-colors text-sm"
          >
            Reset to Default
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-1.5 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00ff00]/80 transition-all text-sm disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-4 right-4 bg-[#00ff00] text-black px-5 py-2.5 rounded-lg font-semibold shadow-lg animate-pulse text-sm">
          ✓ Best sellers settings saved!
        </div>
      )}
    </div>
  )
}

export default BestSellersSettings