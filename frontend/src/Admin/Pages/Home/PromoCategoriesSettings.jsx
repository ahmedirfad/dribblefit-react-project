import React, { useState, useEffect } from 'react'
import api from '../../../Api/Axios'

function PromoCategoriesSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    section_title: 'EXPLORE',
    highlighted_text: 'COLLECTIONS',
    section_subtitle: 'Discover our curated collections for every football enthusiast',
    categories: []
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
      const response = await api.get('/admin/home/sections/promo')
      
      if (response.data.success && response.data.section) {
        const data = response.data.section
        // Ensure categories have proper structure
        if (data.categories) {
          const convertedCategories = data.categories.map(cat => {
            // Ensure images array has exactly 3 items
            if (!cat.images || !Array.isArray(cat.images)) {
              return { ...cat, images: ["", "", ""] }
            }
            while (cat.images.length < 3) {
              cat.images.push("")
            }
            return cat
          })
          data.categories = convertedCategories
        }
        setSettings(data)
      }
    } catch (error) {
      console.error('Error fetching promo categories:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Save to BACKEND API
  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await api.put('/admin/home/sections/promo', settings)
      
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
      section_title: 'EXPLORE',
      highlighted_text: 'COLLECTIONS',
      section_subtitle: 'Discover our curated collections for every football enthusiast',
      categories: []
    }
    setSettings(defaultSettings)
  }

  // Add new category
  const addCategory = () => {
    const newCategory = {
      id: Date.now(),
      name: "NEW CATEGORY",
      images: ["", "", ""],
      route: "/products?category=new-category"
    }
    setSettings({
      ...settings,
      categories: [...settings.categories, newCategory]
    })
  }

  // Remove category
  const removeCategory = (index) => {
    const newCategories = settings.categories.filter((_, i) => i !== index)
    setSettings({ ...settings, categories: newCategories })
  }

  // Update category
  const updateCategory = (index, field, value) => {
    const newCategories = [...settings.categories]
    newCategories[index][field] = value
    setSettings({ ...settings, categories: newCategories })
  }

  // Update category image URL
  const updateImageUrl = (index, imageIndex, value) => {
    const newCategories = [...settings.categories]
    if (!newCategories[index].images) {
      newCategories[index].images = ["", "", ""]
    }
    newCategories[index].images[imageIndex] = value
    setSettings({ ...settings, categories: newCategories })
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
        <h1 className="text-2xl font-bold text-white mb-1">Promo Categories Settings</h1>
        <p className="text-gray-400 text-sm">Manage your promotional category cards (3 images per category for hover effect)</p>
      </div>

      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        
        <div className="p-5 border-b border-[#00ff00]/20">
          <h2 className="text-lg font-bold text-white mb-3">Section Settings</h2>
          
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10 mb-4">
            <div>
              <h3 className="text-white font-medium text-sm">Enable Promo Categories Section</h3>
              <p className="text-gray-400 text-xs">Show or hide promo categories on homepage</p>
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
                placeholder="EXPLORE"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Highlighted Text</label>
              <input
                type="text"
                value={settings.highlighted_text}
                onChange={(e) => setSettings({ ...settings, highlighted_text: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-[#00ff00] focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="COLLECTIONS"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Section Subtitle</label>
            <input
              type="text"
              value={settings.section_subtitle}
              onChange={(e) => setSettings({ ...settings, section_subtitle: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
              placeholder="Discover our curated collections for every football enthusiast"
            />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Categories Management</h2>
            <button
              onClick={addCategory}
              className="px-3 py-1.5 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00ff00]/80 transition text-xs"
            >
              + Add Category
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {settings.categories && settings.categories.map((category, index) => {
              const images = category.images && Array.isArray(category.images) ? category.images : ["", "", ""]
              
              return (
                <div key={category.id || index} className="bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg p-3 hover:border-[#00ff00]/40 transition-all">
                  
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#00ff00]/10">
                    <h3 className="text-white font-semibold text-sm">Category {index + 1}</h3>
                    <button
                      onClick={() => removeCategory(index)}
                      className="text-red-500 hover:text-red-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-gray-400 text-xs mb-0.5">Category Name</label>
                      <input
                        type="text"
                        value={category.name || ""}
                        onChange={(e) => updateCategory(index, 'name', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs uppercase"
                        placeholder="RETRO JERSEYS"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-xs mb-0.5">Route Link</label>
                      <input
                        type="text"
                        value={category.route || ""}
                        onChange={(e) => updateCategory(index, 'route', e.target.value)}
                        className="w-full px-2 py-1.5 bg-[#0a0a0a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                        placeholder="/products?category=retro-jerseys"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-xs mb-1">Images (3 for hover effect)</label>
                      <div className="space-y-2">
                        {[0, 1, 2].map((imgIndex) => (
                          <div key={imgIndex} className="border border-[#00ff00]/20 rounded-lg p-2 bg-[#0a0a0a]">
                            <div className="flex items-center gap-2">
                              <span className="text-[#00ff00] text-xs font-bold w-6">#{imgIndex + 1}</span>
                              <input
                                type="text"
                                value={images[imgIndex] || ""}
                                onChange={(e) => updateImageUrl(index, imgIndex, e.target.value)}
                                className="flex-1 px-2 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded text-white focus:outline-none focus:border-[#00ff00] text-xs"
                                placeholder="Image URL"
                              />
                            </div>
                            {images[imgIndex] && images[imgIndex].trim() !== "" && (
                              <div className="mt-1">
                                <img 
                                  src={images[imgIndex]} 
                                  alt={`Preview ${imgIndex + 1}`}
                                  className="h-12 w-full object-cover rounded mt-1"
                                  onError={(e) => e.target.style.display = 'none'}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className="text-gray-500 text-xs mt-1">Images will cycle on hover (Image 1 → 2 → 3)</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {(!settings.categories || settings.categories.length === 0) && (
            <div className="text-center py-6 text-gray-400 text-sm">
              No categories added. Click "Add Category" to get started.
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
          ✓ Promo categories settings saved!
        </div>
      )}
    </div>
  )
}

export default PromoCategoriesSettings