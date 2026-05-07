import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const checkIsAdmin = (userData) => {
    return userData?.email === 'admin1@dribblefit.com' || userData?.role === 'admin'
  }

  const clearAuthData = () => {
    localStorage.removeItem('dribblefit_user')
    localStorage.removeItem('dribblefit_isAuthenticated')
    localStorage.removeItem('dribblefit_isAdmin')
    localStorage.removeItem('currentUserId')
    localStorage.removeItem('dribblefit_access_token')
    localStorage.removeItem('dribblefit_refresh_token')
  }

  const setAuthData = (userData, accessToken, refreshToken) => {
    localStorage.setItem('dribblefit_user', JSON.stringify(userData))
    localStorage.setItem('dribblefit_isAuthenticated', 'true')
    localStorage.setItem('dribblefit_isAdmin', checkIsAdmin(userData).toString())
    localStorage.setItem('currentUserId', userData.id)
    if (accessToken) localStorage.setItem('dribblefit_access_token', accessToken)
    if (refreshToken) localStorage.setItem('dribblefit_refresh_token', refreshToken)
  }

  const setAuthHeader = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('dribblefit_user')
    const savedAuth = localStorage.getItem('dribblefit_isAuthenticated')
    const savedAccessToken = localStorage.getItem('dribblefit_access_token')

    if (savedUser && savedAuth === 'true' && savedAccessToken) {
      try {
        const userData = JSON.parse(savedUser)

        if (userData.isBlocked) {
          clearAuthData()
          setInitialLoading(false)
          return
        }

        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(checkIsAdmin(userData))
        setAuthHeader(savedAccessToken)

      } catch {
        clearAuthData()
      }
    }
    setInitialLoading(false)
  }, [])

  // ✅ FIXED REGISTER (NO LOGIN)
  const register = async (userData) => {
    setLoading(true)
    try {
      const response = await api.post('/users', userData)

      return {
        success: true,
        email: response.data.email
      }

    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Registration failed'

      return { success: false, error: errorMessage }

    } finally {
      setLoading(false)
    }
  }

  // ✅ FIXED VERIFY OTP (LOGIN HERE)
  const verifyOtp = async (email, otp) => {
    setLoading(true)
    try {
      const response = await api.post('/users/verify-email', { email, otp })

      if (response.data.success) {
        const { AccessToken, RefreshToken, user } = response.data

        setUser(user)
        setIsAuthenticated(true)
        setIsAdmin(checkIsAdmin(user))

        setAuthData(user, AccessToken, RefreshToken)
        setAuthHeader(AccessToken)

        return { success: true }
      }

      return { success: false, message: response.data.message }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Invalid OTP'
      return { success: false, message: errorMessage }

    } finally {
      setLoading(false)
    }
  }

  const resendOtp = async (email) => {
    setLoading(true)
    try {
      await api.post('/users/resend-otp', { email })
      return { success: true }
    } catch {
      return { success: false }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    try {
      // ✅ CHANGE FROM api.get TO api.post
      const response = await api.post('/users/login', { email, password })

      if (response.data.success) {
        const { user: userData, AccessToken, RefreshToken } = response.data

        if (userData.isBlocked) {
          return { success: false, error: 'Account blocked' }
        }

        if (!userData.isEmailVerified) {
          return {
            success: false,
            error: 'Please verify your email first',
            requiresVerification: true,
            email: userData.email
          }
        }

        setUser(userData)
        setIsAuthenticated(true)
        setIsAdmin(checkIsAdmin(userData))

        setAuthData(userData, AccessToken, RefreshToken)
        setAuthHeader(AccessToken)

        return { success: true, user: userData, isAdmin: checkIsAdmin(userData) }
      }

      return { success: false, error: 'Invalid email or password' }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed'
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await api.post('/users/logout')
    } catch { }

    clearAuthData()
    setAuthHeader(null)
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  const updateUser = async (updatedData) => {
    setLoading(true)
    try {
      const userId = user.id

      const response = await api.patch(`/users/${userId}`, updatedData)
      const updatedUser = response.data

      setUser(updatedUser)
      setAuthData(
        updatedUser,
        localStorage.getItem('dribblefit_access_token'),
        localStorage.getItem('dribblefit_refresh_token')
      )

      return { success: true }

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Update failed'
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }
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
      verifyOtp,
      resendOtp,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}