import React from 'react'

function AnimatedFeatures() {
  const features = [
    {
      id: 1,
      title: "PROVED QUALITY",
      description: "100% authentic jerseys with quality assurance",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "PREMIUM, PRICED RIGHT", 
      description: "Competitive prices for premium quality products",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      id: 3,
      title: "FRESH WEEKLY DROPS",
      description: "New arrivals every week to keep your collection fresh",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "TRUSTED SUPPORT",
      description: "24/7 customer support for all your needs",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ]

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="bg-[#111111] py-20 border-y border-[#00ff00]/10">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className="text-center group p-6 rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#111111] border border-[#00ff00]/10 hover:border-[#00ff00]/40 hover:shadow-2xl hover:shadow-[#00ff00]/10 transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="w-16 h-16 bg-[#00ff00]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00ff00]/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-poppins font-bold text-lg mb-3 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default AnimatedFeatures