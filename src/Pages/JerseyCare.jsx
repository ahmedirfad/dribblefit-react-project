import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function JerseyCare() {
  const [activeTab, setActiveTab] = useState('washing');

  const tabs = [
    { id: 'washing', label: 'Washing', icon: '🧼' },
    { id: 'drying', label: 'Drying', icon: '🌬️' },
    { id: 'ironing', label: 'Ironing', icon: '🧵' },
    { id: 'storage', label: 'Storage', icon: '👕' },
    { id: 'stains', label: 'Stain Removal', icon: '⚠️' }
  ];

  const careInstructions = {
    washing: {
      title: 'Washing Your Jersey',
      description: 'Proper washing techniques to keep your jersey looking new for longer.',
      steps: [
        {
          step: 1,
          title: 'Turn Inside Out',
          description: 'Always turn your jersey inside out before washing. This protects prints, patches, and embroidery.',
          icon: '🔄',
          importance: 'high'
        },
        {
          step: 2,
          title: 'Use Cold Water',
          description: 'Wash in cold water (30°C or below) to prevent colors from fading and fabric from shrinking.',
          icon: '❄️',
          importance: 'high'
        },
        {
          step: 3,
          title: 'Gentle Cycle',
          description: 'Use the gentle or delicate cycle on your washing machine. Avoid heavy-duty cycles.',
          icon: '⚙️',
          importance: 'medium'
        },
        {
          step: 4,
          title: 'Mild Detergent',
          description: 'Use a mild, color-safe detergent. Avoid bleach, fabric softeners, and harsh chemicals.',
          icon: '🧴',
          importance: 'high'
        },
        {
          step: 5,
          title: 'Separate Colors',
          description: 'Wash dark jerseys separately from light ones to prevent color bleeding.',
          icon: '🎨',
          importance: 'medium'
        },
        {
          step: 6,
          title: 'Avoid Overloading',
          description: 'Don\'t overload the washing machine. Give your jersey room to move freely.',
          icon: '📦',
          importance: 'low'
        }
      ],
      tips: [
        'Wash customized jerseys (with names/numbers) separately',
        'Close all zippers and fasten Velcro before washing',
        'Remove any temporary patches or badges',
        'Wash after each wear for optimal freshness'
      ]
    },
    drying: {
      title: 'Drying Your Jersey',
      description: 'Safe drying methods to maintain shape and prevent damage.',
      steps: [
        {
          step: 1,
          title: 'Air Dry Flat',
          description: 'Lay your jersey flat on a clean towel or drying rack. This is the safest method.',
          icon: '🛏️',
          importance: 'high'
        },
        {
          step: 2,
          title: 'Hang Dry',
          description: 'Hang on a padded hanger or clothesline. Avoid wire hangers that can cause shoulder bumps.',
          icon: '👚',
          importance: 'medium'
        },
        {
          step: 3,
          title: 'Avoid Direct Sunlight',
          description: 'Dry in shade or indoors to prevent colors from fading due to UV exposure.',
          icon: '☀️',
          importance: 'high'
        },
        {
          step: 4,
          title: 'No Tumble Dry',
          description: 'NEVER use a tumble dryer. The heat can shrink fabric and damage prints.',
          icon: '❌',
          importance: 'critical'
        },
        {
          step: 5,
          title: 'Reshape While Damp',
          description: 'Gently reshape your jersey while still damp to maintain its original form.',
          icon: '✋',
          importance: 'low'
        }
      ],
      tips: [
        'Dry away from direct heat sources like radiators',
        'Turn right side out once completely dry',
        'For faster drying, place near a fan (not heater)',
        'Check that all prints are completely dry before storing'
      ]
    },
    ironing: {
      title: 'Ironing & Steaming',
      description: 'How to remove wrinkles without damaging your jersey.',
      steps: [
        {
          step: 1,
          title: 'Turn Inside Out',
          description: 'Always iron your jersey inside out to protect prints and embroidery.',
          icon: '🔄',
          importance: 'high'
        },
        {
          step: 2,
          title: 'Low Heat Setting',
          description: 'Use the lowest heat setting on your iron. Polyester requires very little heat.',
          icon: '🌡️',
          importance: 'critical'
        },
        {
          step: 3,
          title: 'Steam Instead',
          description: 'Consider using a garment steamer instead of an iron. It\'s gentler on fabrics.',
          icon: '💨',
          importance: 'medium'
        },
        {
          step: 4,
          title: 'Avoid Direct Contact',
          description: 'Never iron directly over prints, numbers, or patches. Use a pressing cloth if needed.',
          icon: '🛡️',
          importance: 'critical'
        },
        {
          step: 5,
          title: 'Iron Damp',
          description: 'Iron while the jersey is slightly damp for best results, or use the steam function.',
          icon: '💧',
          importance: 'medium'
        }
      ],
      tips: [
        'Test iron temperature on an inconspicuous area first',
        'Iron in sections, don\'t drag the iron across prints',
        'For stubborn wrinkles, hang in bathroom during hot shower',
        'Consider professional pressing for expensive jerseys'
      ]
    },
    storage: {
      title: 'Proper Storage',
      description: 'How to store your jerseys to prevent damage and maintain quality.',
      steps: [
        {
          step: 1,
          title: 'Clean Before Storing',
          description: 'Always wash your jersey before long-term storage to prevent stains from setting.',
          icon: '🧼',
          importance: 'high'
        },
        {
        step: 2,
        title: 'Use Padded Hangers',
        description: 'Store on wide, padded hangers to maintain shoulder shape and prevent creases.',
        icon: '👔',
        importance: 'medium'
        },
        {
          step: 3,
          title: 'Avoid Plastic Bags',
          description: 'Don\'t store in plastic bags long-term. Use breathable garment bags instead.',
          icon: '👜',
          importance: 'medium'
        },
        {
          step: 4,
          title: 'Cool, Dry Place',
          description: 'Store in a cool, dry place away from direct sunlight and moisture.',
          icon: '🏠',
          importance: 'high'
        },
        {
          step: 5,
          title: 'Fold Properly',
          description: 'If folding, fold along seams and avoid creasing over prints or badges.',
          icon: '📐',
          importance: 'low'
        }
      ],
      tips: [
        'Rotate jerseys in your collection to prevent permanent creases',
        'Use cedar blocks or lavender sachets to deter moths',
        'Check stored jerseys every few months for any issues',
        'Store away from harsh chemicals or strong odors'
      ]
    },
    stains: {
      title: 'Stain Removal',
      description: 'How to treat common stains without damaging your jersey.',
      steps: [
        {
          step: 1,
          title: 'Act Quickly',
          description: 'Treat stains as soon as possible. Fresh stains are easier to remove.',
          icon: '⏱️',
          importance: 'high'
        },
        {
          step: 2,
          title: 'Blot, Don\'t Rub',
          description: 'Gently blot stains with a clean cloth. Rubbing can spread the stain and damage fabric.',
          icon: '👐',
          importance: 'critical'
        },
        {
          step: 3,
          title: 'Cold Water Rinse',
          description: 'Rinse the stained area with cold water from the back to push stain out.',
          icon: '💦',
          importance: 'high'
        },
        {
          step: 4,
          title: 'Use Mild Solution',
          description: 'Mix mild detergent with cold water and apply gently. Test on hidden area first.',
          icon: '🧪',
          importance: 'medium'
        },
        {
          step: 5,
          title: 'Avoid Harsh Chemicals',
          description: 'Never use bleach, stain removers with bleach, or harsh solvents on jerseys.',
          icon: '☢️',
          importance: 'critical'
        }
      ],
      tips: [
        'For grass stains: cold water and mild soap, then wash normally',
        'For mud: let dry completely, brush off, then treat',
        'For food/oil: apply baking soda, let sit, then brush off',
        'For sweat stains: soak in cold water with vinegar before washing',
        'When in doubt, take to professional cleaner'
      ]
    }
  };

  const fabricTypes = [
    {
      type: 'Polyester (Most Common)',
      description: 'Durable, breathable, quick-drying. Used in most modern football jerseys.',
      care: 'Cold wash, air dry, low heat iron',
      icon: '⚡'
    },
    {
      type: 'Recycled Polyester',
      description: 'Eco-friendly version of polyester with similar properties.',
      care: 'Same as regular polyester',
      icon: '♻️'
    },
    {
      type: 'Mesh Panels',
      description: 'Breathable mesh sections for ventilation.',
      care: 'Extra gentle cycle, lay flat to dry',
      icon: '🔲'
    },
    {
      type: 'Dri-FIT/Climacool',
      description: 'Moisture-wicking technology fabrics.',
      care: 'Avoid fabric softeners, air dry',
      icon: '💧'
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Using Hot Water',
      consequence: 'Causes shrinkage and color fading',
      solution: 'Always use cold water (30°C or below)',
      icon: '🔥'
    },
    {
      mistake: 'Tumble Drying',
      consequence: 'Shrinks fabric and damages prints',
      solution: 'Always air dry flat or hang',
      icon: '🌀'
    },
    {
      mistake: 'Ironing Over Prints',
      consequence: 'Melts or damages printed designs',
      solution: 'Always iron inside out, avoid prints',
      icon: '🧨'
    },
    {
      mistake: 'Using Bleach',
      consequence: 'Destroys colors and weakens fabric',
      solution: 'Use color-safe detergent only',
      icon: '☠️'
    },
    {
      mistake: 'Washing with Zippers Open',
      consequence: 'Can snag and damage fabric',
      solution: 'Close all zippers and fasten Velcro',
      icon: '🤐'
    },
    {
      mistake: 'Storing Damp',
      consequence: 'Causes mold and mildew',
      solution: 'Ensure completely dry before storing',
      icon: '🍄'
    }
  ];

  const careSchedule = [
    {
      frequency: 'After Each Wear',
      tasks: ['Turn inside out', 'Wash cold', 'Air dry'],
      icon: '👕'
    },
    {
      frequency: 'Monthly',
      tasks: ['Check for loose threads', 'Inspect prints', 'Clean storage area'],
      icon: '📅'
    },
    {
      frequency: 'Seasonally',
      tasks: ['Deep clean storage', 'Rotate collection', 'Check for pests'],
      icon: '🍂'
    },
    {
      frequency: 'Annually',
      tasks: ['Professional inspection', 'Consider reproofing', 'Update storage method'],
      icon: '🎉'
    }
  ];

  const activeContent = careInstructions[activeTab];

  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[#00ff00] text-6xl mb-6">👕</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
              JERSEY <span className="text-[#00ff00]">CARE GUIDE</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Keep your jerseys looking like new with our comprehensive care instructions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Care Tabs */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Care Categories</h3>
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-[#00ff00] text-black font-bold'
                          : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-2xl">{tab.icon}</span>
                      <span className="text-left">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Quick Tips</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00]">❄️</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Cold Wash Only</div>
                      <div className="text-gray-400 text-xs">Always use cold water to prevent damage</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00]">👚</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Air Dry</div>
                      <div className="text-gray-400 text-xs">Never use tumble dryer</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00]">🔄</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Inside Out</div>
                      <div className="text-gray-400 text-xs">Always wash and iron inside out</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00]">🧴</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Mild Detergent</div>
                      <div className="text-gray-400 text-xs">No bleach or fabric softener</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Related Guides</h3>
                <div className="space-y-1">
                  <Link to="/size-guide" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Size Guide
                  </Link>
                  <Link to="/returns" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Returns & Exchanges
                  </Link>
                  <Link to="/faq" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    FAQ
                  </Link>
                  <Link to="/products" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Shop New Jerseys
                  </Link>
                </div>
              </div>

              {/* Emergency Care */}
              <div className="bg-[#111111] border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">⚠️ Emergency Care</h3>
                <div className="space-y-3">
                  <div className="text-red-400 text-sm font-semibold">Immediate Actions:</div>
                  <div className="text-gray-300 text-sm">• Major stain: Blot, don't rub</div>
                  <div className="text-gray-300 text-sm">• Torn seam: Stop wearing immediately</div>
                  <div className="text-gray-300 text-sm">• Loose print: Avoid washing</div>
                  <div className="text-gray-300 text-sm mt-4">Contact support for serious damage</div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Care Category */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{tabs.find(t => t.id === activeTab)?.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white font-poppins">{activeContent.title}</h2>
                    <p className="text-gray-400 mt-2">{activeContent.description}</p>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-6">
                  {activeContent.steps.map((step) => (
                    <div 
                      key={step.step}
                      className={`border rounded-xl p-6 ${getImportanceColor(step.importance)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-[#00ff00]/10 rounded-full flex items-center justify-center">
                            <span className="text-2xl">{step.icon}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white font-poppins font-semibold text-lg">
                              Step {step.step}: {step.title}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              step.importance === 'critical' ? 'bg-red-500/20 text-red-400' :
                              step.importance === 'high' ? 'bg-yellow-500/20 text-yellow-400' :
                              step.importance === 'medium' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {step.importance.toUpperCase()}
                            </span>
                          </div>
                          <div className="text-gray-300">{step.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Tips */}
                {activeContent.tips && (
                  <div className="mt-8 pt-8 border-t border-gray-800">
                    <h4 className="text-white font-poppins font-semibold text-lg mb-4">Additional Tips</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeContent.tips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Fabric Types */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Fabric Types & Care</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fabricTypes.map((fabric, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl">{fabric.icon}</div>
                        <div className="text-white font-poppins font-semibold">{fabric.type}</div>
                      </div>
                      <div className="text-gray-300 text-sm mb-4">{fabric.description}</div>
                      <div className="text-[#00ff00] text-sm font-semibold">Care: {fabric.care}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Common Mistakes to Avoid</h2>
                <div className="space-y-6">
                  {commonMistakes.map((mistake, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{mistake.icon}</div>
                        <div className="flex-1">
                          <div className="text-red-400 font-poppins font-semibold text-lg mb-2">
                            {mistake.mistake}
                          </div>
                          <div className="text-gray-300 mb-2">{mistake.consequence}</div>
                          <div className="text-[#00ff00] text-sm font-semibold">Solution: {mistake.solution}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Schedule */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Jersey Care Schedule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {careSchedule.map((schedule, index) => (
                    <div 
                      key={index}
                      className="bg-gradient-to-br from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl">{schedule.icon}</div>
                        <div className="text-white font-poppins font-semibold text-lg">{schedule.frequency}</div>
                      </div>
                      <div className="space-y-2">
                        {schedule.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-start gap-2">
                            <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                              <svg className="w-5 h-5 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-gray-300 text-sm">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Printable Guide */}
              <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-white font-poppins font-bold text-xl mb-2">📄 Printable Care Guide</div>
                    <div className="text-gray-300">
                      Download our comprehensive care guide to keep with your jerseys
                    </div>
                  </div>
                  <button className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors">
                    Download PDF Guide
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-12">
              <div className="text-[#00ff00] text-6xl mb-6">👕⚽</div>
              <h3 className="text-3xl font-bold text-white font-poppins mb-4">Ready to Expand Your Collection?</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Now that you know how to care for your jerseys, why not add more to your collection?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/products"
                  className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
                >
                  Shop New Jerseys
                </Link>
                <Link 
                  to="/contact"
                  className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/10 transition-all duration-300"
                >
                  Need Personalized Advice?
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

export default JerseyCare;