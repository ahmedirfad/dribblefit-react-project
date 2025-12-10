import React from 'react'
import { useNavigate } from 'react-router-dom'

function InternationalKits() {
  const navigate = useNavigate()

  const handleShopNow = () => {
    navigate('/products?category=international-kits')
  }

  return (
    <div className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="src/assets/portugal19-min.webp" 
            alt="International Football Kits"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>
        </div>

       
        <div className="relative z-10 w-full text-center px-4 space-y-8">
          

          <h2 className="text-4xl md:text-6xl font-bold text-white font-poppins tracking-tight">
            INTERNATIONAL <span className="text-[#00ff00]">KITS</span>
          </h2>
          
          <p className="text-gray-200 text-xl font-poppins tracking-widest uppercase">
            STARTING AT
          </p>
          
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl text-gray-200 font-poppins">₹</span>
            <span className="text-7xl md:text-8xl font-bold text-white font-poppins tracking-tighter">799</span>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-14 py-4 rounded-lg hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] hover:bg-[#00ff00]/90 transition-all duration-300 text-sm uppercase tracking-widest font-poppins"
            >
              Shop Now
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InternationalKits