import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext.jsx'
import { useCart } from '../../Contexts/CartContext.jsx'

const initialValues = {
  username: '',
  email: '',
  password: '',
  cpassword: ''
}

const validationSchema = Yup.object({
  username: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  cpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
})

function RegisterPage() {
  const { register, loading } = useAuth()
  const { syncCartOnLogin } = useCart()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values, { resetForm }) => {
    setMessage('')
    
    const userData = {
      username: values.username,
      email: values.email,
      password: values.password,
    }

    const result = await register(userData)
    
    if (result.success) {
      setMessage('✅ Account created successfully! Redirecting...')
      resetForm()
      
      // Sync cart after registration (user is auto-logged in)
      try {
        await syncCartOnLogin(result.user.id)
      } catch (error) {
        console.error('Error syncing cart:', error)
        // Continue even if cart sync fails
      }
      
      // AUTO-REDIRECT TO HOME (user is already logged in after registration)
      setTimeout(() => {
        navigate('/home')
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
          src="src/assets/download (3) (1).jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dim Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Optional gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="w-full max-w-sm z-10 relative">
        
        <div className="text-center mb-6">
          <img 
            src="src/assets/DRIBBLEFIT.PNG" 
            alt="DRIBBLEFIT" 
            className="mx-auto"
          />
          <p className="text-gray-300 text-sm font-light mt-2">CREATE ACCOUNT</p>
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
                  type="text" 
                  name="username" 
                  placeholder="Username"
                  className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] text-sm placeholder-gray-400 transition-all"
                />
                <ErrorMessage name="username" component="div" className="text-red-300 text-xs mt-1" />
              </div>

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

              <div>
                <Field 
                  type="password" 
                  name="cpassword" 
                  placeholder="Confirm Password"
                  className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] focus:ring-1 focus:ring-[#00ff00] text-sm placeholder-gray-400 transition-all"
                />
                <ErrorMessage name="cpassword" component="div" className="text-red-300 text-xs mt-1" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00ff00] text-black font-bold py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-lg hover:shadow-[#00ff00]/30 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </Form>
          </Formik>

          <div className="text-center mt-4 pt-4 border-t border-white/20">
            <p className="text-gray-300 text-xs">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00ff00] font-semibold hover:text-[#00ff00]/80 hover:underline transition-colors">
                SIGN IN
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage