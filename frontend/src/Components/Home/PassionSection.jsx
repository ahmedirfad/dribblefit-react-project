import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/Axios'  // Adjust path as needed

function PassionSection() {
  const navigate = useNavigate()
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
  const [loading, setLoading] = useState(true)

  // ✅ Load settings from BACKEND API
  useEffect(() => {
    fetchPassionSection()
  }, [])

  const fetchPassionSection = async () => {
    try {
      setLoading(true)
      const response = await api.get('/home/sections/passion')
      
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
      }
    } catch (error) {
      console.error('Error fetching passion section:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExploreAll = () => {
    navigate(settings.button_link)
  }

  if (loading) {
    return (
      <div className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-[#00ff00] text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (!settings.is_active) return null

  return (
    <div className="relative py-24 px-4">
      
      <div className="absolute inset-0 z-0">
        {settings.image && (
          <img 
            src={settings.image} 
            alt="Football Passion"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        <h1 className="text-4xl md:text-6xl font-bold text-white font-poppins mb-6">
          {settings.title_line1} <span className="text-[#00ff00]">{settings.highlighted_text1}</span>
          <br />
          {settings.title_line2} <span className="text-[#00ff00]">{settings.highlighted_text2}</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl font-poppins mb-10 max-w-xl mx-auto">
          {settings.subtitle}
        </p>

        <button 
          onClick={handleExploreAll}
          className="border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold px-12 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm uppercase tracking-wider"
        >
          {settings.button_text}
        </button>

      </div>
    </div>
  )
}

export default PassionSection