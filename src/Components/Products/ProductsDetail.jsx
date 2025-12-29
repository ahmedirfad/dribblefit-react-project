import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { useCart } from '../../Contexts/CartContext'
import api from '../../Api/Axios'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import WishlistButton from '../Common/WishlistButton'

function ProductsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])

  // Customization State
  const [customizeMode, setCustomizeMode] = useState(false)
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [selectedPatch, setSelectedPatch] = useState(null)
  const [customizationTotal, setCustomizationTotal] = useState(0)

  // Available patches based on product category/league
  const getAvailablePatches = () => {
    if (!product) return []

    const basePatches = []

    // Check for international kits
    if (product.category === 'international-kits') {
      basePatches.push({
        id: 'worldcup',
        name: 'World Cup',
        price: 399,
        image: '/images/patches/worldcup-badge.webp'
      })
    }

    // League-specific badges
    if (product.league) {
      const league = product.league.toLowerCase()

      if (league.includes('premier league') || league.includes('english')) {
        basePatches.push({
          id: 'premier-league',
          name: 'Premier League',
          price: 299,
          image: '/images/patches/premier-league-badge.webp'
        })
      } else if (league.includes('la liga') || league.includes('spanish')) {
        basePatches.push({
          id: 'la-liga',
          name: 'La Liga',
          price: 299,
          image: '/images/patches/la-liga-badge.avif'
        })
      } else if (league.includes('serie a') || league.includes('italian')) {
        basePatches.push({
          id: 'serie-a',
          name: 'Serie A',
          price: 299,
          image: '/images/patches/serie-a-badge.jpg'
        })
      } else if (league.includes('bundesliga') || league.includes('german')) {
        basePatches.push({
          id: 'bundesliga',
          name: 'Bundesliga',
          price: 299,
          image: '/images/patches/bundesliga-badge.webp'
        })
      } else if (league.includes('ligue 1') || league.includes('french')) {
        basePatches.push({
          id: 'ligue-1',
          name: 'Ligue 1',
          price: 299,
          image: '/images/patches/ligue-1-badge.jpg'
        })
      } else if (league.includes('eredivisie') || league.includes('dutch')) {
        basePatches.push({
          id: 'eredivisie',
          name: 'Eredivisie',
          price: 299,
          image: '/images/patches/eredivisie-badge.jpg'
        })
      }
    }

    // Champions League badge for all except international kits
    if (product.category !== 'international-kits') {
      basePatches.push({
        id: 'champions-league',
        name: 'Champions League',
        price: 299,
        image: '/images/patches/champions-league-badge.webp'
      })
    }

    return basePatches
  }

  useEffect(() => {
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      fetchRelatedProducts()
    }
  }, [product])

  // Calculate customization total
  useEffect(() => {
    let total = 0
    if (playerName.trim()) total += 299 // Name customization fee
    if (playerNumber.trim()) total += 299 // Number customization fee

    // Add selected patch cost
    if (selectedPatch) {
      const patch = getAvailablePatches().find(p => p.id === selectedPatch)
      if (patch) total += patch.price
    }

    setCustomizationTotal(total)
  }, [playerName, playerNumber, selectedPatch, product])

  const fetchProduct = async () => {
    try {
      const response = await api.get('/products')
      const foundProduct = response.data.find(p => p.id.toString() === id)

      if (foundProduct) {
        setProduct(foundProduct)
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
      } else {
        setProduct(null)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
      setProduct(null)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await api.get('/products')
      const related = response.data
        .filter(p => p.id.toString() !== id && p.category === product.category)
        .slice(0, 4)
      setRelatedProducts(related)
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${type === 'success' ? 'bg-[#00ff00] text-black' :
        type === 'error' ? 'bg-red-500 text-white' :
          'bg-yellow-500 text-black'
      }`
    notification.textContent = message
    document.body.appendChild(notification)

    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  const handlePatchSelect = (patchId) => {
    setSelectedPatch(patchId === selectedPatch ? null : patchId)
  }

  const handleCustomize = () => {
    setCustomizeMode(!customizeMode)
  }

  const handleResetCustomization = () => {
    setPlayerName('')
    setPlayerNumber('')
    setSelectedPatch(null)
  }

  const validateCustomization = () => {
    if (playerName.trim() && !/^[a-zA-Z\s]+$/.test(playerName.trim())) {
      showToast('Name can only contain letters and spaces', 'error')
      return false
    }

    if (playerNumber.trim() && !/^\d{1,2}$/.test(playerNumber.trim())) {
      showToast('Player number must be 1-2 digits (1-99)', 'error')
      return false
    }

    const num = parseInt(playerNumber)
    if (num && (num < 1 || num > 99)) {
      showToast('Player number must be between 1 and 99', 'error')
      return false
    }

    return true
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size', 'error')
      return
    }

    if (!product.inStock) {
      showToast(`Sorry! ${product.name} is out of stock`, 'error')
      return
    }

    if (customizeMode && !validateCustomization()) {
      return
    }

    const customizationData = customizeMode ? {
      playerName: playerName.trim(),
      playerNumber: playerNumber.trim(),
      patch: selectedPatch ? getAvailablePatches().find(p => p.id === selectedPatch) : null,
      customizationTotal
    } : null

    addToCart(product, selectedSize, quantity, customizationData)

    if (customizeMode) {
      showToast(`Added customized ${product.name} (${selectedSize}) to cart!`, 'success')
    } else {
      showToast(`Added ${product.name} (${selectedSize}) to cart!`, 'success')
    }
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size', 'error')
      return
    }

    if (!product.inStock) {
      showToast(`Sorry! ${product.name} is out of stock`, 'error')
      return
    }

    if (!isAuthenticated) {
      showToast('Please login to proceed with purchase', 'error')
      navigate('/login')
      return
    }

    if (customizeMode && !validateCustomization()) {
      return
    }

    const customizationData = customizeMode ? {
      playerName: playerName.trim(),
      playerNumber: playerNumber.trim(),
      patch: selectedPatch ? getAvailablePatches().find(p => p.id === selectedPatch) : null,
      customizationTotal
    } : null

    addToCart(product, selectedSize, quantity, customizationData)
    navigate('/cart')
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const getTotalPrice = () => {
    const basePrice = parseInt(product.price.replace(/[^0-9]/g, '')) || 0
    return basePrice + customizationTotal
  }

  const formatPrice = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`
  }

  const getSelectedPatchDetails = () => {
    if (!selectedPatch) return null
    return getAvailablePatches().find(p => p.id === selectedPatch)
  }

  // Fallback colors for when images fail to load
  const getFallbackColor = (patchId) => {
    const fallbackColors = {
      'worldcup': 'bg-gradient-to-br from-blue-600 to-green-600',
      'champions-league': 'bg-gradient-to-br from-blue-700 to-purple-700',
      'premier-league': 'bg-gradient-to-br from-red-600 to-purple-600',
      'la-liga': 'bg-gradient-to-br from-red-500 to-yellow-500',
      'serie-a': 'bg-gradient-to-br from-green-600 to-blue-600',
      'bundesliga': 'bg-gradient-to-br from-red-600 to-black',
      'ligue-1': 'bg-gradient-to-br from-blue-600 to-red-600',
      'eredivisie': 'bg-gradient-to-br from-orange-500 to-red-500'
    }
    return fallbackColors[patchId] || 'bg-gradient-to-br from-gray-700 to-gray-900'
  }

  const getPatchShortName = (patchName) => {
    const shortNames = {
      'World Cup Badge': 'WC',
      'Champions League Patch': 'UCL',
      'Premier League Badge': 'PL',
      'La Liga Badge': 'LL',
      'Serie A Badge': 'SA',
      'Bundesliga Badge': 'BL',
      'Ligue 1 Badge': 'L1',
      'Eredivisie Badge': 'ED'
    }
    return shortNames[patchName] || patchName.split(' ')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <div className="text-[#00ff00] text-lg">Loading product...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 text-center">
          <div className="text-white text-2xl mb-4">Product not found</div>
          <Link
            to="/products"
            className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  const availablePatches = getAvailablePatches()

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="pt-24 max-w-7xl mx-auto px-4">
        <div className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#00ff00] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#00ff00] transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 relative">
              <img
                src={`http://localhost:5173/${product?.image}`}
                alt={product?.name}
                className="w-full h-auto max-h-[500px] object-contain rounded-xl"
              />

              <div className="absolute top-4 right-4 z-20">
                <WishlistButton product={product} size="md" />
              </div>
            </div>

            {/* Customization Toggle */}
            <button
              onClick={handleCustomize}
              className={`w-full font-poppins font-bold py-4 rounded-xl transition-all duration-300 text-lg ${customizeMode
                  ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90'
                  : 'bg-gradient-to-r from-[#00ff00]/20 to-emerald-600/20 border border-[#00ff00]/30 text-white hover:bg-[#00ff00]/30'
                }`}
            >
              {customizeMode ? '✓ CUSTOMIZATION ACTIVE' : '🎨 CUSTOMIZE THIS JERSEY'}
            </button>

            {/* Customization Preview Box */}
            {customizeMode && (playerName.trim() || playerNumber.trim() || selectedPatch) && (
              <div className="bg-[#111111] border border-[#00ff00]/30 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold mb-4 text-lg">Customization Preview</h3>

                <div className="space-y-4">
                  {(playerName.trim() || playerNumber.trim()) && (
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <div className="text-gray-400 text-sm mb-2">Name & Number:</div>
                      <div className="flex items-center gap-4">
                        {playerName.trim() && (
                          <div className="text-white font-bold text-xl bg-black/30 px-3 py-2 rounded">
                            {playerName.trim().toUpperCase()}
                          </div>
                        )}
                        {playerNumber.trim() && (
                          <div className="text-white font-black text-3xl bg-black/30 px-4 py-2 rounded">
                            {playerNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedPatch && (
                    <div className="bg-[#1a1a1a] p-4 rounded-lg">
                      <div className="text-gray-400 text-sm mb-2">Selected Patch:</div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-20 bg-gray-900 border border-[#00ff00]/20 rounded-lg flex items-center justify-center overflow-hidden">
                          {getSelectedPatchDetails()?.image ? (
                            <img
                              src={getSelectedPatchDetails().image}
                              alt={getSelectedPatchDetails().name}
                              className="w-full h-full object-contain p-2"
                              onError={(e) => {
                                console.error(`Failed to load image: ${getSelectedPatchDetails().image}`)
                                const colorClass = getFallbackColor(selectedPatch)
                                const shortName = getPatchShortName(getSelectedPatchDetails().name)
                                e.target.parentElement.innerHTML = `
                                  <div class="w-full h-full rounded-lg ${colorClass} flex items-center justify-center">
                                    <div class="text-white text-sm font-bold text-center px-2">
                                      ${shortName}
                                    </div>
                                  </div>
                                `
                              }}
                            />
                          ) : (
                            <div className={`w-full h-full rounded-lg ${getFallbackColor(selectedPatch)} flex items-center justify-center`}>
                              <div className="text-white text-sm font-bold text-center px-2">
                                {getPatchShortName(getSelectedPatchDetails()?.name)}
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{getSelectedPatchDetails()?.name}</div>
                          <div className="text-[#00ff00] text-sm">+ ₹{getSelectedPatchDetails()?.price}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#00ff00] font-poppins font-bold text-2xl">
                    {customizeMode ? formatPrice(getTotalPrice()) : product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 text-lg line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-[#00ff00] text-black font-bold px-3 py-1 rounded text-sm">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>Team: {product.team}</span>
                  {product.league && <span>League: {product.league}</span>}
                  <span className={`flex items-center gap-1 ${product.inStock ? 'text-[#00ff00]' : 'text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-[#00ff00]' : 'bg-red-500'}`}></div>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="lg:hidden">
                <WishlistButton product={product} size="md" />
              </div>
            </div>

            {/* Customization Panel */}
            {customizeMode && (
              <div className="bg-[#111111] border border-[#00ff00]/30 rounded-2xl p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-white font-poppins font-semibold text-xl">🎨 Customize Your Jersey</h3>
                  <button
                    onClick={handleResetCustomization}
                    className="text-gray-400 hover:text-red-400 text-sm transition-colors"
                  >
                    Reset All
                  </button>
                </div>

                {/* Player Name & Number - WITH ICONS AND SAME SIZE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Player Name
                        <span className="text-[#00ff00] ml-1">(+ ₹299)</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))}
                        placeholder="Enter player name"
                        maxLength="15"
                        className="w-full bg-[#1a1a1a] border border-[#00ff00]/30 text-white px-4 pl-10 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-600 text-base"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Letters and spaces only</div>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Jersey Number
                        <span className="text-[#00ff00] ml-1">(+ ₹299)</span>
                      </div>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={playerNumber}
                        onChange={(e) => setPlayerNumber(e.target.value.replace(/\D/g, '').slice(0, 2))}
                        placeholder="Enter number"
                        className="w-full bg-[#1a1a1a] border border-[#00ff00]/30 text-white px-4 pl-10 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-600 text-center text-base"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Numbers 1-99 only</div>
                  </div>
                </div>

                {/* Patch Selection - Only if available */}
                {availablePatches.length > 0 && (
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Select One Patch/Badge (Optional)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availablePatches.map(patch => (
                        <button
                          key={patch.id}
                          onClick={() => handlePatchSelect(patch.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${selectedPatch === patch.id
                              ? 'border-[#00ff00] bg-[#00ff00]/10'
                              : 'border-[#00ff00]/30 hover:border-[#00ff00] hover:bg-[#00ff00]/5'
                            }`}
                        >
                          <div className="w-14 h-14 bg-gray-900 border border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                            {patch.image ? (
                              <img
                                src={patch.image}
                                alt={patch.name}
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  console.error(`Failed to load image: ${patch.image}`)
                                  const colorClass = getFallbackColor(patch.id)
                                  const shortName = getPatchShortName(patch.name)
                                  e.target.parentElement.innerHTML = `
                                    <div class="w-full h-full rounded-lg ${colorClass} flex items-center justify-center">
                                      <div class="text-white text-xs font-bold text-center px-1">
                                        ${shortName}
                                      </div>
                                    </div>
                                  `
                                }}
                              />
                            ) : (
                              <div className={`w-full h-full rounded-lg ${getFallbackColor(patch.id)} flex items-center justify-center`}>
                                <div className="text-white text-xs font-bold text-center px-1">
                                  {getPatchShortName(patch.name)}
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-white text-sm font-semibold truncate">{patch.name}</div>
                            <div className="text-[#00ff00] text-xs">+ ₹{patch.price}</div>
                          </div>
                          {selectedPatch === patch.id && (
                            <div className="w-6 h-6 rounded-full bg-[#00ff00] flex items-center justify-center">
                              <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Note: You can only select one patch/badge
                    </div>
                  </div>
                )}

                {/* Customization Summary */}
                <div className="bg-[#1a1a1a] border border-[#00ff00]/20 rounded-lg p-4">
                  <div className="space-y-2 mb-3">
                    {playerName.trim() && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Player Name:</span>
                        <span className="text-[#00ff00] text-sm">+ ₹299</span>
                      </div>
                    )}
                    {playerNumber.trim() && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Player Number:</span>
                        <span className="text-[#00ff00] text-sm">+ ₹299</span>
                      </div>
                    )}
                    {selectedPatch && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">{getSelectedPatchDetails()?.name}:</span>
                        <span className="text-[#00ff00] text-sm">+ ₹{getSelectedPatchDetails()?.price}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Base Price:</span>
                      <span className="text-white">{product.price}</span>
                    </div>
                    {customizationTotal > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Customization Total:</span>
                        <span className="text-[#00ff00]">+ ₹{customizationTotal}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-800">
                      <span className="text-white font-bold text-lg">Final Price:</span>
                      <span className="text-[#00ff00] font-bold text-xl">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
              <h3 className="text-white font-poppins font-semibold mb-3">Description</h3>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
              <h3 className="text-white font-poppins font-semibold mb-4">Select Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes && product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-poppins font-bold transition-all duration-300 ${selectedSize === size
                        ? 'border-[#00ff00] bg-[#00ff00] text-black shadow-lg shadow-[#00ff00]/30'
                        : 'border-[#00ff00]/30 text-white hover:border-[#00ff00] hover:bg-[#00ff00]/10'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-white font-poppins font-semibold">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-white font-poppins font-bold text-lg w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || !selectedSize}
                    className={`flex-1 font-poppins font-bold py-4 rounded-lg transition-all duration-300 text-sm ${product.inStock && selectedSize
                        ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                  >
                    {customizeMode ? 'ADD CUSTOMIZED TO CART' : 'ADD TO CART'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock || !selectedSize}
                    className={`flex-1 font-poppins font-bold py-4 rounded-lg transition-all duration-300 text-sm ${product.inStock && selectedSize
                        ? 'bg-transparent border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed border-gray-600'
                      }`}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                <div className="text-[#00ff00] font-poppins font-bold text-sm mb-1">Free Shipping</div>
                <div className="text-gray-400 text-xs">On orders over ₹5,000</div>
              </div>
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                <div className="text-[#00ff00] font-poppins font-bold text-sm mb-1">30-Day Returns</div>
                <div className="text-gray-400 text-xs">Easy return policy</div>
              </div>
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                <div className="text-[#00ff00] font-poppins font-bold text-sm mb-1">Authentic</div>
                <div className="text-gray-400 text-xs">100% genuine products</div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white font-poppins mb-8 text-center">
              RELATED <span className="text-[#00ff00]">PRODUCTS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-4 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 group"
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-[#1a1a1a]">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute top-2 right-2 z-10">
                      <WishlistButton product={relatedProduct} size="sm" />
                    </div>
                  </div>
                  <h3 className="text-white font-poppins font-semibold text-sm mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#00ff00] font-poppins font-bold">
                      {relatedProduct.price}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {relatedProduct.team}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProductsDetail