import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function SizeGuide() {
  const [activeCategory, setActiveCategory] = useState('men');
  const [activeSizeSystem, setActiveSizeSystem] = useState('inches');

  const sizeCategories = [
    { id: 'men', label: 'Men\'s Jerseys', icon: '👕' },
    { id: 'women', label: 'Women\'s Jerseys', icon: '👚' },
    { id: 'youth', label: 'Youth Jerseys', icon: '👦' },
    { id: 'kids', label: 'Kids Jerseys', icon: '👶' }
  ];

  const sizeSystems = [
    { id: 'inches', label: 'Inches' },
    { id: 'cm', label: 'Centimeters' }
  ];

  // Size charts data
  const sizeCharts = {
    men: {
      title: "Men's Football Jersey Sizes",
      description: "Standard fit for regular body type. For a looser fit, consider going one size up.",
      measurements: {
        inches: [
          { size: 'XS', chest: '34-36', waist: '28-30', length: '27' },
          { size: 'S', chest: '36-38', waist: '30-32', length: '28' },
          { size: 'M', chest: '38-40', waist: '32-34', length: '29' },
          { size: 'L', chest: '40-42', waist: '34-36', length: '30' },
          { size: 'XL', chest: '42-44', waist: '36-38', length: '31' },
          { size: '2XL', chest: '44-46', waist: '38-40', length: '32' },
          { size: '3XL', chest: '46-48', waist: '40-42', length: '33' }
        ],
        cm: [
          { size: 'XS', chest: '86-91', waist: '71-76', length: '69' },
          { size: 'S', chest: '91-97', waist: '76-81', length: '71' },
          { size: 'M', chest: '97-102', waist: '81-86', length: '74' },
          { size: 'L', chest: '102-107', waist: '86-91', length: '76' },
          { size: 'XL', chest: '107-112', waist: '91-97', length: '79' },
          { size: '2XL', chest: '112-117', waist: '97-102', length: '81' },
          { size: '3XL', chest: '117-122', waist: '102-107', length: '84' }
        ]
      },
      fitNotes: [
        'Standard fit for regular body type',
        'For athletic build, choose your regular size',
        'For relaxed fit, go one size up',
        'Fabric has slight stretch for comfort'
      ]
    },
    women: {
      title: "Women's Football Jersey Sizes",
      description: "Semi-fitted cut designed for women. For a looser fit, consider going one size up.",
      measurements: {
        inches: [
          { size: 'XS', chest: '30-32', waist: '24-26', length: '24' },
          { size: 'S', chest: '32-34', waist: '26-28', length: '25' },
          { size: 'M', chest: '34-36', waist: '28-30', length: '26' },
          { size: 'L', chest: '36-38', waist: '30-32', length: '27' },
          { size: 'XL', chest: '38-40', waist: '32-34', length: '28' },
          { size: '2XL', chest: '40-42', waist: '34-36', length: '29' }
        ],
        cm: [
          { size: 'XS', chest: '76-81', waist: '61-66', length: '61' },
          { size: 'S', chest: '81-86', waist: '66-71', length: '64' },
          { size: 'M', chest: '86-91', waist: '71-76', length: '66' },
          { size: 'L', chest: '91-97', waist: '76-81', length: '69' },
          { size: 'XL', chest: '97-102', waist: '81-86', length: '71' },
          { size: '2XL', chest: '102-107', waist: '86-91', length: '74' }
        ]
      },
      fitNotes: [
        'Semi-fitted cut for women',
        'For busty figures, consider going one size up',
        'Length is slightly shorter than men\'s jerseys',
        'Designed for comfort during movement'
      ]
    },
    youth: {
      title: "Youth Jersey Sizes (8-16 Years)",
      description: "Sizes for growing athletes. Consider going one size up for room to grow.",
      measurements: {
        inches: [
          { size: 'YS', chest: '26-28', waist: '22-24', length: '22' },
          { size: 'YM', chest: '28-30', waist: '24-26', length: '23' },
          { size: 'YL', chest: '30-32', waist: '26-28', length: '24' },
          { size: 'YXL', chest: '32-34', waist: '28-30', length: '25' }
        ],
        cm: [
          { size: 'YS', chest: '66-71', waist: '56-61', length: '56' },
          { size: 'YM', chest: '71-76', waist: '61-66', length: '58' },
          { size: 'YL', chest: '76-81', waist: '66-71', length: '61' },
          { size: 'YXL', chest: '81-86', waist: '71-76', length: '64' }
        ]
      },
      fitNotes: [
        'For ages 8-16 years',
        'Allow room for growth - consider one size up',
        'Lightweight and breathable fabric',
        'Designed for active play'
      ]
    },
    kids: {
      title: "Kids Jersey Sizes (4-8 Years)",
      description: "Perfect fit for young fans. Slightly roomy cut for comfort and play.",
      measurements: {
        inches: [
          { size: '4T', chest: '22', waist: '20', length: '18' },
          { size: '5T', chest: '23', waist: '21', length: '19' },
          { size: '6T', chest: '24', waist: '22', length: '20' },
          { size: '7-8', chest: '25', waist: '23', length: '21' }
        ],
        cm: [
          { size: '4T', chest: '56', waist: '51', length: '46' },
          { size: '5T', chest: '58', waist: '53', length: '48' },
          { size: '6T', chest: '61', waist: '56', length: '51' },
          { size: '7-8', chest: '64', waist: '58', length: '53' }
        ]
      },
      fitNotes: [
        'For ages 4-8 years',
        'Room for layers underneath',
        'Soft, comfortable fabric',
        'Easy to put on and take off'
      ]
    }
  };

  const measurementTips = [
    {
      title: 'How to Measure Chest',
      description: 'Measure around the fullest part of your chest, keeping the tape measure horizontal and snug but not tight.',
      icon: '📏'
    },
    {
      title: 'How to Measure Waist',
      description: 'Measure around your natural waistline (usually just above the belly button). Keep the tape measure comfortably snug.',
      icon: '📐'
    },
    {
      title: 'How to Measure Length',
      description: 'Measure from the base of the neck (where the collar sits) down to the bottom hem of the jersey.',
      icon: '📝'
    },
    {
      title: 'Fitting Tips',
      description: 'For a tighter fit (athletic look), choose your exact size. For a looser fit (casual wear), go one size up.',
      icon: '💡'
    }
  ];

  const fitTypes = [
    {
      type: 'Standard Fit',
      description: 'Regular cut that follows body contours without being tight. Ideal for most body types.',
      icon: '✅',
      recommended: 'Most Popular'
    },
    {
      type: 'Athletic Fit',
      description: 'Slightly tighter cut that hugs the body. Perfect for players and athletic builds.',
      icon: '⚽',
      recommended: 'For Players'
    },
    {
      type: 'Relaxed Fit',
      description: 'Looser cut with extra room. Great for casual wear and layering.',
      icon: '😌',
      recommended: 'For Comfort'
    }
  ];

  const faqs = [
    {
      question: 'What if I\'m between sizes?',
      answer: 'If you\'re between sizes, we recommend going with the larger size for a more comfortable fit, especially if you plan to wear layers underneath.'
    },
    {
      question: 'Do jerseys shrink after washing?',
      answer: 'Our jerseys are made from high-quality, pre-shrunk fabric. Follow the care instructions (cold wash, hang dry) to minimize any shrinkage.'
    },
    {
      question: 'How do I choose the right size for a gift?',
      answer: 'If you\'re unsure about the size, check their existing jerseys or ask about their t-shirt size. When in doubt, go one size larger.'
    },
    {
      question: 'Are sizes consistent across all teams?',
      answer: 'Yes! All our jerseys follow the same sizing standards, so your size will be consistent across different teams and styles.'
    },
    {
      question: 'Can I exchange for a different size?',
      answer: 'Yes, we offer free size exchanges within 30 days of delivery. The item must be unworn with original tags attached.'
    },
    {
      question: 'What if the size doesn\'t fit perfectly?',
      answer: 'We want you to be happy! If the size isn\'t right, contact us within 30 days for an easy exchange.'
    }
  ];

  const activeChart = sizeCharts[activeCategory];
  const measurements = activeChart.measurements[activeSizeSystem];
  const unit = activeSizeSystem === 'inches' ? 'inches' : 'cm';

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[#00ff00] text-6xl mb-6">📏</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
              SIZE <span className="text-[#00ff00]">GUIDE</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find your perfect fit with our detailed size charts and measurement guides
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Category Selector */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Select Category</h3>
                <div className="space-y-2">
                  {sizeCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-[#00ff00] text-black font-bold'
                          : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span>{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Measurement Units */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Measurement Units</h3>
                <div className="flex gap-2">
                  {sizeSystems.map((system) => (
                    <button
                      key={system.id}
                      onClick={() => setActiveSizeSystem(system.id)}
                      className={`flex-1 py-3 rounded-lg transition-all duration-300 ${
                        activeSizeSystem === system.id
                          ? 'bg-[#00ff00] text-black font-bold'
                          : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {system.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fit Types */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Fit Types</h3>
                <div className="space-y-4">
                  {fitTypes.map((fit, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{fit.icon}</span>
                          <span className="text-white font-semibold">{fit.type}</span>
                        </div>
                        {fit.recommended && (
                          <span className="text-xs bg-[#00ff00]/10 text-[#00ff00] px-2 py-1 rounded-full">
                            {fit.recommended}
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm">{fit.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Need Help?</h3>
                <div className="space-y-1">
                  <Link to="/contact" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Contact Support
                  </Link>
                  <Link to="/returns" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Size Exchange
                  </Link>
                  <Link to="/products" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Shop Now
                  </Link>
                  <Link to="/shipping-info" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Shipping Info
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Size Chart */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white font-poppins">{activeChart.title}</h2>
                    <p className="text-gray-400 mt-2">{activeChart.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <div className="text-gray-400 text-sm">Measurements in {unit}</div>
                  </div>
                </div>

                {/* Size Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1a1a1a]">
                        <th className="text-left p-4 text-gray-400 font-semibold">Size</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Chest ({unit})</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Waist ({unit})</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Length ({unit})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {measurements.map((row, index) => (
                        <tr 
                          key={index}
                          className={`border-t border-gray-800 ${
                            index % 2 === 0 ? 'bg-[#1a1a1a]/50' : 'bg-[#111111]'
                          }`}
                        >
                          <td className="p-4">
                            <div className="text-white font-bold">{row.size}</div>
                          </td>
                          <td className="p-4 text-white">{row.chest}</td>
                          <td className="p-4 text-white">{row.waist}</td>
                          <td className="p-4 text-white">{row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Fit Notes */}
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h4 className="text-white font-poppins font-semibold mb-4">Fit Notes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeChart.fitNotes.map((note, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300 text-sm">{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* How to Measure */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">How to Measure</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {measurementTips.map((tip, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6"
                    >
                      <div className="text-3xl mb-4">{tip.icon}</div>
                      <div className="text-white font-poppins font-semibold text-lg mb-3">{tip.title}</div>
                      <div className="text-gray-300">{tip.description}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-xl p-6">
                  <div className="text-white font-poppins font-bold text-lg mb-3">📝 Pro Tip</div>
                  <div className="text-gray-300">
                    Use a soft measuring tape (not metal) and measure over light clothing. 
                    For the most accurate fit, have someone help you take measurements.
                  </div>
                </div>
              </div>

              {/* Comparison Guide */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">International Size Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#1a1a1a]">
                        <th className="text-left p-4 text-gray-400 font-semibold">US/UK</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">EU</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Chest (cm)</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Chest (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-gray-800 bg-[#1a1a1a]/50">
                        <td className="p-4 text-white font-bold">XS</td>
                        <td className="p-4 text-white">34</td>
                        <td className="p-4 text-white">86-91</td>
                        <td className="p-4 text-white">34-36</td>
                      </tr>
                      <tr className="border-t border-gray-800 bg-[#111111]">
                        <td className="p-4 text-white font-bold">S</td>
                        <td className="p-4 text-white">36</td>
                        <td className="p-4 text-white">91-97</td>
                        <td className="p-4 text-white">36-38</td>
                      </tr>
                      <tr className="border-t border-gray-800 bg-[#1a1a1a]/50">
                        <td className="p-4 text-white font-bold">M</td>
                        <td className="p-4 text-white">38</td>
                        <td className="p-4 text-white">97-102</td>
                        <td className="p-4 text-white">38-40</td>
                      </tr>
                      <tr className="border-t border-gray-800 bg-[#111111]">
                        <td className="p-4 text-white font-bold">L</td>
                        <td className="p-4 text-white">40</td>
                        <td className="p-4 text-white">102-107</td>
                        <td className="p-4 text-white">40-42</td>
                      </tr>
                      <tr className="border-t border-gray-800 bg-[#1a1a1a]/50">
                        <td className="p-4 text-white font-bold">XL</td>
                        <td className="p-4 text-white">42</td>
                        <td className="p-4 text-white">107-112</td>
                        <td className="p-4 text-white">42-44</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="text-white font-poppins font-semibold mb-3">{faq.question}</div>
                        <div className="text-gray-300">{faq.answer}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Instructions */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Care Instructions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                    <div className="text-3xl mb-4">🧼</div>
                    <div className="text-white font-poppins font-semibold mb-3">Washing</div>
                    <div className="text-gray-300 text-sm">Cold water, gentle cycle. Turn inside out before washing.</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                    <div className="text-3xl mb-4">🌬️</div>
                    <div className="text-white font-poppins font-semibold mb-3">Drying</div>
                    <div className="text-gray-300 text-sm">Hang dry or lay flat. Avoid direct sunlight and high heat.</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 text-center">
                    <div className="text-3xl mb-4">🧵</div>
                    <div className="text-white font-poppins font-semibold mb-3">Ironing</div>
                    <div className="text-gray-300 text-sm">Low heat, turn inside out. Avoid ironing over prints.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-12">
              <div className="text-[#00ff00] text-6xl mb-6">⚽</div>
              <h3 className="text-3xl font-bold text-white font-poppins mb-4">Ready to Find Your Perfect Fit?</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Now that you know your size, browse our collection of authentic football jerseys!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/products"
                  className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
                >
                  Shop All Jerseys
                </Link>
                <Link 
                  to="/contact"
                  className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/10 transition-all duration-300"
                >
                  Still Unsure? Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SizeGuide;