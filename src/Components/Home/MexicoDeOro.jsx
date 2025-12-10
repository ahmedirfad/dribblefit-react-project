import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MexicoDeOro() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const videoContainerRef = useRef(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVideoVisible, setIsVideoVisible] = useState(false)

  useEffect(() => {
    // Create Intersection Observer to detect when video container is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px', // Start loading when 50px away from viewport
        threshold: 0.1
      }
    )

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current)
    }

    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current)
      }
    }
  }, [])

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true)
  }

  const handleShopNow = () => {
    navigate('/product/5')
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0" ref={videoContainerRef}>
        {isVideoVisible && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="src/assets/mexico-jersey-poster.jpg"
            preload="none" // Don't preload video
            loading="lazy"
            onLoadedData={handleVideoLoaded}
          >
            <source 
              src="src/assets/Mexico-de-oro.mp4" 
              type="video/mp4" 
            />
          </video>
        )}
        
        {/* Show poster image until video loads */}
        {!isVideoLoaded && (
          <img 
            src="src/assets/mexico-de-oro.webp" 
            alt="Mexico De Oro Jersey" 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide uppercase">
          MEXICO DE ORO
        </h1>

        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed uppercase">
          A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE, 
          <span className="block">MADE WITH RECYCLED MATERIALS.</span>
        </p>

        <button 
          onClick={handleShopNow}
          className="group bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:border-[#00ff00] hover:text-black transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2 mx-auto"
        >
          SHOP NOW
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>
    </div>
  )
}

export default MexicoDeOro