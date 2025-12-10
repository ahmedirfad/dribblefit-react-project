import React, { useState, useEffect } from 'react'

function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    // getting current year and putting xmas on dec 25
    const currentYear = new Date().getFullYear()
    const christmas = new Date(`December 25, ${currentYear} 00:00:00`).getTime()
    const now = new Date().getTime()
    const difference = christmas - now

    // if xmas not in this year, set to nxt year
    if (difference < 0) {
      const nextYear = currentYear + 1
      const nextChristmas = new Date(`December 25, ${nextYear} 00:00:00`).getTime()
      const newDifference = nextChristmas - now
      
      return {
        days: Math.floor(newDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((newDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((newDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((newDifference % (1000 * 60)) / 1000)
      }
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
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs">
        
        
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

        
        <div className="text-gray-300 text-center">
          <span className="font-medium">CHRISTMAS SALE • UP TO 50% OFF • ENDS DECEMBER 25TH</span>
        </div>

      </div>
    </div>
  )
}

export default SaleBanner