// src/Contexts/AuthContext.jsx (UPDATED VERSION WITH BLOCKING CHECK)
import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true) 
  const [isAdmin, setIsAdmin] = useState(false)

  const checkIsAdmin = (userData) => {
    return userData?.email === 'admin@dribblefit.com' || userData?.role === 'admin'
  }

  // checking existing user in localstorage
  useEffect(() => {
    const savedUser = localStorage.getItem('dribblefit_user')
    const savedAuth = localStorage.getItem('dribblefit_isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      try {
        const userData = JSON.parse(savedUser)
        
        // NEW: Check if user is blocked when app loads
        if (userData.isBlocked) {
          clearAuthData()
          alert('Your account has been blocked by admin. Please contact support.')
          return
        }
        
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
        role: 'user',
        isBlocked: false, // NEW: Ensure new users aren't blocked
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
      
      // NEW: Check if user is blocked before allowing login
      if (user.isBlocked) {
        return { 
          success: false, 
          error: 'Your account has been blocked by admin. Please contact support.' 
        }
      }
      
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