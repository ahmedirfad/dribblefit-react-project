import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../Api/Axios'

function MexicoDeOro() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const [settings, setSettings] = useState({
    is_active: true,
    title: 'MEXICO DE ORO',
    subtitle_line1: 'A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE,',
    subtitle_line2: 'MADE WITH RECYCLED MATERIALS.',
    button_text: 'SHOP NOW',
    button_link: '/product/5',
    video_url: '',
    poster_image: '',
    overlay_opacity: 40
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideoSection()
  }, [])

  const fetchVideoSection = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/video')
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
      }
    } catch (error) {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center">
        <div className="text-[#00ff00] text-lg">Loading...</div>
      </div>
    )
  }

  if (!settings.is_active) return null

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        {settings.video_url && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster={settings.poster_image ? `http://localhost:5000${settings.poster_image}` : ''}
          >
            <source 
              src="/images/Mexico-de-oroo.mp4"
              type="video/mp4" 
            />
          </video>
        )}

        {!settings.video_url && settings.poster_image && (
          <img 
            src={`http://localhost:5000${settings.poster_image}`}
            alt="Mexico De Oro Jersey" 
            className="w-full h-full object-cover"
          />
        )}
        
        {/* ✅ Fixed overlay - Tailwind can't use dynamic values */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: `rgba(0,0,0,${settings.overlay_opacity / 100})` }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide uppercase">
          {settings.title}
        </h1>

        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed uppercase">
          {settings.subtitle_line1}
          <span className="block">{settings.subtitle_line2}</span>
        </p>

        <button 
          onClick={() => navigate(settings.button_link)}
          className="group bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:border-[#00ff00] hover:text-black transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2 mx-auto"
        >
          {settings.button_text}
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>
      </div>
    </div>
  )
}

export default MexicoDeOro