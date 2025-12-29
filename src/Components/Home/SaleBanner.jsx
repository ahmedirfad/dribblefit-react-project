import React, { useState, useEffect } from 'react'

function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const now = new Date().getTime()
    const currentYear = new Date().getFullYear()
    
    // New Year sale ends on Jan 2, 00:00:00 of the next year
    const saleEndDate = new Date(`January 2, ${currentYear + 1} 00:00:00`).getTime()
    const difference = saleEndDate - now

    // If New Year sale has passed, return null
    if (difference < 0) {
      return null
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      if (newTimeLeft) {
        setTimeLeft(newTimeLeft)
      } else {
        // Sale has ended - clear interval
        clearInterval(timer)
        setTimeLeft(null)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // If sale has ended, don't render the banner
  if (!timeLeft) {
    return null
  }

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
          <span className="font-medium"> NEW YEAR SALE • UP TO 35% OFF • ENDS JANUARY 2ND</span>
          <div className="text-[#00ff00] text-xs mt-1">
            USE CODE: <span className="font-bold">NEWYEAR2026</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SaleBanner