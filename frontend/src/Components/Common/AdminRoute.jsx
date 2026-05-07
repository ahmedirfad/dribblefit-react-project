// src/Components/Common/AdminRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'

function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading, initialLoading } = useAuth()

  // Show loading state while auth is being loaded
  if (loading || initialLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-[#00ff00]">Loading...</div>
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If not admin, redirect to home
  if (!isAdmin) {
    return <Navigate to="/home" replace />
  }

  // If authenticated and admin, render children
  return children
}

export default AdminRoute