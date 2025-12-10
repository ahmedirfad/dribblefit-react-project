import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-8.354a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'from-blue-500/20 to-blue-600/20',
      textColor: 'text-blue-400'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'from-green-500/20 to-emerald-600/20',
      textColor: 'text-green-400'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'from-purple-500/20 to-purple-600/20',
      textColor: 'text-purple-400'
    },
    {
      title: 'Total Revenue',
      value: `₹${stats.revenue.toLocaleString()}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-yellow-500/20 to-yellow-600/20',
      textColor: 'text-yellow-400'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-orange-500/20 to-orange-600/20',
      textColor: 'text-orange-400'
    },
    {
      title: 'Out of Stock',
      value: stats.outOfStock,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.226 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
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

  const handleAddNewProduct = () => {
    navigate('/admin/products')
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
          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
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
              <div className={`p-3 rounded-full ${stat.textColor.replace('text-', 'bg-')}/20`}>
                {stat.icon}
              </div>
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
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00]/20 to-emerald-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
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
          <button
            onClick={handleAddNewProduct}
            className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-lg p-4 text-center hover:bg-[#00ff00]/20 transition-colors group cursor-pointer"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="text-white font-medium">Add New Product</p>
            <p className="text-gray-400 text-sm">Add a new football jersey</p>
          </button>
          
          <Link
            to="/admin/orders?filter=pending"
            className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg p-4 text-center hover:bg-yellow-500/20 transition-colors group"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-white font-medium">Process Orders</p>
            <p className="text-gray-400 text-sm">{stats.pendingOrders} pending</p>
          </Link>
          
          <Link
            to="/admin/products?filter=outofstock"
            className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-4 text-center hover:bg-red-500/20 transition-colors group"
          >
            <div className="w-10 h-10 mx-auto mb-2 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.226 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <p className="text-white font-medium">Restock Products</p>
            <p className="text-gray-400 text-sm">{stats.outOfStock} out of stock</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard