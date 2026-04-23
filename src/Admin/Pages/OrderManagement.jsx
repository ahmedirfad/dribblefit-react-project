import React, { useState, useEffect } from 'react'
import api from '../../Api/Axios'

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [stats, setStats] = useState({
    total: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0
  })
  const itemsPerPage = 10

  useEffect(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, selectedStatus])

  // Fetch from API whenever filters or page change
  useEffect(() => {
    fetchOrders()
  }, [debouncedSearch, selectedStatus, currentPage])

  const checkMobile = () => setIsMobile(window.innerWidth < 955)

  const fetchOrders = async () => {
    try {
      setLoading(true)
      let url = `/admin/orders?page=${currentPage}&limit=${itemsPerPage}`
      if (debouncedSearch.trim()) url += `&search=${encodeURIComponent(debouncedSearch)}`
      if (selectedStatus !== 'all') url += `&status=${selectedStatus}`

      const response = await api.get(url)
      if (response.data.success) {
        setOrders(response.data.orders || [])
        setTotalPages(response.data.pagination?.totalPages || 1)
        setStats(response.data.stats || { total: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 })
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await api.patch(`/admin/orders/${orderId}/status`, { status: newStatus })
      if (response.data.success) {
        setOrders(orders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        ))
        alert(`Order status updated to ${newStatus}`)
      }
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
    if (!window.confirm('Are you sure you want to delete this order?')) return
    try {
      await api.delete(`/admin/orders/${orderId}`)
      setOrders(orders.filter(order => order.id !== orderId))
      alert('Order deleted successfully')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'delivered': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const hasCustomizationInOrder = (order) => {
    return order.items?.some(item =>
      item.customizationData && (
        item.customizationData.playerName ||
        item.customizationData.playerNumber ||
        item.customizationData.patches?.length > 0 ||
        item.customizationData.patch
      )
    )
  }

  const formatPrice = (amount) => {
    if (typeof amount === 'number')
      return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    if (typeof amount === 'string')
      return amount.includes('₹') ? amount : `₹${amount}`
    return '₹0.00'
  }

  const getItemDisplayPrice = (item) => {
    if (item.priceString) return item.priceString
    if (item.price) return typeof item.price === 'string' ? item.price : formatPrice(item.price)
    return formatPrice(0)
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
  ]

  const statusUpdateOptions = [
    { value: 'Processing', label: 'Processing' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Cancelled', label: 'Cancelled' }
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

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <button
          onClick={() => { setSearchTerm(''); setSelectedStatus('all') }}
          className="px-4 py-2 border border-gray-700 text-gray-400 rounded-lg hover:border-[#00ff00] hover:text-[#00ff00] transition-colors text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Orders', value: stats.total, border: 'border-[#00ff00]/20' },
          { label: 'Processing', value: stats.Processing, border: 'border-yellow-500/20' },
          { label: 'Shipped', value: stats.Shipped, border: 'border-blue-500/20' },
          { label: 'Delivered', value: stats.Delivered, border: 'border-green-500/20' },
          { label: 'Cancelled', value: stats.Cancelled, border: 'border-red-500/20' }
        ].map(({ label, value, border }) => (
          <div key={label} className={`bg-[#111111] border ${border} rounded-xl p-4`}>
            <p className="text-gray-400 text-sm">{label}</p>
            <p className="text-2xl font-bold text-white">{value || 0}</p>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      {!isMobile ? (
        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1a1a1a]">
                  {['ORDER', 'CUSTOMER', 'DATE', 'ITEMS', 'TOTAL', 'STATUS', 'ACTIONS'].map(h => (
                    <th key={h} className="text-left p-4 text-gray-400 text-sm font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-800 hover:bg-[#1a1a1a]/50">
                    <td className="p-4">
                      <p className="text-white font-medium">#{order.orderNumber}</p>
                      <p className="text-gray-400 text-sm">Tracking: {order.trackingNumber}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{order.username}</p>
                      <p className="text-gray-400 text-sm">{order.userEmail}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{formatDate(order.date)}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-white">{order.items?.length || 0} items</p>
                      {hasCustomizationInOrder(order) && (
                        <span className="inline-block px-2 py-1 bg-[#00ff00]/10 text-[#00ff00] text-xs rounded-md border border-[#00ff00]/20">
                          Customized
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <p className="text-[#00ff00] font-bold">{formatPrice(order.total)}</p>
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium border ${getStatusColor(order.status)} bg-transparent`}
                      >
                        {statusUpdateOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => handleViewDetails(order)} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">View</button>
                        <button onClick={() => handleDeleteOrder(order.id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-400">
                      {searchTerm || selectedStatus !== 'all' ? 'No orders found matching your criteria' : 'No orders available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Mobile Cards */
        <div className="space-y-4">
          {orders.length > 0 ? orders.map((order) => (
            <div key={order.id} className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white font-medium">#{order.orderNumber}</p>
                  <p className="text-gray-400 text-sm">Tracking: {order.trackingNumber}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(order.status)}`}>{order.status}</span>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between"><p className="text-gray-400 text-sm">Customer</p><p className="text-white text-sm">{order.username}</p></div>
                <div className="flex justify-between"><p className="text-gray-400 text-sm">Date</p><p className="text-white text-sm">{formatDate(order.date)}</p></div>
                <div className="flex justify-between"><p className="text-gray-400 text-sm">Items</p><p className="text-white text-sm">{order.items?.length || 0} items</p></div>
                <div className="flex justify-between"><p className="text-gray-400 text-sm">Total</p><p className="text-[#00ff00] font-bold text-sm">{formatPrice(order.total)}</p></div>
              </div>
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Update Status</p>
                <select
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(order.status)} bg-transparent`}
                >
                  {statusUpdateOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-800">
                <button onClick={() => handleViewDetails(order)} className="flex-1 bg-blue-500/20 text-blue-400 py-2 rounded-lg hover:bg-blue-500/30 transition-colors text-sm">View Details</button>
                <button onClick={() => handleDeleteOrder(order.id)} className="flex-1 bg-red-500/20 text-red-400 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm">Delete</button>
              </div>
            </div>
          )) : (
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-8 text-center text-gray-400">
              {searchTerm || selectedStatus !== 'all' ? 'No orders found matching your criteria' : 'No orders available'}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg disabled:opacity-50 hover:border-[#00ff00] transition-colors text-sm"
          >
            Previous
          </button>
          <span className="text-gray-400 text-sm">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-[#1a1a1a] border border-gray-700 text-white rounded-lg disabled:opacity-50 hover:border-[#00ff00] transition-colors text-sm"
          >
            Next
          </button>
        </div>
      )}

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
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Items */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {selectedOrder.items?.map((item, index) => (
                        <div key={index} className="bg-[#2a2a2a] rounded-lg p-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-gray-400 text-sm">Size: {item.size} • Qty: {item.quantity} • {item.team}</p>
                              <p className="text-[#00ff00] font-bold text-sm mt-1">
                                {getItemDisplayPrice(item)} × {item.quantity} = {formatPrice(item.total || 0)}
                              </p>
                              {item.customizationData && (
                                <div className="mt-3 pt-3 border-t border-gray-700">
                                  <p className="text-[#00ff00] text-sm font-semibold mb-2">Customization Details:</p>
                                  <div className="space-y-2">
                                    {item.customizationData?.playerName && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Player Name:</span>
                                        <span className="text-white font-medium">{item.customizationData.playerName.toUpperCase()}</span>
                                      </div>
                                    )}
                                    {item.customizationData?.playerNumber && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Player Number:</span>
                                        <span className="text-white font-medium">#{item.customizationData.playerNumber}</span>
                                      </div>
                                    )}
                                    {item.customizationData?.customizationTotal > 0 && (
                                      <div className="flex justify-between text-sm pt-2 border-t border-gray-700">
                                        <span className="text-gray-400">Customization Total:</span>
                                        <span className="text-[#00ff00] font-bold">+{formatPrice(item.customizationData.customizationTotal)}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
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
                      <p className="text-gray-400">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}</p>
                      <p className="text-gray-400">📞 {selectedOrder.shippingAddress?.phone}</p>
                      {selectedOrder.shippingAddress?.landmark && (
                        <p className="text-gray-400">📍 {selectedOrder.shippingAddress?.landmark}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Customer Information</h4>
                    <div className="space-y-2">
                      <div><p className="text-gray-400 text-sm">Name</p><p className="text-white">{selectedOrder.username}</p></div>
                      <div><p className="text-gray-400 text-sm">Email</p><p className="text-white">{selectedOrder.userEmail}</p></div>
                      <div><p className="text-gray-400 text-sm">Phone</p><p className="text-white">{selectedOrder.shippingAddress?.phone || 'N/A'}</p></div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="bg-[#1a1a1a] rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Payment Information</h4>
                    <div className="space-y-2">
                      <div><p className="text-gray-400 text-sm">Payment Method</p><p className="text-white capitalize">{selectedOrder.paymentMethod}</p></div>
                      <div><p className="text-gray-400 text-sm">Order Date</p><p className="text-white">{formatDate(selectedOrder.date)}</p></div>
                      <div><p className="text-gray-400 text-sm">Tracking Number</p><p className="text-[#00ff00] font-mono">{selectedOrder.trackingNumber}</p></div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-white mb-4">Order Summary</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between"><span className="text-gray-400">Subtotal</span><span className="text-white">{formatPrice(selectedOrder.subtotal)}</span></div>
                      {selectedOrder.couponApplied && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Coupon ({selectedOrder.couponApplied})</span>
                          <span className="text-[#00ff00]">-{formatPrice(selectedOrder.couponDiscount)}</span>
                        </div>
                      )}
                      {selectedOrder.codCharges > 0 && (
                        <div className="flex justify-between"><span className="text-gray-400">COD Charges</span><span className="text-yellow-400">+{formatPrice(selectedOrder.codCharges)}</span></div>
                      )}
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="text-white font-bold">Total</span>
                          <span className="text-[#00ff00] font-bold text-lg">{formatPrice(selectedOrder.total)}</span>
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
                        setSelectedOrder({ ...selectedOrder, status: e.target.value })
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedOrder.status)} bg-transparent`}
                    >
                      {statusUpdateOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
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