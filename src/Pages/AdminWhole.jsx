AuthContext 

// src/Contexts/AuthContext.jsx (FINAL VERSION)
import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true) 
  const [isAdmin, setIsAdmin] = useState(false)

  // Helper function to check if user is admin
  const checkIsAdmin = (userData) => {
    return userData?.role === 'admin'
  }

  // checking existing user in localstorage
  useEffect(() => {
    const savedUser = localStorage.getItem('dribblefit_user')
    const savedAuth = localStorage.getItem('dribblefit_isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
        
        // Set admin status
        const userIsAdmin = checkIsAdmin(userData)
        setIsAdmin(userIsAdmin)
        localStorage.setItem('dribblefit_isAdmin', userIsAdmin.toString())
        
        localStorage.setItem('currentUserId', userData.id)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        clearAuthData()
      }
    }
    setInitialLoading(false)
  }, [])

  // Helper function to clear auth data
  const clearAuthData = () => {
    localStorage.removeItem('dribblefit_user')
    localStorage.removeItem('dribblefit_isAuthenticated')
    localStorage.removeItem('dribblefit_isAdmin')
    localStorage.removeItem('currentUserId')
  }

  const register = async (userData) => {
    setLoading(true)
    try {
      // checking if user already exists
      const checkUser = await api.get('/users', {
        params: { email: userData.email }
      })
      
      if (checkUser.data.length > 0) {
        return { success: false, error: 'User already exists with this email' }
      }

      // creates new user with complete structure
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        role: 'user', // Default role is user
        cart: [],
        addresses: [],
        orders: [],
        phone: '',
        fullName: '',
        dateOfBirth: '',
        createdAt: new Date().toISOString()
      }

      // saves to db
      const response = await api.post('/users', newUser)
      
      // auto-login
      const userIsAdmin = checkIsAdmin(response.data)
      setUser(response.data)
      setIsAuthenticated(true)
      setIsAdmin(userIsAdmin)
      
      // saves to ls
      localStorage.setItem('dribblefit_user', JSON.stringify(response.data))
      localStorage.setItem('dribblefit_isAuthenticated', 'true')
      localStorage.setItem('dribblefit_isAdmin', userIsAdmin.toString())
      localStorage.setItem('currentUserId', response.data.id)
      
      return { 
        success: true, 
        user: response.data,
        isAdmin: userIsAdmin 
      }
      
    } catch (error) {
      return { success: false, error: 'Registration failed' }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      // finding user in db.json
      const response = await api.get('/users', {
        params: { email, password }
      })
      
      if (response.data.length === 0) {
        return { success: false, error: 'Invalid email or password' }
      }

      let user = response.data[0]
      
      // Ensure user has required fields
      if (!user.role) user.role = 'user'
      if (!user.addresses) user.addresses = []
      if (!user.orders) user.orders = []
      if (!user.phone) user.phone = ''
      if (!user.fullName) user.fullName = ''
      if (!user.dateOfBirth) user.dateOfBirth = ''
      
      const userIsAdmin = checkIsAdmin(user)
      setUser(user)
      setIsAuthenticated(true)
      setIsAdmin(userIsAdmin)
      
      localStorage.setItem('dribblefit_user', JSON.stringify(user))
      localStorage.setItem('dribblefit_isAuthenticated', 'true')
      localStorage.setItem('dribblefit_isAdmin', userIsAdmin.toString())
      localStorage.setItem('currentUserId', user.id)
      
      return { 
        success: true, 
        user,
        isAdmin: userIsAdmin 
      }
      
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    clearAuthData()
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  const updateUser = async (updatedData) => {
    setLoading(true);
    try {
      if (!user) {
        return { success: false, error: 'No user found' };
      }

      // Update in database
      const response = await api.patch(`/users/${user.id}`, updatedData);
      
      // Update local state
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      
      // Update admin status if role changed
      if (updatedData.role !== undefined) {
        const userIsAdmin = checkIsAdmin(updatedUser)
        setIsAdmin(userIsAdmin)
        localStorage.setItem('dribblefit_isAdmin', userIsAdmin.toString())
      }
      
      // Update localStorage
      localStorage.setItem('dribblefit_user', JSON.stringify(updatedUser));
      
      return { 
        success: true, 
        user: updatedUser,
        isAdmin: checkIsAdmin(updatedUser)
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return { success: false, error: 'Failed to update profile' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isAdmin,
      loading,
      initialLoading, 
      register,
      login,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}


AdminRoute (src/Components/Common/)

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#00ff00]">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute


AdminLayout (src/Admin/Components/)

import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  // Check if user is admin
  const isAdmin = user?.email === 'admin@dribblefit.com' || user?.role === 'admin'

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isAdmin) {
      navigate('/home')
    }
  }, [isAdmin, navigate])

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#00ff00] text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-4">Admin Access Required</h2>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    )
  }

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      title: 'User Management',
      path: '/admin/users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.354a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Product Management',
      path: '/admin/products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: 'Order Management',
      path: '/admin/orders',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      title: 'Back to Store',
      path: '/home',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      )
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#111111] border-r border-[#00ff00]/20 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#00ff00]/10">
            <Link to="/admin" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">DF</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DRIBBLEFIT</h1>
                <p className="text-[#00ff00] text-xs font-semibold">ADMIN PANEL</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${location.pathname === item.path || 
                    (item.path !== '/home' && location.pathname.startsWith(item.path))
                    ? 'bg-[#00ff00] text-black font-semibold'
                    : 'text-gray-300 hover:bg-[#00ff00]/10 hover:text-white'
                  }
                `}
                onClick={() => isMobile && setSidebarOpen(false)}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                <span className="text-sm">{item.title}</span>
              </Link>
            ))}
          </nav>

          {/* Admin Info */}
          <div className="p-4 border-t border-[#00ff00]/10">
            <div className="flex items-center space-x-3 px-4 py-3 bg-[#1a1a1a] rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold">{user?.username?.charAt(0).toUpperCase() || 'A'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{user?.username || 'Admin'}</p>
                <p className="text-gray-400 text-xs truncate">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`lg:pl-64 transition-all duration-300 ${sidebarOpen ? '' : ''}`}>
        {/* Topbar */}
        <header className="bg-[#111111] border-b border-[#00ff00]/20 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-400 hover:text-[#00ff00]"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-bold text-white">
                {menuItems.find(item => 
                  location.pathname === item.path || 
                  (item.path !== '/home' && location.pathname.startsWith(item.path))
                )?.title || 'Dashboard'}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-400 hover:text-[#00ff00]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-400 hover:text-[#00ff00]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

Dashboard (src/Admin/Pages/)

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../Api/Axios'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0,
    outOfStock: 0
  })
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch users
      const usersRes = await api.get('/users')
      const users = usersRes.data || []
      
      // Fetch products
      const productsRes = await api.get('/products')
      const products = productsRes.data || []
      
      // Calculate orders from all users
      const allOrders = users.reduce((acc, user) => {
        return [...acc, ...(user.orders || [])]
      }, [])
      
      // Calculate revenue
      const revenue = allOrders.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0)
      
      // Calculate pending orders
      const pendingOrders = allOrders.filter(order => order.status === 'Processing').length
      
      // Calculate out of stock products
      const outOfStock = products.filter(product => !product.inStock).length
      
      // Get recent orders
      const sortedOrders = [...allOrders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
      
      // Get top products
      const productSales = {}
      allOrders.forEach(order => {
        order.items?.forEach(item => {
          productSales[item.id] = (productSales[item.id] || 0) + (item.quantity || 1)
        })
      })
      
      const topProductsList = Object.entries(productSales)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([id, sales]) => {
          const product = products.find(p => p.id === id)
          return product ? { ...product, sales } : null
        })
        .filter(Boolean)

      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: allOrders.length,
        revenue: revenue,
        pendingOrders: pendingOrders,
        outOfStock: outOfStock
      })
      
      setRecentOrders(sortedOrders)
      setTopProducts(topProductsList)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      color: 'from-blue-500/20 to-blue-600/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: '⚽',
      color: 'from-green-500/20 to-emerald-600/20',
      textColor: 'text-green-400'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: '📦',
      color: 'from-purple-500/20 to-purple-600/20',
      textColor: 'text-purple-400'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: '💰',
      color: 'from-yellow-500/20 to-yellow-600/20',
      textColor: 'text-yellow-400'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: '⏳',
      color: 'from-orange-500/20 to-orange-600/20',
      textColor: 'text-orange-400'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: '⚠️',
      color: 'from-red-500/20 to-red-600/20',
      textColor: 'text-red-400'
    }
  ]

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-green-500/20 text-green-400'
      case 'shipped': return 'bg-blue-500/20 text-blue-400'
      case 'processing': return 'bg-yellow-500/20 text-yellow-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Welcome back, Admin!</h1>
            <p className="text-gray-400">Here's what's happening with your store today.</p>
          </div>
          <div className="text-4xl">👋</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-br ${stat.color} border border-white/5 rounded-xl p-6 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className={`text-2xl font-bold mt-2 ${stat.textColor}`}>{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Recent Orders</h3>
            <Link to="/admin/orders" className="text-[#00ff00] text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-[#1a1a1a] rounded-lg">
                  <div>
                    <p className="text-white font-medium">#{order.orderNumber}</p>
                    <p className="text-gray-400 text-sm">{order.username}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#00ff00] font-bold">₹{parseFloat(order.total).toFixed(2)}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No orders yet</div>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Top Selling Products</h3>
            <Link to="/admin/products" className="text-[#00ff00] text-sm hover:underline">
              View All
            </Link>
          </div>
          
          <div className="space-y-4">
            {topProducts.length > 0 ? (
              topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-[#1a1a1a] rounded-lg">
                  <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm line-clamp-1">{product.name}</p>
                    <p className="text-gray-400 text-xs">{product.team}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#00ff00] font-bold">{product.price}</p>
                    <p className="text-gray-400 text-xs">{product.sales} sold</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">No sales data yet</div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products/new"
            className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-lg p-4 text-center hover:bg-[#00ff00]/20 transition-colors"
          >
            <div className="text-2xl mb-2">➕</div>
            <p className="text-white font-medium">Add New Product</p>
            <p className="text-gray-400 text-sm">Add a new football jersey</p>
          </Link>
          
          <Link
            to="/admin/orders?filter=pending"
            className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-4 text-center hover:bg-yellow-500/20 transition-colors"
          >
            <div className="text-2xl mb-2">⏳</div>
            <p className="text-white font-medium">Process Orders</p>
            <p className="text-gray-400 text-sm">{stats.pendingOrders} pending</p>
          </Link>
          
          <Link
            to="/admin/products?filter=outofstock"
            className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-4 text-center hover:bg-red-500/20 transition-colors"
          >
            <div className="text-2xl mb-2">⚠️</div>
            <p className="text-white font-medium">Restock Products</p>
            <p className="text-gray-400 text-sm">{stats.outOfStock} out of stock</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

OrderManagement (src/Admin/Pages/)

import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, selectedStatus])

  const fetchData = async () => {
    try {
      // Fetch users to get their orders
      const usersRes = await api.get('/users')
      setUsers(usersRes.data || [])
      
      // Extract all orders from users
      const allOrders = usersRes.data.reduce((acc, user) => {
        return [...acc, ...(user.orders || []).map(order => ({
          ...order,
          userDetails: {
            username: user.username,
            email: user.email,
            phone: user.phone
          }
        }))]
      }, [])
      
      // Sort by date (newest first)
      const sortedOrders = allOrders.sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      )
      
      setOrders(sortedOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = [...orders]

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus)
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(order =>
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userDetails?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.userDetails?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredOrders(filtered)
  }

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      // Find the user who owns this order
      const user = users.find(u => 
        u.orders?.some(o => o.id === orderId)
      )
      
      if (!user) {
        alert('User not found for this order')
        return
      }

      // Update order status in user's orders
      const updatedOrders = user.orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )

      // Update user in database
      await api.patch(`/users/${user.id}`, {
        orders: updatedOrders
      })

      // Update local state
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ))

      alert(`Order status updated to ${newStatus}`)
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Failed to update order status')
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return
    }

    try {
      // Find the user who owns this order
      const user = users.find(u => 
        u.orders?.some(o => o.id === orderId)
      )
      
      if (!user) {
        alert('User not found for this order')
        return
      }

      // Remove order from user's orders
      const updatedOrders = user.orders.filter(order => order.id !== orderId)

      // Update user in database
      await api.patch(`/users/${user.id}`, {
        orders: updatedOrders
      })

      // Update local state
      setOrders(orders.filter(order => order.id !== orderId))

      alert('Order deleted successfully')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ]

  const statusUpdateOptions = [
    { value: 'Processing', label: 'Processing', color: 'yellow' },
    { value: 'Shipped', label: 'Shipped', color: 'blue' },
    { value: 'Delivered', label: 'Delivered', color: 'green' },
    { value: 'Cancelled', label: 'Cancelled', color: 'red' }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading orders...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <p className="text-gray-400">Manage and track customer orders</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-full md:w-64 text-sm"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <button
          onClick={() => {
            setSearchTerm('')
            setSelectedStatus('all')
          }}
          className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-white">{orders.length}</p>
        </div>
        <div className="bg-[#111111] border border-yellow-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Processing</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter(o => o.status === 'Processing').length}
          </p>
        </div>
        <div className="bg-[#111111] border border-blue-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Shipped</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter(o => o.status === 'Shipped').length}
          </p>
        </div>
        <div className="bg-[#111111] border border-green-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Delivered</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter(o => o.status === 'Delivered').length}
          </p>
        </div>
        <div className="bg-[#111111] border border-red-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Cancelled</p>
          <p className="text-2xl font-bold text-white">
            {orders.filter(o => o.status === 'Cancelled').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="text-left p-4 text-gray-400 text-sm font-medium">ORDER</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">CUSTOMER</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">DATE</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">ITEMS</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">TOTAL</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">STATUS</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-800 hover:bg-[#1a1a1a]/50">
                    <td className="p-4">
                      <p className="text-white font-medium">#{order.orderNumber}</p>
                      <p className="text-gray-400 text-sm">Tracking: {order.trackingNumber}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{order.userDetails?.username}</p>
                      <p className="text-gray-400 text-sm">{order.userDetails?.email}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{formatDate(order.date)}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{order.items?.length || 0} items</p>
                    </td>
                    <td className="p-4">
                      <p className="text-[#00ff00] font-bold">₹{parseFloat(order.total).toFixed(2)}</p>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(order.status)} bg-transparent`}
                      >
                        {statusUpdateOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">
                    {searchTerm || selectedStatus !== 'all' 
                      ? 'No orders found matching your criteria' 
                      : 'No orders available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Order Details</h3>
                  <p className="text-gray-400">#{selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Summary */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Items */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {selectedOrder.items?.map((item, index) => (
                        <div key={index} className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{item.name}</p>
                            <p className="text-gray-400 text-sm">
                              Size: {item.size} • Qty: {item.quantity} • {item.team}
                            </p>
                            <p className="text-[#00ff00] font-bold">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Shipping Address</h4>
                    <div className="space-y-2">
                      <p className="text-white font-medium">{selectedOrder.shippingAddress?.name}</p>
                      <p className="text-gray-400">{selectedOrder.shippingAddress?.address}</p>
                      <p className="text-gray-400">
                        {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                      </p>
                      <p className="text-gray-400">📞 {selectedOrder.shippingAddress?.phone}</p>
                      {selectedOrder.shippingAddress?.landmark && (
                        <p className="text-gray-400">📍 {selectedOrder.shippingAddress?.landmark}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Order Info */}
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Customer Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-400 text-sm">Name</p>
                        <p className="text-white">{selectedOrder.userDetails?.username}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{selectedOrder.userDetails?.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white">{selectedOrder.userDetails?.phone || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Payment Information</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-gray-400 text-sm">Payment Method</p>
                        <p className="text-white capitalize">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Order Date</p>
                        <p className="text-white">{formatDate(selectedOrder.date)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Tracking Number</p>
                        <p className="text-[#00ff00] font-mono">{selectedOrder.trackingNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="bg-gradient-to-br from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span className="text-white">₹{parseFloat(selectedOrder.subtotal).toFixed(2)}</span>
                      </div>
                      {selectedOrder.couponApplied && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Coupon ({selectedOrder.couponApplied})</span>
                          <span className="text-[#00ff00]">-₹{parseFloat(selectedOrder.couponDiscount).toFixed(2)}</span>
                        </div>
                      )}
                      {selectedOrder.codCharges > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">COD Charges</span>
                          <span className="text-yellow-400">+₹{selectedOrder.codCharges.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-white font-bold">Total</span>
                          <span className="text-[#00ff00] font-bold text-lg">
                            ₹{parseFloat(selectedOrder.total).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Update Status</h4>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => {
                        handleUpdateStatus(selectedOrder.id, e.target.value)
                        setSelectedOrder({...selectedOrder, status: e.target.value})
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedOrder.status)} bg-transparent`}
                    >
                      {statusUpdateOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement

ProductManagement (src/Admin/Pages/)

import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'

const ProductManagement = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    discount: '',
    image: '',
    category: '2025-26-season-kits',
    team: '',
    league: '',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false
  })
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory])

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/150?text=No+Image'
    
    // If it's already a full URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }
    
    // If it's a local path starting with / or ./
    if (imagePath.startsWith('/') || imagePath.startsWith('./')) {
      return `http://localhost:5173${imagePath.startsWith('/') ? imagePath : imagePath.substring(1)}`
    }
    
    return imagePath
  }

  // Update image preview when form image changes
  useEffect(() => {
    if (formData.image) {
      setImagePreview(getImageUrl(formData.image))
    } else {
      setImagePreview('')
    }
  }, [formData.image])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      
      // Log the response to debug
      console.log('Products API Response:', response)
      
      // Handle different response structures
      const productsData = response.data || response || []
      
      if (Array.isArray(productsData)) {
        setProducts(productsData)
      } else if (productsData.products) {
        setProducts(productsData.products)
      } else if (productsData.data) {
        setProducts(productsData.data)
      } else {
        console.error('Unexpected products response structure:', productsData)
        setProducts([])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // Show error to user
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Failed to load products. Check console.'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = [...products]

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        (product.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
        (product.team?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
      )
    }

    setFilteredProducts(filtered)
    console.log('Filtered products:', filtered.length, 'from total:', products.length)
  }

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      await api.delete(`/products/${productId}`)
      setProducts(products.filter(product => product.id !== productId))

      // Show success notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Product deleted successfully!'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    } catch (error) {
      console.error('Error deleting product:', error)

      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Failed to delete product'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  const handleEditProduct = (product) => {
    console.log('Editing product:', product)
    setEditingProduct(product)
    setFormData({
      name: product.name || '',
      price: product.price ? product.price.replace('₹', '').replace(/,/g, '') : '',
      originalPrice: product.originalPrice ? product.originalPrice.replace('₹', '').replace(/,/g, '') : '',
      discount: product.discount ? product.discount.replace('% OFF', '') : '',
      image: product.image || '',
      category: product.category || '2025-26-season-kits',
      team: product.team || '',
      league: product.league || '',
      description: product.description || '',
      sizes: product.sizes || ['S', 'M', 'L', 'XL'],
      inStock: product.inStock !== undefined ? product.inStock : true,
      featured: product.featured || false
    })
    setShowModal(true)
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      discount: '',
      image: '',
      category: '2025-26-season-kits',
      team: '',
      league: '',
      description: '',
      sizes: ['S', 'M', 'L', 'XL'],
      inStock: true,
      featured: false
    })
    setImagePreview('')
    setShowModal(true)
  }

  const handleImageChange = (e) => {
    const value = e.target.value
    // Normalize backslashes to forward slashes
    const normalizedValue = value.replace(/\\/g, '/')
    setFormData({ ...formData, image: normalizedValue })
  }

  const isValidImageUrl = (url) => {
    if (!url) return true // Allow empty for preview purposes
    
    // Accept any string as valid - let the browser handle invalid URLs
    // We'll use onError handlers to show fallback images
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim()) {
      alert('Product name is required')
      return
    }

    if (!formData.price) {
      alert('Price is required')
      return
    }

    if (!formData.image.trim()) {
      alert('Image URL is required')
      return
    }

    try {
      const productData = {
        ...formData,
        price: `₹${parseInt(formData.price || 0).toLocaleString('en-IN')}`,
        originalPrice: formData.originalPrice ? `₹${parseInt(formData.originalPrice).toLocaleString('en-IN')}` : undefined,
        discount: formData.discount ? `${formData.discount}% OFF` : undefined
      }

      if (editingProduct) {
        // Update existing product
        await api.patch(`/products/${editingProduct.id}`, productData)
        setProducts(products.map(p =>
          p.id === editingProduct.id ? { ...p, ...productData } : p
        ))

        // Show success notification
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
        notification.textContent = 'Product updated successfully!'
        document.body.appendChild(notification)
        setTimeout(() => notification.remove(), 3000)
      } else {
        // Create new product
        const newProduct = {
          ...productData,
          id: Date.now().toString()
        }
        await api.post('/products', newProduct)
        setProducts([...products, newProduct])

        // Show success notification
        const notification = document.createElement('div')
        notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
        notification.textContent = 'Product added successfully!'
        document.body.appendChild(notification)
        setTimeout(() => notification.remove(), 3000)
      }

      setShowModal(false)
    } catch (error) {
      console.error('Error saving product:', error)

      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Failed to save product'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 3000)
    }
  }

  const categories = [
    'all',
    '2025-26-season-kits',
    'international-kits',
    'retro-jerseys',
    'anthem-jackets'
  ]

  const getCategoryDisplayName = (category) => {
    const names = {
      'all': 'All Categories',
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits',
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading products...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4">
      {/* Debug info - remove in production */}
      <div className="bg-yellow-500/20 border border-yellow-500/50 p-3 rounded-lg">
        <p className="text-yellow-400 text-sm">
          Debug: {products.length} total products, {filteredProducts.length} filtered
        </p>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Management</h1>
          <p className="text-gray-400">Manage your football jersey inventory</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-full md:w-64 text-sm"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={handleAddProduct}
            className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {getCategoryDisplayName(category)}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearchTerm('')
            setSelectedCategory('all')
          }}
          className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Products</p>
          <p className="text-2xl font-bold text-white">{products.length}</p>
        </div>
        <div className="bg-[#111111] border border-green-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">In Stock</p>
          <p className="text-2xl font-bold text-white">
            {products.filter(p => p.inStock).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-red-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Out of Stock</p>
          <p className="text-2xl font-bold text-white">
            {products.filter(p => !p.inStock).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-yellow-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Featured</p>
          <p className="text-2xl font-bold text-white">
            {products.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden hover:border-[#00ff00]/40 transition-colors"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-[#1a1a1a] overflow-hidden">
                <img
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', product.image)
                    e.target.src = 'https://via.placeholder.com/300x400?text=Image+Not+Found'
                  }}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  {product.featured && (
                    <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                      FEATURED
                    </span>
                  )}
                  {!product.inStock && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      OUT OF STOCK
                    </span>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                  {product.name || 'Unnamed Product'}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#00ff00] font-bold">
                    {product.price || '₹0'}
                  </span>
                  {product.discount && (
                    <span className="bg-[#00ff00] text-black text-xs font-bold px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  )}
                </div>

                <div className="text-gray-400 text-sm mb-4">
                  <p>
                    {product.team || 'No team'} 
                    {product.league && ` • ${product.league}`}
                  </p>
                  <p className="mt-1">
                    Sizes: {product.sizes?.join(', ') || 'N/A'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-400 border border-dashed border-gray-700 rounded-xl">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            {searchTerm || selectedCategory !== 'all'
              ? `No products found matching "${searchTerm}" in ${getCategoryDisplayName(selectedCategory)}`
              : 'No products available. Click "Add Product" to create your first product.'}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-2">Image Preview:</p>
                    <div className="w-32 h-32 bg-[#1a1a1a] rounded-lg overflow-hidden mx-auto">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL'
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      min="0"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      min="0"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Discount (%)</label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      min="0"
                      max="100"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    >
                      <option value="2025-26-season-kits">2025/26 Season Kits</option>
                      <option value="international-kits">International Kits</option>
                      <option value="retro-jerseys">Retro Jerseys</option>
                      <option value="anthem-jackets">Anthem Jackets</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Team *</label>
                    <input
                      type="text"
                      value={formData.team}
                      onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                      required
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">League</label>
                    <input
                      type="text"
                      value={formData.league}
                      onChange={(e) => setFormData({ ...formData, league: e.target.value })}
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Image URL *</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={handleImageChange}
                      required
                      placeholder="Paste URL or enter local path like /images/..."
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    />
                    <p className="text-gray-500 text-xs mt-1">
                      Supports: Local paths (/images/...) or URLs (https://...)
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Sizes *</label>
                  <div className="flex flex-wrap gap-2">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          const newSizes = formData.sizes.includes(size)
                            ? formData.sizes.filter(s => s !== size)
                            : [...formData.sizes, size]
                          setFormData({ ...formData, sizes: newSizes.sort() })
                        }}
                        className={`px-3 py-1 rounded-lg transition-colors ${formData.sizes.includes(size)
                            ? 'bg-[#00ff00] text-black'
                            : 'bg-[#1a1a1a] text-gray-400 border border-gray-700'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows="4"
                    className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4 text-[#00ff00] bg-[#1a1a1a] border-gray-700 rounded focus:ring-[#00ff00] focus:ring-2"
                      />
                      <span className="text-gray-400 text-sm">In Stock</span>
                    </label>

                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-[#00ff00] bg-[#1a1a1a] border-gray-700 rounded focus:ring-[#00ff00] focus:ring-2"
                      />
                      <span className="text-gray-400 text-sm">Featured Product</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductManagement

UserManagement (src/Admin/Pages)


import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm])

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users')
      setUsers(response.data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterUsers = () => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users)
      return
    }
    
    const filtered = users.filter(user =>
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    setFilteredUsers(filtered)
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      await api.delete(`/users/${userId}`)
      setUsers(users.filter(user => user.id !== userId))
      alert('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const calculateTotalSpent = (user) => {
    return (user.orders || []).reduce((total, order) => 
      total + (parseFloat(order.total) || 0), 0
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-[#00ff00]">Loading users...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">User Management</h1>
          <p className="text-gray-400">Manage all registered users and their accounts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-full md:w-64 text-sm"
            />
            <svg className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Total Users</p>
          <p className="text-2xl font-bold text-white">{users.length}</p>
        </div>
        <div className="bg-[#111111] border border-blue-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Active Today</p>
          <p className="text-2xl font-bold text-white">
            {users.filter(u => {
              const today = new Date().toDateString()
              const lastLogin = new Date(u.lastLogin || u.createdAt).toDateString()
              return today === lastLogin
            }).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-green-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">With Orders</p>
          <p className="text-2xl font-bold text-white">
            {users.filter(u => (u.orders?.length || 0) > 0).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-purple-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Avg. Orders/User</p>
          <p className="text-2xl font-bold text-white">
            {(users.reduce((acc, u) => acc + (u.orders?.length || 0), 0) / users.length || 0).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1a1a1a]">
                <th className="text-left p-4 text-gray-400 text-sm font-medium">USER</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">EMAIL</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">ORDERS</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">TOTAL SPENT</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">JOINED</th>
                <th className="text-left p-4 text-gray-400 text-sm font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t border-gray-800 hover:bg-[#1a1a1a]/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold">{user.username?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.username}</p>
                          <p className="text-gray-400 text-sm">{user.fullName || 'No name'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{user.email}</p>
                      <p className="text-gray-400 text-sm">{user.phone || 'No phone'}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        (user.orders?.length || 0) > 0 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.orders?.length || 0} orders
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-[#00ff00] font-bold">₹{calculateTotalSpent(user).toFixed(2)}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{formatDate(user.createdAt)}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(user)}
                          className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-400">
                    {searchTerm ? 'No users found matching your search' : 'No users found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">User Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-2xl">{selectedUser.username?.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedUser.username}</h4>
                    <p className="text-gray-400">{selectedUser.email}</p>
                    <p className="text-gray-400 text-sm">Member since {formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Full Name</p>
                    <p className="text-white">{selectedUser.fullName || 'Not provided'}</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{selectedUser.phone || 'Not provided'}</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Date of Birth</p>
                    <p className="text-white">{selectedUser.dateOfBirth || 'Not provided'}</p>
                  </div>
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Total Orders</p>
                    <p className="text-[#00ff00] font-bold">{selectedUser.orders?.length || 0}</p>
                  </div>
                </div>

                {/* Addresses */}
                <div>
                  <h5 className="text-lg font-bold text-white mb-3">Saved Addresses</h5>
                  <div className="space-y-3">
                    {selectedUser.addresses?.length > 0 ? (
                      selectedUser.addresses.map((address, index) => (
                        <div key={index} className="bg-[#1a1a1a] rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white font-medium">{address.name}</p>
                            {address.isDefault && (
                              <span className="bg-[#00ff00] text-black text-xs font-bold px-2 py-1 rounded-full">
                                DEFAULT
                              </span>
                            )}
                          </div>
                          <p className="text-gray-400 text-sm">{address.address}</p>
                          <p className="text-gray-400 text-sm">{address.city}, {address.state} - {address.pincode}</p>
                          <p className="text-gray-400 text-sm">📞 {address.phone}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-center py-4">No saved addresses</p>
                    )}
                  </div>
                </div>

                {/* Recent Orders */}
                <div>
                  <h5 className="text-lg font-bold text-white mb-3">Recent Orders</h5>
                  <div className="space-y-3">
                    {(selectedUser.orders || []).slice(0, 3).map((order) => (
                      <div key={order.id} className="bg-[#1a1a1a] rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white font-medium">#{order.orderNumber}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.status === 'Processing' ? 'bg-yellow-500/20 text-yellow-400' :
                            order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          {order.items?.length || 0} items • ₹{parseFloat(order.total).toFixed(2)}
                        </p>
                        <p className="text-gray-400 text-xs">{formatDate(order.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement

