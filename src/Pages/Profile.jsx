// src/Pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useCart } from '../Contexts/CartContext'; // ADD THIS
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function Profile() {
  const { user, updateUser, isAuthenticated } = useAuth();
  const { cartItems } = useCart(); // ADD THIS - for live cart updates
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    fullName: '',
    dateOfBirth: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Get saved addresses and orders from user
  const savedAddresses = user?.addresses || [];
  const savedOrders = user?.orders || [];

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        fullName: user.fullName || '',
        dateOfBirth: user.dateOfBirth || ''
      });
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    if (formData.fullName && formData.fullName.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Format phone number (only numbers, max 10)
    if (name === 'phone') {
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData({
      ...formData,
      [name]: processedValue
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSuccessMessage('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);
    
    try {
      // Create updated user object with all fields
      const updatedUserData = {
        ...user, // Keep all existing user data
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        fullName: formData.fullName,
        dateOfBirth: formData.dateOfBirth
      };
      
      const result = await updateUser(updatedUserData);
      
      if (result.success) {
        setSuccessMessage('Profile updated successfully!');
        setIsEditing(false);
        
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } else {
        setSuccessMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      setSuccessMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-yellow-500 text-black'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      handleSubmit(new Event('submit'));
    } else {
      showToast('Please fix the errors in the form', 'error');
    }
  };

  // Calculate total cart items from CartContext
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-[#00ff00] text-6xl mb-6">🔒</div>
            <div className="text-white text-2xl font-bold mb-4">Authentication Required</div>
            <p className="text-gray-400 mb-8">Please login to view your profile</p>
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
            <h1 className="text-3xl font-bold text-white font-poppins mb-2">My Profile</h1>
            <p className="text-gray-400">Manage your personal information and account settings</p>
          </div>

          {/* Success/Error Message */}
          {successMessage && (
            <div className={`mb-6 p-4 rounded-lg ${
              successMessage.includes('Error') || successMessage.includes('fix') 
                ? 'bg-red-500/20 text-red-400' 
                : 'bg-[#00ff00]/20 text-[#00ff00]'
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
                    <div className="text-gray-400 text-sm truncate max-w-[180px]">{user?.email}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link to="/profile" className="block bg-[#00ff00] text-black font-bold py-3 px-4 rounded-lg transition-all hover:scale-[1.02]">
                    My Profile
                  </Link>
                  <Link to="/address" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Addresses
                  </Link>
                  <Link to="/orders" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Orders
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <div className="text-gray-400 text-sm mb-2">Account Created</div>
                  <div className="text-[#00ff00] font-semibold">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2">
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white font-poppins">Personal Information</h2>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        // Reset form data to original user data when cancelling
                        setFormData({
                          username: user.username || '',
                          email: user.email || '',
                          phone: user.phone || '',
                          fullName: user.fullName || '',
                          dateOfBirth: user.dateOfBirth || ''
                        });
                        setErrors({});
                      }
                      setIsEditing(!isEditing);
                    }}
                    className="bg-[#00ff00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-colors"
                  >
                    {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Username <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={`w-full bg-[#1a1a1a] border ${
                              errors.username ? 'border-red-500' : 'border-gray-700'
                            } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] transition-colors`}
                            required
                          />
                          {errors.username && (
                            <div className="text-red-400 text-xs mt-1">{errors.username}</div>
                          )}
                        </>
                      ) : (
                        <div className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg min-h-[48px] flex items-center">
                          {formData.username}
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full bg-[#1a1a1a] border ${
                              errors.email ? 'border-red-500' : 'border-gray-700'
                            } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] transition-colors`}
                            required
                          />
                          {errors.email && (
                            <div className="text-red-400 text-xs mt-1">{errors.email}</div>
                          )}
                        </>
                      ) : (
                        <div className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg min-h-[48px] flex items-center">
                          {formData.email}
                        </div>
                      )}
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`w-full bg-[#1a1a1a] border ${
                              errors.fullName ? 'border-red-500' : 'border-gray-700'
                            } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] transition-colors`}
                            placeholder="Enter your full name"
                          />
                          {errors.fullName && (
                            <div className="text-red-400 text-xs mt-1">{errors.fullName}</div>
                          )}
                        </>
                      ) : (
                        <div className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg min-h-[48px] flex items-center">
                          {formData.fullName || 'Not set'}
                        </div>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                      {isEditing ? (
                        <>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className={`w-full bg-[#1a1a1a] border ${
                              errors.phone ? 'border-red-500' : 'border-gray-700'
                            } text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] transition-colors`}
                            placeholder="Enter 10-digit phone number"
                            maxLength="10"
                          />
                          {errors.phone && (
                            <div className="text-red-400 text-xs mt-1">{errors.phone}</div>
                          )}
                          {!errors.phone && formData.phone && (
                            <div className="text-gray-500 text-xs mt-1">
                              {formData.phone.length}/10 digits
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg min-h-[48px] flex items-center">
                          {formData.phone || 'Not set'}
                        </div>
                      )}
                    </div>

                    {/* Date of Birth */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] transition-colors"
                          max={new Date().toISOString().split('T')[0]}
                        />
                      ) : (
                        <div className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg min-h-[48px] flex items-center">
                          {formData.dateOfBirth 
                            ? new Date(formData.dateOfBirth).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })
                            : 'Not set'}
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            username: user.username || '',
                            email: user.email || '',
                            phone: user.phone || '',
                            fullName: user.fullName || '',
                            dateOfBirth: user.dateOfBirth || ''
                          });
                          setErrors({});
                        }}
                        className="bg-transparent border border-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveClick}
                        disabled={loading}
                        className="bg-[#00ff00] text-black font-bold px-8 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : 'Save Changes'}
                      </button>
                    </div>
                  )}
                </form>

                {/* Stats Section - UPDATED */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                  <h3 className="text-xl font-bold text-white font-poppins mb-6">Account Statistics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Cart Stats - LIVE UPDATES */}
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#00ff00]/20 rounded-xl p-6 text-center hover:border-[#00ff00]/40 transition-all duration-300 hover:scale-[1.02]">
                      <div className="text-3xl font-bold text-[#00ff00] mb-2">
                        {cartItemCount}
                      </div>
                      <div className="text-gray-400">Items in Cart</div>
                      <div className="text-gray-500 text-xs mt-2">
                        {cartItemCount > 0 ? (
                          <Link to="/cart" className="text-[#00ff00] hover:underline">
                            {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} ready to checkout
                          </Link>
                        ) : (
                          'Cart is empty'
                        )}
                      </div>
                    </div>
                    
                    {/* Orders Stats */}
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#00ff00]/20 rounded-xl p-6 text-center hover:border-[#00ff00]/40 transition-all duration-300 hover:scale-[1.02]">
                      <div className="text-3xl font-bold text-[#00ff00] mb-2">
                        {savedOrders.length}
                      </div>
                      <div className="text-gray-400">Total Orders</div>
                      <div className="text-gray-500 text-xs mt-2">
                        {savedOrders.length > 0 ? (
                          <Link to="/orders" className="text-[#00ff00] hover:underline">
                            View order history
                          </Link>
                        ) : (
                          'No orders yet'
                        )}
                      </div>
                    </div>
                    
                    {/* Addresses Stats */}
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#00ff00]/20 rounded-xl p-6 text-center hover:border-[#00ff00]/40 transition-all duration-300 hover:scale-[1.02]">
                      <div className="text-3xl font-bold text-[#00ff00] mb-2">
                        {savedAddresses.length}
                      </div>
                      <div className="text-gray-400">Saved Addresses</div>
                      <div className="text-gray-500 text-xs mt-2">
                        {savedAddresses.length > 0 ? (
                          <Link to="/address" className="text-[#00ff00] hover:underline">
                            Manage addresses
                          </Link>
                        ) : (
                          <Link to="/address" className="text-[#00ff00] hover:underline">
                            Add your first address
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;