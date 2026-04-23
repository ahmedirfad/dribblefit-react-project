import React, { useState, useEffect } from 'react'
import api from '../../../Api/Axios'

function MexicoDeOroSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    title: 'MEXICO DE ORO',
    subtitle_line1: 'A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE,',
    subtitle_line2: 'MADE WITH RECYCLED MATERIALS.',
    button_text: 'SHOP NOW',
    button_link: '/product/5',
    video_url: '/images/Mexico-de-oroo.mp4',
    poster_image: '',
    overlay_opacity: 40
  })
  
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewPoster, setPreviewPoster] = useState(null)

  // Load settings from BACKEND API
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/video')
      
      if (response.data.success && response.data.section) {
        let sectionData = response.data.section
        
        // Fix any backslashes in video_url
        if (sectionData.video_url && sectionData.video_url.includes('\\')) {
          sectionData.video_url = sectionData.video_url.replace(/\\/g, '/')
        }
        
        setSettings(sectionData)
        if (sectionData.poster_image) setPreviewPoster(sectionData.poster_image)
      }
    } catch (error) {
      console.error('Error fetching video section:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle poster image upload to Cloudinary via backend
  const handlePosterUpload = async (e) => {
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
        setPreviewPoster(imageUrl)
        setSettings({ ...settings, poster_image: imageUrl })
        showToast('Poster image uploaded successfully!', 'success')
      }
    } catch (error) {
      console.error('Upload error:', error)
      showToast('Failed to upload image', 'error')
    }
  }

  // Remove poster
  const removePoster = () => {
    setPreviewPoster(null)
    setSettings({ ...settings, poster_image: '' })
  }

  // Save to BACKEND API with path fix
  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Fix the video_url path before saving (convert backslashes to forward slashes)
      const fixedSettings = {
        ...settings,
        video_url: settings.video_url ? settings.video_url.replace(/\\/g, '/') : ''
      }
      
      const response = await api.put('/admin/home/sections/video', fixedSettings)
      
      if (response.data.success) {
        setSettings(fixedSettings)
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
      title: 'MEXICO DE ORO',
      subtitle_line1: 'A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE,',
      subtitle_line2: 'MADE WITH RECYCLED MATERIALS.',
      button_text: 'SHOP NOW',
      button_link: '/product/5',
      video_url: '/images/Mexico-de-oroo.mp4',
      poster_image: '',
      overlay_opacity: 40
    }
    setSettings(defaultSettings)
    setPreviewPoster(null)
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
        <h1 className="text-2xl font-bold text-white mb-1">Mexico De Oro Settings</h1>
        <p className="text-gray-400 text-sm">Manage your video promotion section</p>
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        
        {/* Settings Form */}
        <div className="p-5 space-y-4">
          
          {/* Active Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10">
            <div>
              <h3 className="text-white font-medium text-sm">Enable Mexico De Oro Section</h3>
              <p className="text-gray-400 text-xs">Show or hide video section on homepage</p>
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

          {/* Title */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Title</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({ ...settings, title: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm uppercase"
              placeholder="MEXICO DE ORO"
            />
          </div>

          {/* Subtitle Line 1 */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Subtitle Line 1</label>
            <input
              type="text"
              value={settings.subtitle_line1}
              onChange={(e) => setSettings({ ...settings, subtitle_line1: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
              placeholder="A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE,"
            />
          </div>

          {/* Subtitle Line 2 */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Subtitle Line 2</label>
            <input
              type="text"
              value={settings.subtitle_line2}
              onChange={(e) => setSettings({ ...settings, subtitle_line2: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
              placeholder="MADE WITH RECYCLED MATERIALS."
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
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm uppercase"
                placeholder="SHOP NOW"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-gray-300 text-xs font-medium">Button Link</label>
              <input
                type="text"
                value={settings.button_link}
                onChange={(e) => setSettings({ ...settings, button_link: e.target.value })}
                className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
                placeholder="/product/5"
              />
            </div>
          </div>

          {/* Video URL */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Video URL</label>
            <input
              type="text"
              value={settings.video_url}
              onChange={(e) => setSettings({ ...settings, video_url: e.target.value })}
              className="w-full px-3 py-1.5 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] text-sm"
              placeholder="/images/your-video.mp4"
            />
            <p className="text-gray-500 text-xs">Enter local path: /images/your-video.mp4 (use forward slashes /)</p>
          </div>

          {/* Poster Image Upload */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">Poster Image (shown before video loads)</label>
            <div className="border-2 border-dashed border-[#00ff00]/30 rounded-lg p-3 text-center hover:border-[#00ff00] transition-colors">
              {previewPoster ? (
                <div className="space-y-2">
                  <img src={previewPoster} alt="Poster" className="h-24 mx-auto rounded object-cover" />
                  <button
                    onClick={removePoster}
                    className="text-red-500 text-xs hover:text-red-400"
                  >
                    Remove Poster
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-0">🖼️</div>
                  <p className="text-gray-400 text-xs">Click to upload poster image</p>
                  <p className="text-gray-500 text-xs">Recommended: 1920x1080px</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
                className="hidden"
                id="poster-upload"
              />
              {!previewPoster && (
                <button
                  onClick={() => document.getElementById('poster-upload').click()}
                  className="mt-2 px-3 py-1 bg-[#00ff00]/10 text-[#00ff00] rounded-lg text-xs hover:bg-[#00ff00]/20 transition"
                >
                  Choose Image
                </button>
              )}
            </div>
          </div>

          {/* Overlay Opacity */}
          <div className="space-y-1">
            <label className="block text-gray-300 text-xs font-medium">
              Overlay Opacity: {settings.overlay_opacity}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.overlay_opacity}
              onChange={(e) => setSettings({ ...settings, overlay_opacity: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              style={{ accentColor: '#00ff00' }}
            />
            <p className="text-gray-500 text-xs">Darkens the background video/image</p>
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
          ✓ Mexico De Oro settings saved!
        </div>
      )}
    </div>
  )
}

export default MexicoDeOroSettings