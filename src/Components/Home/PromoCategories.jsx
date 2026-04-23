import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/Axios'  // Adjust path as needed

function PromoCategories() {
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    is_active: true,
    section_title: 'EXPLORE',
    highlighted_text: 'COLLECTIONS',
    section_subtitle: 'Discover our curated collections for every football enthusiast',
    categories: []
  })
  const [imageIndex, setImageIndex] = useState({})
  const [loading, setLoading] = useState(true)

  // ✅ Load settings from BACKEND API
  useEffect(() => {
    fetchPromoCategories()
  }, [])

  const fetchPromoCategories = async () => {
    try {
      setLoading(true)
      const response = await api.get('/admin/home/sections/promo')
      
      if (response.data.success && response.data.section) {
        setSettings(response.data.section)
        // Initialize imageIndex for all categories
        const initialIndex = {}
        response.data.section.categories.forEach((_, idx) => {
          initialIndex[idx] = 0
        })
        setImageIndex(initialIndex)
      }
    } catch (error) {
      console.error('Error fetching promo categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageHover = (categoryIndex) => {
    setImageIndex(prev => ({
      ...prev,
      [categoryIndex]: ((prev[categoryIndex] || 0) + 1) % 3
    }))
  }

  const handleCardClick = (route) => {
    navigate(route)
  }

  const handleNameClick = (e, route) => {
    e.stopPropagation()
    navigate(route)
  }

  if (loading) {
    return (
      <div className="bg-[#0a0a0a] py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-[#00ff00] text-lg">Loading collections...</div>
        </div>
      </div>
    )
  }

  if (!settings.is_active || settings.categories.length === 0) return null

  return (
    <div className="bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            {settings.section_title} <span className="text-[#00ff00]">{settings.highlighted_text}</span>
          </h2>
          <p className="text-gray-400 text-lg font-poppins max-w-2xl mx-auto">
            {settings.section_subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {settings.categories.map((item, idx) => (
            <div 
              key={item.id}
              className="group bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => handleCardClick(item.route)}
              onMouseEnter={() => handleImageHover(idx)}
            >
              
              <div className="relative h-80 mb-6 overflow-hidden rounded-xl bg-[#1a1a1a] flex-shrink-0">
                <div className="relative w-full h-full">
                  {item.images && item.images.map((img, imgIdx) => (
                    img && img.trim() !== '' && (
                      <img 
                        key={imgIdx}
                        src={img} 
                        alt={item.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                          (imageIndex[idx] || 0) === imgIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                        }`}
                      />
                    )
                  ))}
                </div>
                
                {/* Image dots indicator */}
                {item.images && item.images.filter(img => img && img.trim() !== '').length > 1 && (
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {[0, 1, 2].map((dotIndex) => (
                      item.images[dotIndex] && item.images[dotIndex].trim() !== '' && (
                        <div 
                          key={dotIndex}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            (imageIndex[idx] || 0) === dotIndex ? 'bg-[#00ff00]' : 'bg-gray-600'
                          }`}
                        />
                      )
                    ))}
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {item.images && item.images.filter(img => img && img.trim() !== '').length > 1 && (
                  <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    Hover to see more
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 
                    onClick={(e) => handleNameClick(e, item.route)}
                    className="text-white font-poppins font-semibold text-xl mb-3 text-center cursor-pointer hover:text-[#00ff00] transition-colors duration-200 group-hover:underline"
                  >
                    {item.name}
                  </h3>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PromoCategories