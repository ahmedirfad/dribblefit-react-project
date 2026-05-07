import React, { useState, useEffect, useRef } from 'react'
import api from '../../../Api/Axios'

function InternationalKitsSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    image: '',
    title: 'INTERNATIONAL',
    highlighted_text: 'KITS',
    subtitle: 'STARTING AT',
    currency: '₹',
    price: '799',
    button_text: 'Shop Now',
    button_link: '/products?category=international-kits'
  })
  
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const fileInputRef = useRef(null)

  // ✅ Load settings from BACKEND API
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/kits')
      
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
        if (response.data.section.image) setPreviewImage(response.data.section.image)
      }
    } catch (error) {
      console.error('Error fetching kits section:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle image upload to Cloudinary via backend
  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      if (response.data.success) {
        const imageUrl = response.data.imageUrl
        setPreviewImage(imageUrl)
        setSettings({ ...settings, image: imageUrl })
        showToast('Image uploaded successfully!', 'success')
      }
    } catch (error) {
      console.error('Upload error:', error)
      showToast('Failed to upload image', 'error')
    }
  }

  // Remove image
  const removeImage = () => {
    setPreviewImage(null)
    setSettings({ ...settings, image: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // ✅ Save to BACKEND API
  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await api.put('/admin/home/sections/kits', settings)
      
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
      image: '',
      title: 'INTERNATIONAL',
      highlighted_text: 'KITS',
      subtitle: 'STARTING AT',
      currency: '₹',
      price: '799',
      button_text: 'Shop Now',
      button_link: '/products?category=international-kits'
    }
    setSettings(defaultSettings)
    setPreviewImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
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
      <div className="max-w-4xl mx-auto flex justify-center items-center h-64">
        <div className="text-[#00ff00] text-lg">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">International Kits Settings</h1>
        <p className="text-gray-400">Manage your international kits promotional section</p>
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        
        {/* Live Preview */}
        <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 p-4">
          <div className="text-center mb-3">
            <p className="text-gray-400 text-sm">Live Preview</p>
          </div>
          <div className="relative bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#00ff00]/20 h-[400px]">
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
              <h2 className="text-4xl font-bold text-white">
                {settings.title || 'INTERNATIONAL'}
                <span className="text-[#00ff00] block">{settings.highlighted_text || 'KITS'}</span>
              </h2>
              
              <p className="text-gray-200 text-xl mt-4 uppercase tracking-widest">
                {settings.subtitle || 'STARTING AT'}
              </p>
              
              <div className="flex items-baseline justify-center gap-1 mt-2">
                <span className="text-2xl text-gray-200">{settings.currency || '₹'}</span>
                <span className="text-6xl font-bold text-white">{settings.price || '799'}</span>
              </div>

              <div className="mt-6">
                <button className="bg-[#00ff00] text-black font-bold px-8 py-3 rounded-lg hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] transition-all text-sm uppercase tracking-widest">
                  {settings.button_text || 'Shop Now'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="p-6 space-y-6">
          
          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10">
            <div>
              <h3 className="text-white font-medium">Enable Section</h3>
              <p className="text-gray-400 text-sm">Show or hide international kits section on homepage</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, is_active: !settings.is_active })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.is_active ? 'bg-[#00ff00]' : 'bg-gray-600'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.is_active ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Background Image</label>
            <div className="border-2 border-dashed border-[#00ff00]/30 rounded-lg p-6 text-center hover:border-[#00ff00] transition-colors">
              {previewImage ? (
                <div className="space-y-3">
                  <img src={previewImage} alt="Kit" className="max-h-40 mx-auto rounded object-cover" />
                  <button
                    onClick={removeImage}
                    className="text-red-500 text-sm hover:text-red-400"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-gray-400 mb-2">Click to upload background image</p>
                  <p className="text-gray-500 text-xs">Recommended: 1920x1080px (16:9 ratio)</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="kits-image-upload"
              />
              {!previewImage && (
                <button
                  onClick={() => document.getElementById('kits-image-upload').click()}
                  className="mt-3 px-4 py-2 bg-[#00ff00]/10 text-[#00ff00] rounded-lg text-sm hover:bg-[#00ff00]/20 transition"
                >
                  Choose Image
                </button>
              )}
            </div>
          </div>

          {/* Title Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-white font-medium">Title</label>
              <input
                type="text"
                value={settings.title}
                onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                placeholder="INTERNATIONAL"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-white font-medium">Highlighted Text (Green)</label>
              <input
                type="text"
                value={settings.highlighted_text}
                onChange={(e) => setSettings({ ...settings, highlighted_text: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-[#00ff00] focus:outline-none focus:border-[#00ff00]"
                placeholder="KITS"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Subtitle</label>
            <input
              type="text"
              value={settings.subtitle}
              onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
              placeholder="STARTING AT"
            />
          </div>

          {/* Price Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-white font-medium">Currency Symbol</label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                placeholder="₹"
                maxLength="3"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-white font-medium">Price</label>
              <input
                type="text"
                value={settings.price}
                onChange={(e) => setSettings({ ...settings, price: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                placeholder="799"
              />
            </div>
          </div>

          {/* Button Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-white font-medium">Button Text</label>
              <input
                type="text"
                value={settings.button_text}
                onChange={(e) => setSettings({ ...settings, button_text: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                placeholder="Shop Now"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-white font-medium">Button Link</label>
              <input
                type="text"
                value={settings.button_link}
                onChange={(e) => setSettings({ ...settings, button_link: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                placeholder="/products?category=international-kits"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-[#00ff00]/20 p-6 bg-[#1a1a1a] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Reset to Default
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00ff00]/80 transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-[#00ff00] text-black px-6 py-3 rounded-lg font-semibold shadow-lg animate-pulse">
          ✓ International kits settings saved!
        </div>
      )}
    </div>
  )
}

export default InternationalKitsSettings