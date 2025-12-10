import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext.jsx'
import { useCart } from '../../Contexts/CartContext.jsx'

const initialValues = {
  email: '',
  password: '',
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
})

function LoginPage() {
  const { login, loading } = useAuth()
  const { syncCartOnLogin } = useCart()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setMessage('')
    
    const result = await login(values.email, values.password)
    
    if (result.success) {
      setMessage('✅ Login successful!')
      
      // Sync cart after successful login
      try {
        await syncCartOnLogin(result.user.id)
      } catch (error) {
        console.error('Error syncing cart:', error)
        // Continue even if cart sync fails
      }
      
      // REDIRECT BASED ON USER ROLE
      setTimeout(() => {
        if (result.isAdmin) {
          navigate('/admin') // Redirect admin to admin dashboard
        } else {
          navigate('/home') // Redirect regular users to home
        }
      }, 1000)
    } else {
      setMessage(`❌ ${result.error}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="src/assets/download (1).jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dim Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Optional: Add gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="w-full max-w-sm z-10 relative">
        
        <div className="text-center mb-6">
          <img 
            src="src/assets/Logo (1).PNG" 
            alt="DRIBBLEFIT" 
            className="mx-auto"
          />
          <p className="text-gray-300 text-sm font-light mt-2">WELCOME BACK</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center backdrop-blur-sm ${
            message.includes('❌') 
              ? 'bg-red-500/30 text-red-300 border border-red-500/50' 
              : 'bg-[#00ff00]/30 text-[#caffca] border border-[#00ff00]/50'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-black/50 backdrop-blur-md border border-[#00ff00]/40 rounded-xl p-6 shadow-2xl">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div>
                <Field 
                  type="email" 
                  name="email" 
                  placeholder="Email"
                  className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] text-sm placeholder-gray-400 transition-all"
                />
                <ErrorMessage name="email" component="div" className="text-red-300 text-xs mt-1" />
              </div>

              <div>
                <Field 
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] text-sm placeholder-gray-400 transition-all"
                />
                <ErrorMessage name="password" component="div" className="text-red-300 text-xs mt-1" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00ff00] text-black font-bold py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-lg hover:shadow-[#00ff00]/30 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </Form>
          </Formik>

          <div className="text-center mt-4 pt-4 border-t border-white/20">
            <p className="text-gray-300 text-xs">
              New to DribbleFit?{' '}
              <Link to="/register" className="text-[#00ff00] font-semibold hover:text-[#00ff00]/80 hover:underline transition-colors">
                CREATE ACCOUNT
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage