import React from 'react'
import { useNavigate } from 'react-router-dom'

function PromoCategories() {
  const navigate = useNavigate()

  const promoItems = [
    {
      id: 1,
      name: "RETRO JERSEYS",
      count: "180",
      image: "src/assets/retro-jersey-main.webp",
      route: "/products?category=retro-jerseys"
    },
    {
      id: 2,
      name: "ANTHEM JACKETS",
      count: "22", 
      image: "src/assets/city-jackets.webp",
      route: "/products?category=anthem-jackets"
    },
    {
      id: 3,
      name: "2025/26 SEASON KITS",
      count: "37",
      image: "src/assets/real3bs.jpg",
      route: "/products?category=2025-26-season-kits"
    }
  ]

  const handleCardClick = (route) => {
    navigate(route)
  }

  const handleNameClick = (e, route) => {
    e.stopPropagation() 
    navigate(route)
  }

  return (
    <div className="bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            EXPLORE <span className="text-[#00ff00]">COLLECTIONS</span>
          </h2>
          <p className="text-gray-400 text-lg font-poppins max-w-2xl mx-auto">
            Discover our curated collections for every football enthusiast
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promoItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => handleCardClick(item.route)}
            >
              
              <div className="relative h-80 mb-6 overflow-hidden rounded-xl bg-[#1a1a1a] flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div>

                  <h3 
                    onClick={(e) => handleNameClick(e, item.route)}
                    className="text-white font-poppins font-semibold text-lg mb-3 text-center cursor-pointer hover:text-[#00ff00] transition-colors duration-200 group-hover:underline"
                  >
                    {item.name}
                  </h3>
                  

                  <div className="h-12 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <p className="text-[#00ff00] font-poppins font-bold text-2xl">
                        {item.count}
                      </p>
                      <p className="text-gray-400 font-poppins text-xs mt-1">
                        ITEMS AVAILABLE
                      </p>
                    </div>
                  </div>
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