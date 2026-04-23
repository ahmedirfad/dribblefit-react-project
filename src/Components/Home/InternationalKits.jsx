import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../Api/Axios'  // Make sure this path is correct

function InternationalKits() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    is_active: true,
    image: '',
    title: 'INTERNATIONAL',
    highlighted_text: 'KITS',
    subtitle: 'STARTING AT',
    currency: '₹',
    price: '799',
    button_text: 'Shop Now',
    button_link: '/products?category=international-kits'
  })
  const [loading, setLoading] = useState(true)

  // ✅ LOAD FROM BACKEND API - NOT localStorage
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const response = await api.get('/admin/home/sections/kits')
        
        if (response.data.success && response.data.section) {
          setSettings(response.data.section)
        }
      } catch (error) {
        console.error('Error fetching kits:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSettings()
  }, [])

  const handleShopNow = () => {
    navigate(settings.button_link)
  }

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] min-h-[70vh] flex items-center justify-center">
        <div className="text-[#00ff00] text-lg">Loading...</div>
      </div>
    )
  }

  if (!settings.is_active) return null

  return (
    <div className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        
        <div className="absolute inset-0 z-0">
          {settings.image && (
            <img 
              src={settings.image} 
              alt="International Football Kits"
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 w-full text-center px-4 space-y-8">
          
          <h2 className="text-4xl md:text-6xl font-bold text-white font-poppins tracking-tight">
            {settings.title} <span className="text-[#00ff00]">{settings.highlighted_text}</span>
          </h2>
          
          <p className="text-gray-200 text-xl font-poppins tracking-widest uppercase">
            {settings.subtitle}
          </p>
          
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl text-gray-200 font-poppins">{settings.currency}</span>
            <span className="text-7xl md:text-8xl font-bold text-white font-poppins tracking-tighter">{settings.price}</span>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-14 py-4 rounded-lg hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] hover:bg-[#00ff00]/90 transition-all duration-300 text-sm uppercase tracking-widest font-poppins"
            >
              {settings.button_text}
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InternationalKits