import React, { useState, useEffect } from 'react'

function SaleBannerSettings() {
  const [isActive, setIsActive] = useState(true)
  const [endDate, setEndDate] = useState('2026-07-11T23:59')
  const [couponCode, setCouponCode] = useState('WORLDCUP2026')
  const [message, setMessage] = useState('WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem('saleBannerSettings')
    if (savedSettings) {
      const data = JSON.parse(savedSettings)
      setIsActive(data.is_active ?? true)
      setEndDate(data.end_date?.slice(0, 16) || '2026-07-11T23:59')
      setCouponCode(data.coupon_code || 'WORLDCUP2026')
      setMessage(data.message || 'WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026')
    }
  }, [])

  const handleSave = () => {
    const data = {
      is_active: isActive,
      end_date: endDate,
      coupon_code: couponCode,
      message: message
    }
    
    localStorage.setItem('saleBannerSettings', JSON.stringify(data))
    
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Sale Banner Settings</h1>
        <p className="text-gray-400">Manage your promotional sale banner and countdown timer</p>
      </div>

      {/* Main Card */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        {/* Preview Banner */}
        <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 p-4">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-2">Live Preview</p>
            <div className="bg-[#0a0a0a] border border-[#00ff00]/20 rounded-lg p-3">
              <div className="text-[#00ff00] font-mono text-sm mb-1">
                {couponCode && `CODE: ${couponCode}`}
              </div>
              <div className="text-gray-300 text-xs">{message || 'Your sale message here'}</div>
              {endDate && (
                <div className="text-gray-500 text-xs mt-2">
                  Ends: {new Date(endDate).toLocaleDateString()} at {new Date(endDate).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="p-6 space-y-6">
          {/* Active Toggle */}
          <div className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg border border-[#00ff00]/10">
            <div>
              <h3 className="text-white font-medium">Enable Sale Banner</h3>
              <p className="text-gray-400 text-sm">Show or hide the sale banner on homepage</p>
            </div>
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isActive ? 'bg-[#00ff00]' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isActive ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Sale End Date & Time
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors"
            />
            <p className="text-gray-500 text-sm">Timer will countdown to this date</p>
          </div>

          {/* Coupon Code */}
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Coupon Code
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#00ff00] text-sm">#</span>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="w-full pl-8 pr-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors uppercase"
                placeholder="SUMMER2026"
              />
            </div>
          </div>

          {/* Sale Message */}
          <div className="space-y-2">
            <label className="block text-white font-medium">
              Sale Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg text-white focus:outline-none focus:border-[#00ff00] transition-colors resize-none"
              placeholder="WORLD CUP SEASON SALE • UP TO 40% OFF"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-[#00ff00]/20 p-6 bg-[#1a1a1a] flex items-center justify-between">
          <button
            onClick={() => {
              setIsActive(true)
              setEndDate('2026-07-11T23:59')
              setCouponCode('WORLDCUP2026')
              setMessage('WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026')
            }}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Reset to Default
          </button>
          
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#00ff00] text-black font-semibold rounded-lg hover:bg-[#00ff00]/80 transition-all transform hover:scale-105"
          >
            💾 Save Changes
          </button>
        </div>
      </div>

      {/* Success Message */}
      {saved && (
        <div className="fixed bottom-4 right-4 bg-[#00ff00] text-black px-6 py-3 rounded-lg font-semibold shadow-lg animate-pulse">
          ✓ Settings saved successfully!
        </div>
      )}
    </div>
  )
}

export default SaleBannerSettings