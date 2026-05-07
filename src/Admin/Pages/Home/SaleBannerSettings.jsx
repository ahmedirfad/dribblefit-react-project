import React, { useState, useEffect } from 'react'
import api from '../../../Api/Axios'

function SaleBannerSettings() {
  const [settings, setSettings] = useState({
    is_active: true,
    end_date: '2026-07-11T23:59',
    coupon_code: 'WORLDCUP2026',
    message: 'WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026'
  })
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // ✅ Load from BACKEND API
  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/sale-banner')
      
      if (response.data.success && response.data.section) {
        setSettings({
          is_active: response.data.section.is_active,
          end_date: response.data.section.end_date || '2026-07-11T23:59',
          coupon_code: response.data.section.coupon_code || 'WORLDCUP2026',
          message: response.data.section.message || 'WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026'
        })
      }
    } catch (error) {
      console.error('Error fetching sale banner:', error)
    } finally {
      setLoading(false)
    }
  }

  // ✅ Save to BACKEND API
  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await api.put('/admin/home/sections/sale-banner', settings)
      
      if (response.data.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('Save error:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setSettings({
      is_active: true,
      end_date: '2026-07-11T23:59',
      coupon_code: 'WORLDCUP2026',
      message: 'WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026'
    })
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex justify-center items-center h-64">
        <div className="text-[#00ff00] text-lg">Loading settings...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sale Banner Settings</h1>
        <p className="text-gray-400">Manage your promotional sale banner and countdown timer</p>
      </div>

      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 p-4">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-2">Live Preview</p>
            <div className="bg-[#0a0a0a] border border-[#00ff00]/20 rounded-lg p-3">
              <div className="text-[#00ff00] font-mono text-sm mb-1">
                {settings.coupon_code && `CODE: ${settings.coupon_code}`}
              </div>
              <div className="text-gray-300 text-xs">{settings.message}</div>
              {settings.end_date && (
                <div className="text-gray-500 text-xs mt-2">
                  Ends: {new Date(settings.end_date).toLocaleDateString()} at {new Date(settings.end_date).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10">
            <div>
              <h3 className="text-white font-medium">Enable Sale Banner</h3>
              <p className="text-gray-400 text-sm">Show or hide the sale banner on homepage</p>
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

          <div className="space-y-2">
            <label className="block text-white font-medium">Sale End Date & Time</label>
            <input
              type="datetime-local"
              value={settings.end_date}
              onChange={(e) => setSettings({ ...settings, end_date: e.target.value })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white font-medium">Coupon Code</label>
            <input
              type="text"
              value={settings.coupon_code}
              onChange={(e) => setSettings({ ...settings, coupon_code: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors uppercase"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-white font-medium">Sale Message</label>
            <textarea
              value={settings.message}
              onChange={(e) => setSettings({ ...settings, message: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors resize-none"
            />
          </div>
        </div>

        <div className="border-t border-[#00ff00]/20 p-6 bg-[#1a1a1a] flex items-center justify-between">
          <button onClick={handleReset} className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00ff00]/80 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="fixed bottom-4 right-4 bg-[#00ff00] text-black px-6 py-3 rounded-lg font-semibold shadow-lg animate-pulse">
          ✓ Settings saved successfully!
        </div>
      )}
    </div>
  )
}

export default SaleBannerSettings