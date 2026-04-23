import React, { useState, useEffect, useRef } from 'react';
import { homeApi } from '../../../Api/homeApi';

function HeroBannerSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    image: '',
    heading: 'ELEVATE YOUR',
    highlighted_text: 'GAME STYLE',
    subheading: 'Discover authentic football jerseys from top leagues worldwide. Limited editions, exclusive designs, and unbeatable quality.',
    button_text: 'View Collection',
    button_link: '/products',
    features: ['Authentic Jerseys', 'Worldwide Shipping', 'Limited Editions']
  });
  
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ LOAD from BACKEND API instead of localStorage
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await homeApi.getSection('hero-banner');
      if (response.success && response.section) {
        setSettings(response.section);
        if (response.section.image) setPreviewImage(response.section.image);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload (upload to Cloudinary first)
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show uploading state
    const toast = showToast('Uploading image...', 'info');
    
    try {
      // Upload to Cloudinary (use your existing product upload endpoint)
      const formData = new FormData();
      formData.append('image', file);
      
      const uploadResponse = await api.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (uploadResponse.data.success) {
        const imageUrl = uploadResponse.data.imageUrl || uploadResponse.data.url;
        setPreviewImage(imageUrl);
        setSettings({ ...settings, image: imageUrl });
        showToast('Image uploaded successfully!', 'success');
      }
    } catch (error) {
      console.error('Upload error:', error);
      showToast('Failed to upload image', 'error');
    }
  };

  // Remove image
  const removeImage = () => {
    setPreviewImage(null);
    setSettings({ ...settings, image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ✅ SAVE to BACKEND API instead of localStorage
  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await homeApi.updateSection('hero-banner', settings);
      
      if (response.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        showToast('Settings saved successfully!', 'success');
      }
    } catch (error) {
      console.error('Save error:', error);
      showToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Reset to default
  const handleReset = async () => {
    const defaultSettings = {
      is_active: true,
      image: '',
      heading: 'ELEVATE YOUR',
      highlighted_text: 'GAME STYLE',
      subheading: 'Discover authentic football jerseys from top leagues worldwide. Limited editions, exclusive designs, and unbeatable quality.',
      button_text: 'View Collection',
      button_link: '/products',
      features: ['Authentic Jerseys', 'Worldwide Shipping', 'Limited Editions']
    };
    setSettings(defaultSettings);
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Helper for toast messages
  const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg font-semibold shadow-lg animate-pulse ${
      type === 'success' ? 'bg-[#00ff00] text-black' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-yellow-500 text-black'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Update feature at index
  const updateFeature = (index, value) => {
    const newFeatures = [...settings.features];
    newFeatures[index] = value;
    setSettings({ ...settings, features: newFeatures });
  };

  // Add new feature
  const addFeature = () => {
    setSettings({ ...settings, features: [...settings.features, 'New Feature'] });
  };

  // Remove feature
  const removeFeature = (index) => {
    const newFeatures = settings.features.filter((_, i) => i !== index);
    setSettings({ ...settings, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-[#00ff00] text-lg">Loading settings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Hero Banner Settings</h1>
        <p className="text-gray-400">Manage your main hero banner image and content</p>
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        
        {/* Live Preview */}
        <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 p-4">
          <div className="text-center mb-3">
            <p className="text-gray-400 text-sm">Live Preview</p>
          </div>
          <div className="relative bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#00ff00]/20 min-h-[400px]">
            {previewImage && (
              <img 
                src={previewImage} 
                alt="Preview" 
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            )}
            <div className="relative z-10 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent p-8 min-h-[400px] flex items-center">
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {settings.heading || 'ELEVATE YOUR'}
                  <span className="text-[#00ff00] block">{settings.highlighted_text || 'GAME STYLE'}</span>
                </h2>
                <p className="text-gray-300 text-sm mt-2 max-w-md">
                  {settings.subheading || 'Discover authentic football jerseys...'}
                </p>
                <button className="mt-4 border border-[#00ff00] text-[#00ff00] px-5 py-2 rounded text-sm hover:bg-[#00ff00] hover:text-black transition">
                  {settings.button_text || 'View Collection'}
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
              <h3 className="text-white font-medium">Enable Hero Banner</h3>
              <p className="text-gray-400 text-sm">Show or hide the hero banner on homepage</p>
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
            <label className="block text-white font-medium">Hero Background Image</label>
            <div className="border-2 border-dashed border-[#00ff00]/30 rounded-lg p-6 text-center hover:border-[#00ff00] transition-colors">
              {previewImage ? (
                <div className="space-y-3">
                  <img src={previewImage} alt="Hero" className="max-h-32 mx-auto rounded object-cover" />
                  <button
                    onClick={removeImage}
                    className="text-red-500 text-sm hover:text-red-400"
                  >
                    Remove Image
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-gray-400 mb-2">Click to upload hero background image</p>
                  <p className="text-gray-500 text-xs">Recommended: 1920x1080px (16:9 ratio)</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="hero-image-upload"
              />
              {!previewImage && (
                <button
                  onClick={() => document.getElementById('hero-image-upload').click()}
                  className="mt-3 px-4 py-2 bg-[#00ff00]/10 text-[#00ff00] rounded-lg text-sm hover:bg-[#00ff00]/20 transition"
                >
                  Choose Image
                </button>
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Main Heading</label>
            <input
              type="text"
              value={settings.heading}
              onChange={(e) => setSettings({ ...settings, heading: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
              placeholder="ELEVATE YOUR"
            />
          </div>

          {/* Highlighted Text */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Highlighted Text (Green)</label>
            <input
              type="text"
              value={settings.highlighted_text}
              onChange={(e) => setSettings({ ...settings, highlighted_text: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-[#00ff00] focus:outline-none focus:border-[#00ff00]"
              placeholder="GAME STYLE"
            />
          </div>

          {/* Subheading */}
          <div className="space-y-2">
            <label className="block text-white font-medium">Subheading / Description</label>
            <textarea
              value={settings.subheading}
              onChange={(e) => setSettings({ ...settings, subheading: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] resize-none"
              placeholder="Discover authentic football jerseys..."
            />
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
                placeholder="View Collection"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-white font-medium">Button Link</label>
              <input
                type="text"
                value={settings.button_link}
                onChange={(e) => setSettings({ ...settings, button_link: e.target.value })}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                placeholder="/products"
              />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-white font-medium">Features List</label>
              <button
                onClick={addFeature}
                className="text-[#00ff00] text-sm hover:underline"
              >
                + Add Feature
              </button>
            </div>
            {settings.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  className="flex-1 px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00]"
                  placeholder="Feature name"
                />
                <button
                  onClick={() => removeFeature(index)}
                  className="px-3 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition"
                >
                  ✕
                </button>
              </div>
            ))}
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
          ✓ Hero banner settings saved!
        </div>
      )}
    </div>
  );
}

export default HeroBannerSettings;