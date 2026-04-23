import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/Axios'  // Adjust path to your api file

function HeroBanner() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    is_active: true,
    image: '',
    heading: 'ELEVATE YOUR',
    highlighted_text: 'GAME STYLE',
    subheading: 'Discover authentic football jerseys from top leagues worldwide. Limited editions, exclusive designs, and unbeatable quality.',
    button_text: 'View Collection',
    button_link: '/products',
    features: ['Authentic Jerseys', 'Worldwide Shipping', 'Limited Editions']
  })
  const [loading, setLoading] = useState(true)

  // ✅ Load settings from BACKEND API instead of localStorage
  useEffect(() => {
    fetchHeroBannerSettings()
  }, [])

  const fetchHeroBannerSettings = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/hero-banner')
      
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
      }
    } catch (error) {
      console.error('Error fetching hero banner:', error)
      // Fallback to default settings if API fails
    } finally {
      setLoading(false)
    }
  }

  const handleViewCollection = () => {
    navigate(settings.button_link)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#00ff00] text-lg">Loading...</div>
      </div>
    )
  }

  if (!settings.is_active) return null

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        {settings.image && (
          <img 
            src={settings.image} 
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full lg:w-1/2">
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            {settings.heading}
            <span className="text-[#00ff00] block">{settings.highlighted_text}</span>
          </h1>

          <p className="text-gray-300 text-lg lg:text-xl mb-8 max-w-lg">
            {settings.subheading}
          </p>

          {/* Button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleViewCollection}
              className="group border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm uppercase tracking-wider relative overflow-hidden"
            >
              <span className="relative z-10">{settings.button_text}</span>
              <div className="absolute inset-0 bg-[#00ff00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
            {settings.features && settings.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 group cursor-pointer">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                <span className="group-hover:text-white transition-colors duration-200">{feature}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00ff00] rounded-full flex justify-center group cursor-pointer">
            <div className="w-1 h-3 bg-[#00ff00] rounded-full mt-2 group-hover:scale-110 transition-transform duration-200"></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroBanner