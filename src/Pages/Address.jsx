// src/Pages/Address.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function Address() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const [addresses, setAddresses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    isDefault: false
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user && user.addresses) {
      setAddresses(user.addresses);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: '',
      isDefault: false
    });
    setEditingIndex(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedAddresses = [...addresses];
      
      if (editingIndex !== null) {
        // Update existing address
        updatedAddresses[editingIndex] = formData;
      } else {
        // Add new address
        if (formData.isDefault) {
          // Remove default from other addresses
          updatedAddresses = updatedAddresses.map(addr => ({
            ...addr,
            isDefault: false
          }));
        }
        updatedAddresses.push(formData);
      }

      // Update user in database
      const result = await updateUser({
        ...user,
        addresses: updatedAddresses
      });

      if (result.success) {
        setAddresses(updatedAddresses);
        setSuccessMessage(editingIndex !== null ? 'Address updated successfully!' : 'Address added successfully!');
        resetForm();
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setSuccessMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSuccessMessage('Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditingIndex(index);
    setShowAddForm(true);
  };

  const handleDelete = async (index) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return;
    }

    try {
      const updatedAddresses = addresses.filter((_, i) => i !== index);
      const result = await updateUser({
        ...user,
        addresses: updatedAddresses
      });

      if (result.success) {
        setAddresses(updatedAddresses);
        setSuccessMessage('Address deleted successfully!');
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setSuccessMessage('Failed to delete address');
    }
  };

  const setDefaultAddress = async (index) => {
    try {
      const updatedAddresses = addresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index
      }));

      const result = await updateUser({
        ...user,
        addresses: updatedAddresses
      });

      if (result.success) {
        setAddresses(updatedAddresses);
        setSuccessMessage('Default address updated!');
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      setSuccessMessage('Failed to set default address');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-[#00ff00] text-6xl mb-6">🏠</div>
            <div className="text-white text-2xl font-bold mb-4">Authentication Required</div>
            <p className="text-gray-400 mb-8">Please login to manage your addresses</p>
            <Link to="/login" className="bg-[#00ff00] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#00ff00]/90 transition-colors inline-block">
              Login Now
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white font-poppins mb-2">My Addresses</h1>
            <p className="text-gray-400">Manage your shipping addresses for faster checkout</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              successMessage.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-[#00ff00]/20 text-[#00ff00]'
            }`}>
              {successMessage}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center font-bold text-black text-2xl">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="text-white font-poppins font-bold text-lg">{user?.username}</div>
                    <div className="text-gray-400 text-sm">{user?.email}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link to="/profile" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Profile
                  </Link>
                  <Link to="/address" className="block bg-[#00ff00] text-black font-bold py-3 px-4 rounded-lg">
                    My Addresses
                  </Link>
                  <Link to="/orders" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Orders
                  </Link>
                </div>

                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full mt-6 bg-[#00ff00] text-black font-bold py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors"
                >
                  + Add New Address
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2">
              {/* Add/Edit Form */}
              {showAddForm && (
                <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white font-poppins">
                      {editingIndex !== null ? 'Edit Address' : 'Add New Address'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                          required
                          maxLength="10"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-gray-400 text-sm mb-2">Address *</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          rows="3"
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">State *</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Pincode *</label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                          required
                          maxLength="6"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Landmark (Optional)</label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-700 bg-[#1a1a1a] text-[#00ff00] focus:ring-[#00ff00]"
                      />
                      <label htmlFor="isDefault" className="text-gray-400">
                        Set as default shipping address
                      </label>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-transparent border border-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00ff00] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors disabled:opacity-50"
                      >
                        {loading ? 'Saving...' : editingIndex !== null ? 'Update Address' : 'Save Address'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Address List */}
              <div className="space-y-6">
                {addresses.length === 0 ? (
                  <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12 text-center">
                    <div className="text-[#00ff00] text-6xl mb-6">🏠</div>
                    <h3 className="text-2xl font-bold text-white font-poppins mb-4">No Addresses Yet</h3>
                    <p className="text-gray-400 mb-8">Add your first shipping address for faster checkout</p>
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="bg-[#00ff00] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors"
                    >
                      + Add Your First Address
                    </button>
                  </div>
                ) : (
                  <>
                    {addresses.map((address, index) => (
                      <div 
                        key={index}
                        className={`bg-[#111111] border rounded-2xl p-6 ${
                          address.isDefault 
                            ? 'border-[#00ff00] bg-[#00ff00]/5' 
                            : 'border-[#00ff00]/20 hover:border-[#00ff00]/40'
                        } transition-all duration-300`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-lg flex items-center justify-center font-bold text-black">
                              {address.name?.charAt(0).toUpperCase() || 'A'}
                            </div>
                            <div>
                              <h3 className="text-white font-poppins font-bold text-lg">{address.name}</h3>
                              {address.isDefault && (
                                <span className="bg-[#00ff00] text-black text-xs font-bold px-2 py-1 rounded-full">
                                  DEFAULT
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(index)}
                              className="text-gray-400 hover:text-[#00ff00] transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-gray-400 hover:text-red-400 transition-colors ml-4"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="text-gray-300 mb-4">
                          <div className="mb-2">{address.address}</div>
                          <div className="flex items-center gap-2 text-sm">
                            <span>{address.city}, {address.state} - {address.pincode}</span>
                            {address.landmark && <span>• Landmark: {address.landmark}</span>}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                          <div className="text-gray-400">
                            📞 {address.phone}
                          </div>
                          
                          {!address.isDefault && (
                            <button
                              onClick={() => setDefaultAddress(index)}
                              className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors text-sm font-semibold"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* Help Text */}
              {addresses.length > 0 && (
                <div className="mt-8 p-4 bg-[#1a1a1a] border border-[#00ff00]/20 rounded-xl">
                  <div className="text-gray-400 text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                      <span>Default address will be used for checkout</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                      <span>You can have multiple addresses for different locations</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Address;