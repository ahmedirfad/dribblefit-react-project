import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext.jsx'

const initialValues = {
  username: '',
  email: '',
  password: '',
  cpassword: ''
}

// ✅ UPDATED VALIDATION SCHEMA
const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    .matches(/^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/, 'Username must start and end with a letter, no spaces at beginning or end')
    .min(3, "Minimum 3 characters")
    .max(30, "Maximum 30 characters")
    .required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})

function RegisterPage() {
  const { register, loading } = useAuth()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values, { resetForm, setFieldValue }) => {
    setMessage('')
    
    // Trim username before sending
    const trimmedUsername = values.username.trim()
    setFieldValue('username', trimmedUsername)
    
    const userData = {
      username: trimmedUsername,
      email: values.email,
      password: values.password,
    }

    const result = await register(userData)
    
    if (result.success) {
      setMessage('✅ Account created successfully! Redirecting to verification...')
      resetForm()
      
      setTimeout(() => {
        navigate('/verify-otp', { state: { email: values.email } })
      }, 1500)

    } else {
      setMessage(`❌ ${result.error}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="public\images\registerimage.jpeg" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="w-full max-w-sm z-10 relative">
        
        <div className="text-center mb-6">
          <img 
            src="public\images\DRIBBLEFIT.PNG"
            alt="DRIBBLEFIT" 
            className="mx-auto"
          />
          <p className="text-gray-300 text-sm mt-2">CREATE ACCOUNT</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
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
            {({ setFieldValue }) => (
              <Form className="space-y-4">

                <div>
                  <Field name="username">
                    {({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Username"
                        onChange={(e) => {
                          let value = e.target.value
                          // Prevent space at the beginning
                          if (value.startsWith(' ')) {
                            value = value.trimStart()
                          }
                          setFieldValue('username', value)
                        }}
                        className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="username" component="div" className="text-red-300 text-xs" />
                </div>

                <div>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-300 text-xs" />
                </div>

                <div>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-300 text-xs" />
                </div>

                <div>
                  <Field
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    className="w-full bg-white/10 border border-white/20 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                  />
                  <ErrorMessage name="cpassword" component="div" className="text-red-300 text-xs" />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00ff00] text-black font-bold py-3 rounded-lg disabled:opacity-50"
                >
                  {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
                </button>

              </Form>
            )}
          </Formik>

          <div className="text-center mt-4 pt-4 border-t border-white/20">
            <p className="text-gray-300 text-xs">
              Already have an account?{' '}
              <Link to="/login" className="text-[#00ff00] font-semibold hover:underline">
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