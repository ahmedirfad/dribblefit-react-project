import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { useCart } from '../../Contexts/CartContext'
import { useWishlist } from '../../Contexts/WishlistContext'
import api from '../../Api/Axios.jsx'

function Navbar() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products for search:', error)
    }
  }

  const categories = [
    '2025-26-season-kits',
    'international-kits',
    'retro-jerseys',
    'anthem-jackets'
  ]

  const getCategoryDisplayName = (category) => {
    const names = {
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits', 
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 
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

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.team?.toLowerCase().includes(value.toLowerCase()) ||
        product.league?.toLowerCase().includes(value.toLowerCase()) ||
        product.category?.toLowerCase().includes(value.toLowerCase())
      )
      
      setSearchResults(filtered.slice(0, 5))
      setShowResults(true)
      setLoading(false)
    }, 300)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setShowResults(false)
      setIsSearchOpen(false)
    }
  }

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`)
    setSearchTerm('')
    setShowResults(false)
    setIsSearchOpen(false)
  }

  const handleViewAllResults = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setShowResults(false)
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    showToast('Logged out successfully!', 'success')
    logout()
    setIsMenuOpen(false)
    setShowProfileDropdown(false)
  }

  const goToAdminPanel = () => {
    navigate('/admin')
    setShowProfileDropdown(false)
  }

  return (
    <>
      <nav className="bg-[#0a0a0a] border-b border-[#00ff00]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-6">
              <Link to="/home" className="flex-shrink-0">
                <img 
                  src="/src/assets/DRIBBLEFIT.PNG" 
                  alt="DRIBBLEFIT" 
                  className="h-8"
                />
              </Link>

              <div className="hidden md:block relative">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => searchTerm.trim() && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    placeholder="Search jerseys..."
                    className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-64 text-sm placeholder-gray-500"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-500 hover:text-[#00ff00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  
                  {showResults && searchTerm.trim() && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-2">
                        {loading ? (
                          <div className="p-4 text-center">
                            <div className="text-[#00ff00]">Searching...</div>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <>
                            {searchResults.map((product) => (
                              <div
                                key={product.id}
                                onClick={() => handleResultClick(product.id)}
                                className="flex items-center gap-3 p-3 hover:bg-[#00ff00]/10 rounded-lg cursor-pointer transition-colors group"
                              >
                                <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-white text-sm font-poppins font-semibold truncate group-hover:text-[#00ff00] transition-colors">
                                    {product.name}
                                  </div>
                                  <div className="text-gray-400 text-xs flex items-center gap-2">
                                    <span>{product.team}</span>
                                    {product.league && <span>• {product.league}</span>}
                                  </div>
                                  <div className="text-[#00ff00] font-poppins font-bold text-sm mt-1">
                                    {product.price}
                                  </div>
                                </div>
                                <div className="text-gray-400 group-hover:text-[#00ff00] transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            ))}
                            <div className="mt-2 pt-2 border-t border-gray-800">
                              <button
                                onClick={handleViewAllResults}
                                className="w-full text-center text-[#00ff00] font-poppins font-semibold text-sm py-2 hover:bg-[#00ff00]/10 rounded-lg transition-colors"
                              >
                                View all results for "{searchTerm}"
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 text-center">
                            <div className="text-gray-400">No results found for "{searchTerm}"</div>
                            <div className="text-gray-500 text-xs mt-1">Try different keywords</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/home" className="text-white hover:text-[#00ff00] transition-colors font-medium">
                Home
              </Link>
              <div className="relative group">
                <button className="text-white hover:text-[#00ff00] transition-colors font-medium flex items-center gap-1">
                  Categories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link 
                        key={category}
                        to={`/products?category=${category}`}
                        className="block px-4 py-2 text-white hover:bg-[#00ff00] hover:text-black transition-colors"
                      >
                        {getCategoryDisplayName(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/products" className="text-white hover:text-[#00ff00] transition-colors font-medium">
                Products
              </Link>
              <Link to="/contact" className="text-white hover:text-[#00ff00] transition-colors font-medium">
                Contact Us
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setShowResults(false)
                }}
                className="md:hidden text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {isAuthenticated && user && (
                <div className="hidden sm:block text-sm text-gray-300">
                  Welcome, <span className="text-[#00ff00] font-medium">{user.username}</span>
                </div>
              )}

              <Link to="/wishlist" className="relative text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-gray-400 hover:text-[#00ff00] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00ff00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 text-white hover:text-[#00ff00] transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center font-bold text-black">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* UPDATED PROFILE DROPDOWN - ADMIN PANEL AT BOTTOM */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl z-50 animate-fade-in overflow-hidden">
                      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center font-bold text-black text-xl">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-poppins font-semibold text-lg truncate">
                              {user.username}
                            </div>
                            <div className="text-gray-400 text-sm truncate">{user.email}</div>
                            {isAdmin && (
                              <div className="mt-1">
                                <span className="bg-gradient-to-r from-[#00ff00] to-emerald-600 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                  ADMIN
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Member since: {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="py-2">
                        {/* Regular Account Links */}
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#00ff00]/10 hover:text-[#00ff00] transition-colors duration-200 border-b border-gray-800/50"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">My Profile</div>
                            <div className="text-xs text-gray-500">View & edit profile</div>
                          </div>
                        </Link>
                        
                        <Link
                          to="/address"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#00ff00]/10 hover:text-[#00ff00] transition-colors duration-200 border-b border-gray-800/50"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">My Addresses</div>
                            <div className="text-xs text-gray-500">Manage shipping addresses</div>
                          </div>
                        </Link>
                        
                        <Link
                          to="/orders"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#00ff00]/10 hover:text-[#00ff00] transition-colors duration-200 border-b border-gray-800/50"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">My Orders</div>
                            <div className="text-xs text-gray-500">View order history</div>
                          </div>
                        </Link>
                        
                        {/* ADMIN PANEL - Added as separate section */}
                        {isAdmin && (
                          <div className="border-t border-gray-800/50 pt-2">
                            <button
                              onClick={goToAdminPanel}
                              className="w-full flex items-center gap-3 px-4 py-3 text-[#00ff00] hover:bg-[#00ff00]/10 transition-colors duration-200"
                            >
                              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <div className="flex-1 text-left">
                                <div className="font-medium">Admin Panel</div>
                                <div className="text-xs text-[#00ff00]/70">Manage your store</div>
                              </div>
                            </button>
                          </div>
                        )}
                        
                        {/* Logout - Bottom of dropdown */}
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200 border-t border-gray-800/50 mt-2"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <div className="flex-1 text-left">
                            <div className="font-medium">Logout</div>
                            <div className="text-xs text-red-400/70">Sign out of your account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#00ff00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00ff00]/90 transition-colors text-sm"
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="md:hidden pb-4 relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => searchTerm.trim() && setShowResults(true)}
                  placeholder="Search jerseys..."
                  className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-full text-sm placeholder-gray-500"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-500 hover:text-[#00ff00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              
              {showResults && searchTerm.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {loading ? (
                      <div className="p-4 text-center">
                        <div className="text-[#00ff00]">Searching...</div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleResultClick(product.id)}
                            className="flex items-center gap-3 p-3 hover:bg-[#00ff00]/10 rounded-lg cursor-pointer transition-colors group"
                          >
                            <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm font-poppins font-semibold truncate group-hover:text-[#00ff00] transition-colors">
                                {product.name}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {product.team}
                              </div>
                              <div className="text-[#00ff00] font-poppins font-bold text-sm mt-1">
                                {product.price}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-800">
                          <button
                            onClick={handleViewAllResults}
                            className="w-full text-center text-[#00ff00] font-poppins font-semibold text-sm py-2 hover:bg-[#00ff00]/10 rounded-lg transition-colors"
                          >
                            View all results for "{searchTerm}"
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="text-gray-400">No results found for "{searchTerm}"</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <Link to="/home" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link 
                    key={category}
                    to={`/products?category=${category}`}
                    className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getCategoryDisplayName(category)}
                  </Link>
                ))}
              </div>
              <Link to="/contact" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
              
              <Link to="/cart" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link to="/wishlist" className="block text-white hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              
              {/* UPDATED MOBILE MENU */}
              {isAuthenticated && user && (
                <>
                  <div className="pt-4 border-t border-gray-800 text-sm text-gray-300">
                    Welcome, <span className="text-[#00ff00] font-medium">{user.username}</span>
                    {isAdmin && (
                      <span className="ml-2 bg-gradient-to-r from-[#00ff00] to-emerald-600 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                        ADMIN
                      </span>
                    )}
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <div className="text-sm text-gray-500 mb-2">MY ACCOUNT</div>
                    <Link 
                      to="/profile" 
                      className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/address" 
                      className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Addresses
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    
                    {/* ADMIN PANEL IN MOBILE MENU */}
                    {isAdmin && (
                      <button
                        onClick={() => {
                          goToAdminPanel()
                          setIsMenuOpen(false)
                        }}
                        className="block w-full text-left mt-4 bg-gradient-to-r from-[#00ff00]/20 to-emerald-600/20 border border-[#00ff00]/30 text-[#00ff00] px-4 py-3 rounded-lg hover:bg-[#00ff00]/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div>
                            <div className="font-medium">Admin Panel</div>
                            <div className="text-xs text-[#00ff00]/70">Manage your store</div>
                          </div>
                        </div>
                      </button>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      className="block text-red-400 hover:text-red-300 transition-colors text-sm pl-4 mt-4"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  )
}

export default Navbar