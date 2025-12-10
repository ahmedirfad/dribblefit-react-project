import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'

const UserManagement = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    fetchUsers()
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    filterUsers()
  }, [users, searchTerm])

  const checkMobile = () => {
    setIsMobile(window.innerWidth < 860)
  }

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

  const handleBlockUser = async (userId, isCurrentlyBlocked) => {
    const action = isCurrentlyBlocked ? 'unblock' : 'block'
    
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return
    }

    try {
      // Find the user
      const user = users.find(u => u.id === userId)
      if (!user) {
        alert('User not found')
        return
      }

      // Update user block status
      const updatedUser = {
        ...user,
        isBlocked: !isCurrentlyBlocked,
        blockedAt: !isCurrentlyBlocked ? new Date().toISOString() : null,
        blockedBy: !isCurrentlyBlocked ? 'admin' : null
      }

      // Update in database
      await api.patch(`/users/${userId}`, {
        isBlocked: !isCurrentlyBlocked,
        blockedAt: !isCurrentlyBlocked ? new Date().toISOString() : null,
        blockedBy: !isCurrentlyBlocked ? 'admin' : null
      })

      // Update local state
      setUsers(users.map(u => 
        u.id === userId ? updatedUser : u
      ))

      alert(`User ${action}ed successfully`)
    } catch (error) {
      console.error(`Error ${action}ing user:`, error)
      alert(`Failed to ${action} user`)
    }
  }

  const handleViewDetails = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
        <div className="bg-[#111111] border border-yellow-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Blocked</p>
          <p className="text-2xl font-bold text-white">
            {users.filter(u => u.isBlocked).length}
          </p>
        </div>
        <div className="bg-[#111111] border border-purple-500/20 rounded-xl p-4">
          <p className="text-gray-400 text-sm">Avg. Orders/User</p>
          <p className="text-2xl font-bold text-white">
            {(users.reduce((acc, u) => acc + (u.orders?.length || 0), 0) / users.length || 0).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Desktop Table View */}
      {!isMobile ? (
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a1a]">
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">USER</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">EMAIL</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">STATUS</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">ORDERS</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">TOTAL SPENT</th>
                  <th className="text-left p-4 text-gray-400 text-sm font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-t border-gray-800 hover:bg-[#1a1a1a]/50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            user.isBlocked 
                              ? 'bg-red-500/20 border border-red-500/30' 
                              : 'bg-gradient-to-br from-[#00ff00] to-emerald-600'
                          }`}>
                            <span className={`font-bold ${user.isBlocked ? 'text-red-400' : 'text-black'}`}>
                              {user.username?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate max-w-[120px]">{user.username}</p>
                            <p className="text-gray-400 text-sm truncate max-w-[120px]">{user.fullName || 'No name'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 min-w-0">
                        <p className="text-white truncate max-w-[180px]">{user.email}</p>
                        <p className="text-gray-400 text-sm truncate max-w-[180px]">{user.phone || 'No phone'}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.isBlocked 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                            : 'bg-green-500/20 text-green-400 border border-green-500/30'
                        }`}>
                          {user.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          (user.orders?.length || 0) > 0 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {user.orders?.length || 0}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-[#00ff00] font-bold text-sm">₹{calculateTotalSpent(user).toFixed(2)}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                            title="View Details"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleBlockUser(user.id, user.isBlocked)}
                            className={`p-2 rounded-lg hover:opacity-90 transition-colors ${
                              user.isBlocked
                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                            }`}
                            title={user.isBlocked ? 'Unblock User' : 'Block User'}
                          >
                            {user.isBlocked ? (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            title="Delete User"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
      ) : (
        /* Mobile Card View */
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                {/* User Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      user.isBlocked 
                        ? 'bg-red-500/20 border border-red-500/30' 
                        : 'bg-gradient-to-br from-[#00ff00] to-emerald-600'
                    }`}>
                      <span className={`font-bold text-lg ${user.isBlocked ? 'text-red-400' : 'text-black'}`}>
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{user.username}</p>
                      <p className="text-gray-400 text-sm">{user.fullName || 'No name'}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    user.isBlocked 
                      ? 'bg-red-500/20 text-red-400' 
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {user.isBlocked ? 'Blocked' : 'Active'}
                  </span>
                </div>

                {/* User Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Email</p>
                    <p className="text-white text-sm truncate max-w-[70%]">{user.email}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white text-sm">{user.phone || 'No phone'}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Orders</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      (user.orders?.length || 0) > 0 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {user.orders?.length || 0} orders
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-[#00ff00] font-bold text-sm">₹{calculateTotalSpent(user).toFixed(2)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => handleViewDetails(user)}
                    className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                  <button
                    onClick={() => handleBlockUser(user.id, user.isBlocked)}
                    className={`flex-1 py-2 rounded-lg text-sm hover:opacity-90 transition-colors flex items-center justify-center gap-1 ${
                      user.isBlocked
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {user.isBlocked ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                    {user.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-8 text-center text-gray-400">
              {searchTerm ? 'No users found matching your search' : 'No users found'}
            </div>
          )}
        </div>
      )}

      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">User Details</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBlockUser(selectedUser.id, selectedUser.isBlocked)}
                    className={`px-3 py-1 rounded-lg text-sm hover:opacity-90 transition-colors flex items-center gap-1 ${
                      selectedUser.isBlocked
                        ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {selectedUser.isBlocked ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      )}
                    </svg>
                    {selectedUser.isBlocked ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                    selectedUser.isBlocked 
                      ? 'bg-red-500/20 border border-red-500/30' 
                      : 'bg-gradient-to-br from-[#00ff00] to-emerald-600'
                  }`}>
                    <span className={`font-bold text-2xl ${selectedUser.isBlocked ? 'text-red-400' : 'text-black'}`}>
                      {selectedUser.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{selectedUser.username}</h4>
                    <p className="text-gray-400">{selectedUser.email}</p>
                    <p className="text-gray-400 text-sm">Member since {formatDate(selectedUser.createdAt)}</p>
                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        selectedUser.isBlocked 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {selectedUser.isBlocked ? 'Blocked' : 'Active'}
                        {selectedUser.isBlocked && selectedUser.blockedAt && (
                          <span className="text-xs ml-2">(since {formatDateTime(selectedUser.blockedAt)})</span>
                        )}
                      </span>
                    </div>
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
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-[#00ff00] font-bold">₹{calculateTotalSpent(selectedUser).toFixed(2)}</p>
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