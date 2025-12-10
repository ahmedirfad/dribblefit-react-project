import React from 'react'
import { useNavigate } from 'react-router-dom'

function PassionSection() {
  const navigate = useNavigate()

  const handleExploreAll = () => {
    navigate('/products')
  }

  return (
    <div className="relative py-24 px-4">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="src/assets/bannner.jpg" 
          alt="Football Passion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        <h1 className="text-4xl md:text-6xl font-bold text-white font-poppins mb-6">
          WEAR YOUR <span className="text-[#00ff00]">PASSION.</span>
          <br />
          OWN THE <span className="text-[#00ff00]">GAME.</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl font-poppins mb-10 max-w-xl mx-auto">
          Shop by teams that rule the game.
        </p>

        <button 
          onClick={handleExploreAll}
          className="border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold px-12 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm uppercase tracking-wider"
        >
          EXPLORE ALL
        </button>

      </div>
    </div>
  )
}

export default PassionSection