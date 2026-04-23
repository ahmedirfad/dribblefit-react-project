import React, { useState, useEffect } from 'react'

function SaleBanner() {
  const [settings, setSettings] = useState({
    is_active: true,
    end_date: '2026-07-11T23:59:59',
    coupon_code: 'WORLDCUP2026',
    message: 'WORLD CUP SEASON SALE • UP TO 40% OFF • ENDS JULY 11TH, 2026'
  })
  const [timeLeft, setTimeLeft] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('saleBannerSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
    setIsLoading(false)
  }, [])

  function calculateTimeLeft() {
    if (!settings?.end_date) return null
    
    const now = new Date().getTime()
    const saleEndDate = new Date(settings.end_date).getTime()
    const difference = saleEndDate - now

    if (difference < 0) return null

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  }

  useEffect(() => {
    if (!settings?.is_active || !settings?.end_date) return

    const updateTimer = () => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
    }

    // Set initial time
    updateTimer()

    const timer = setInterval(updateTimer, 1000)

    return () => clearInterval(timer)
  }, [settings?.is_active, settings?.end_date])

  // Don't show while loading to prevent flash
  if (isLoading) return null
  
  // Don't show if inactive or ended
  if (!settings?.is_active || !timeLeft) return null

  return (
    <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs">
        
        {/* Countdown Timer */}
        <div className="flex items-center gap-4">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="text-[#00ff00] font-bold text-lg">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wide">
                {label.charAt(0)}
              </div>
            </div>
          ))}
        </div>

        {/* Sale Message */}
        <div className="text-gray-300 text-center">
          <span className="font-medium">{settings.message}</span>
          {settings.coupon_code && (
            <div className="text-[#00ff00] text-xs mt-1">
              USE CODE: <span className="font-bold">{settings.coupon_code}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default SaleBanner