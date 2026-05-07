import React, { useState, useEffect, useRef } from 'react'
import api from '../../../Api/Axios'  // Add this import

function PassionSectionSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    image: '',
    title_line1: 'WEAR YOUR',
    highlighted_text1: 'PASSION.',
    title_line2: 'OWN THE',
    highlighted_text2: 'GAME.',
    subtitle: 'Shop by teams that rule the game.',
    button_text: 'EXPLORE ALL',
    button_link: '/products'
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
      const response = await api.get('/admin/home/sections/passion')
      
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
        if (response.data.section.image) setPreviewImage(response.data.section.image)
      }
    } catch (error) {
      console.error('Error fetching passion section:', error)
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
      const response = await api.put('/admin/home/sections/passion', settings)
      
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
      title_line1: 'WEAR YOUR',
      highlighted_text1: 'PASSION.',
      title_line2: 'OWN THE',
      highlighted_text2: 'GAME.',
      subtitle: 'Shop by teams that rule the game.',
      button_text: 'EXPLORE ALL',
      button_link: '/products'
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Passion Section Settings</h1>
        <p className="text-gray-400 text-sm">Manage your passion/motivational section</p>
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        
        {/* Live Preview */}
        <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 p-4">
          <div className="text-center mb-2">
            <p className="text-gray-400 text-xs">Live Preview</p>
          </div>
          <div className="relative bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#00ff00]/20 h-[350px]">
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/75"></div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
              <h1 className="text-3xl font-bold text-white mb-3">
                {settings.title_line1 || 'WEAR YOUR'}
                <span className="text-[#00ff00] block text-4xl">{settings.highlighted_text1 || 'PASSION.'}</span>
              </h1>
              <h1 className="text-3xl font-bold text-white mb-4">
                {settings.title_line2 || 'OWN THE'}
                <span className="text-[#00ff00] block text-4xl">{settings.highlighted_text2 || 'GAME.'}</span>
              </h1>
              <p className="text-gray-300 text-sm mb-6 max-w-md">
                {settings.subtitle || 'Shop by teams that rule the game.'}
              </p>
              <button className="border-2 border-[#00ff00] text-[#00ff00] px-6 py-2 rounded-lg text-xs uppercase tracking-wider hover:bg-[#00ff00] hover:text-black transition">
                {settings.button_text || 'EXPLORE ALL'}
              </button>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="p-5 space-y-4">
          
          {/* Active Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10">
            <div>
              <h3 className="text-white font-medium text-sm">Enable Passion Section</h3>
              <p className="text-gray-400 text-xs">Show or hide passion section on homepage</p>
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

          {/* Image Upload */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Background Image</label>
            <div className="border-2 border-dashed border-[#00ff00]/30 rounded-lg p-4 text-center hover:border-[#00ff00] transition-colors">
              {previewImage ? (
                <div className="space-y-2">
                  <img src={previewImage} alt="Passion" className="max-h-32 mx-auto rounded object-cover" />
                  <button
                    onClick={removeImage}
                    className="text-red-500 text-xs hover:text-red-400"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-3xl mb-1">🔥</div>
                  <p className="text-gray-400 text-xs mb-1">Click to upload background image</p>
                  <p className="text-gray-500 text-xs">Recommended: 1920x1080px</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="passion-image-upload"
              />
              {!previewImage && (
                <button
                  onClick={() => document.getElementById('passion-image-upload').click()}
                  className="mt-2 px-3 py-1 bg-[#00ff00]/10 text-[#00ff00] rounded-lg text-xs hover:bg-[#00ff00]/20 transition"
                >
                  Choose Image
                </button>
              )}
            </div>
          </div>

          {/* Title Line 1 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Title Line 1</label>
              <input
                type="text"
                value={settings.title_line1}
                onChange={(e) => setSettings({ ...settings, title_line1: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="WEAR YOUR"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Highlighted Text 1</label>
              <input
                type="text"
                value={settings.highlighted_text1}
                onChange={(e) => setSettings({ ...settings, highlighted_text1: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-[#00ff00] focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="PASSION."
              />
            </div>
          </div>

          {/* Title Line 2 */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Title Line 2</label>
              <input
                type="text"
                value={settings.title_line2}
                onChange={(e) => setSettings({ ...settings, title_line2: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="OWN THE"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Highlighted Text 2</label>
              <input
                type="text"
                value={settings.highlighted_text2}
                onChange={(e) => setSettings({ ...settings, highlighted_text2: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-[#00ff00] focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="GAME."
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Subtitle</label>
            <input
              type="text"
              value={settings.subtitle}
              onChange={(e) => setSettings({ ...settings, subtitle: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
              placeholder="Shop by teams that rule the game."
            />
          </div>

          {/* Button Settings */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Button Text</label>
              <input
                type="text"
                value={settings.button_text}
                onChange={(e) => setSettings({ ...settings, button_text: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="EXPLORE ALL"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Button Link</label>
              <input
                type="text"
                value={settings.button_link}
                onChange={(e) => setSettings({ ...settings, button_link: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="/products"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
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

      {/* Success Message */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-[#00ff00] text-black px-5 py-2.5 rounded-lg font-semibold shadow-lg animate-pulse text-sm">
          ✓ Passion section settings saved!
        </div>
      )}
    </div>
  )
}

export default PassionSectionSettings