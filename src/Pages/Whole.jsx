Axios (src/Api/)

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Make sure this matches your JSON Server port
  timeout: 10000,
});

export default api;

db .json 

{
  "users": [
    {
      "id": "1764150476280",
      "username": "Irfad",
      "email": "ahmedirfad8@gmail.com",
      "password": "Irfad1416941%",
      "createdAt": "2025-11-26T09:47:56.280Z",
      "cart": [],
      "addresses": [
        {
          "name": "Irfad",
          "phone": "7736919863",
          "address": "Imad Manzil , Azad Nagar , Chowki",
          "city": "Kasaragod",
          "state": "Kerala",
          "pincode": "671124",
          "landmark": "Near Daffodil Hills",
          "isDefault": true
        },
        {
          "name": "Irfad",
          "phone": "7736919863",
          "address": "Kinfra Building, Kakkanchery",
          "city": "Kozhikode",
          "state": "Kerala",
          "pincode": "673634",
          "landmark": "Kinfra Buikding",
          "isDefault": false
        }
      ],
      "orders": [
        {
          "id": "1764934813386",
          "orderNumber": "ORD-34813386",
          "userId": "1764150476280",
          "username": "Irfad",
          "userEmail": "ahmedirfad8@gmail.com",
          "date": "2025-12-05T11:40:13.386Z",
          "status": "Processing",
          "items": [
            {
              "id": "2",
              "name": "Neymar santos special edition Retro Jersey",
              "image": "/images/SANTOS 10 1.jpeg",
              "price": 0,
              "size": "S",
              "quantity": 1,
              "team": "Santos",
              "total": 0
            }
          ],
          "subtotal": 6499,
          "discount": 1299.8000000000002,
          "total": 5209.2,
          "paymentMethod": "cod",
          "shippingAddress": {
            "name": "Irfad",
            "email": "ahmedirfad8@gmail.com",
            "phone": "7736919863",
            "address": "Imad Manzil , Azad Nagar , Chowki",
            "city": "Kasaragod",
            "state": "Kerala",
            "pincode": "671124",
            "landmark": "Near Daffodil Hills"
          },
          "couponApplied": "DRIBBLEFIT20",
          "couponDiscount": 1299.8000000000002,
          "codCharges": 10,
          "trackingNumber": "TRK958844242",
          "addressSource": "saved_address"
        },
        {
          "id": "1764929137632",
          "orderNumber": "ORD-29137631",
          "userId": "1764150476280",
          "username": "Irfad",
          "userEmail": "ahmedirfad8@gmail.com",
          "date": "2025-12-05T10:05:37.632Z",
          "status": "Processing",
          "items": [
            {
              "id": "2",
              "name": "Neymar santos special edition Retro Jersey",
              "image": "/images/SANTOS 10 1.jpeg",
              "price": "₹6,499",
              "size": "M",
              "quantity": 1,
              "team": "Santos",
              "total": null
            },
            {
              "id": "8",
              "name": "Japan x Naruto Uzumaki Retro Jersey",
              "image": "/images/japan-retro-1.webp",
              "price": "₹4,999",
              "size": "XL",
              "quantity": 1,
              "team": "Japan",
              "total": null
            }
          ],
          "subtotal": 11498,
          "discount": 2299.6,
          "total": 9208.4,
          "paymentMethod": "cod",
          "shippingAddress": {
            "name": "Irfad",
            "email": "ahmedirfad8@gmail.com",
            "phone": "7736919863",
            "address": "Imad Manzil , Azad Nagar , Chowki",
            "city": "Kasaragod",
            "state": "Kerala",
            "pincode": "671124",
            "landmark": "Near Daffodil Hills"
          },
          "couponApplied": "DRIBBLEFIT20",
          "couponDiscount": 2299.6,
          "codCharges": 10,
          "trackingNumber": "TRK151383736",
          "addressSource": "saved_address"
        },
        {
          "id": "1764995586188",
          "orderNumber": "ORD-95586188",
          "userId": "1764150476280",
          "username": "Irfad",
          "userEmail": "ahmedirfad8@gmail.com",
          "date": "2025-12-06T04:33:06.188Z",
          "status": "Processing",
          "items": [
            {
              "id": "6",
              "name": "Real Madrid 2025/26 Third Kit",
              "image": "/images/Real 3rd2025-1.webp",
              "price": 0,
              "size": "M",
              "quantity": 1,
              "team": "Real Madrid",
              "total": 0
            },
            {
              "id": "3",
              "name": "Juventus FC 2025/26 Third Kit",
              "image": "/images/juv-third-25-26-1.webp",
              "price": 0,
              "size": "L",
              "quantity": 1,
              "team": "Juventus FC",
              "total": 0
            },
            {
              "id": "8",
              "name": "Japan x Naruto Uzumaki Retro Jersey",
              "image": "/images/japan-retro-1.webp",
              "price": 0,
              "size": "M",
              "quantity": 1,
              "team": "Japan",
              "total": 0
            }
          ],
          "subtotal": 17197,
          "discount": 3439.4,
          "total": 13767.6,
          "paymentMethod": "cod",
          "shippingAddress": {
            "name": "Irfad",
            "email": "ahmedirfad8@gmail.com",
            "phone": "7736919863",
            "address": "Imad Manzil , Azad Nagar , Chowki",
            "city": "Kasaragod",
            "state": "Kerala",
            "pincode": "671124",
            "landmark": "Near Daffodil Hills"
          },
          "couponApplied": "DRIBBLEFIT20",
          "couponDiscount": 3439.4,
          "codCharges": 10,
          "trackingNumber": "TRK129773319",
          "addressSource": "saved_address"
        }
      ],
      "phone": "7736919863",
      "fullName": "Ahmed Irfad",
      "dateOfBirth": "2005-02-05"
    },
    {
      "id": "1764150947274",
      "username": "Azeem",
      "email": "azeeym4@gmail.com",
      "password": "Azeem@2",
      "createdAt": "2025-11-26T09:55:47.274Z",
      "cart": [],
      "addresses": [],
      "orders": [],
      "phone": "",
      "fullName": "",
      "dateOfBirth": ""
    },
    {
      "id": "1764923078286",
      "username": "Adil",
      "email": "adil8@gmail.com",
      "password": "adil123",
      "cart": [
        {
          "id": "2",
          "name": "Neymar santos special edition Retro Jersey",
          "price": "₹6,499",
          "image": "/images/SANTOS 10 1.jpeg",
          "size": "L",
          "quantity": 1,
          "inStock": true,
          "team": "Santos"
        },
        {
          "id": "4",
          "name": "Argentina 2025 Home Kit",
          "price": "₹6,499",
          "image": "/images/arg-2025-1.webp",
          "size": "L",
          "quantity": 1,
          "inStock": true,
          "team": "Argentina"
        }
      ],
      "addresses": [
        {
          "name": "Adil",
          "phone": "7994931322",
          "address": "Kaikamba , Uppala",
          "city": "Kasaragod",
          "state": "Kerala",
          "pincode": "671129",
          "landmark": "Near Sonkal Masjid",
          "isDefault": true
        }
      ],
      "orders": [
        {
          "id": "1764930623701",
          "orderNumber": "ORD-30623701",
          "userId": "1764923078286",
          "username": "Adil",
          "userEmail": "adil8@gmail.com",
          "date": "2025-12-05T10:30:23.701Z",
          "status": "Processing",
          "items": [
            {
              "id": "2",
              "name": "Neymar santos special edition Retro Jersey",
              "image": "/images/SANTOS 10 1.jpeg",
              "price": "₹6,499",
              "size": "S",
              "quantity": 1,
              "team": "Santos",
              "total": null
            },
            {
              "id": "4",
              "name": "Argentina 2025 Home Kit",
              "image": "/images/arg-2025-1.webp",
              "price": "₹6,499",
              "size": "S",
              "quantity": 1,
              "team": "Argentina",
              "total": null
            }
          ],
          "subtotal": 12998,
          "discount": 0,
          "total": 13008,
          "paymentMethod": "cod",
          "shippingAddress": {
            "name": "Adil",
            "email": "adil8@gmail.com",
            "phone": "7994931322",
            "address": "Kaikamba , Uppala",
            "city": "Kasaragod",
            "state": "Kerala",
            "pincode": "671129",
            "landmark": "Near Sonkal Masjid"
          },
          "couponApplied": null,
          "couponDiscount": 0,
          "codCharges": 10,
          "trackingNumber": "TRK607151014",
          "addressSource": "saved_address"
        }
      ],
      "phone": "7994931322",
      "fullName": "Abdul Rahman Adil",
      "dateOfBirth": "2025-03-18",
      "createdAt": "2025-12-05T08:24:38.286Z"
    }
  ],
  "products": [
    {
      "id": "1",
      "name": "Ac Milan 2025/26 Home Kit",
      "price": "₹6,999",
      "originalPrice": "₹7,999",
      "discount": "13% OFF",
      "image": "/images/ac-first-25-26-1.webp",
      "category": "2025-26-season-kits",
      "team": "Ac Milan",
      "league": "Serie A",
      "description": "Official 2025/26 home kit with advanced fabric technology. Features moisture-wicking material and enhanced ventilation.",
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": true
    },
    {
      "id": "2",
      "name": "Neymar santos special edition Retro Jersey",
      "price": "₹6,499",
      "image": "/images/SANTOS 10 1.jpeg",
      "category": "retro-jerseys",
      "team": "Santos",
      "description": "Santos FC vintage football jersey with the number '10' and the name 'Neymar', in a white colorway with black collar and thin orange vertical stripes",
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": false
    },
    {
      "id": "3",
      "name": "Juventus FC 2025/26 Third Kit",
      "price": "₹7,199",
      "originalPrice": "₹8,199",
      "discount": "12% OFF",
      "image": "/images/juv-third-25-26-1.webp",
      "category": "2025-26-season-kits",
      "team": "Juventus FC",
      "league": "Serie A",
      "description": "Limited edition third kit with unique pattern design.",
      "sizes": [
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": false
    },
    {
      "id": "4",
      "name": "Argentina 2025 Home Kit",
      "price": "₹6,499",
      "image": "/images/arg-2025-1.webp",
      "category": "international-kits",
      "team": "Argentina",
      "description": "World Cup champions home kit with star detailing.",
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": false
    },
    {
      "id": "5",
      "name": "Mexico De Oro National Kit",
      "price": "₹5,999",
      "image": "/images/mexico-de-oro-1.webp",
      "category": "international-kits",
      "team": "Mexico",
      "description": "Special edition golden Mexico national team kit made with recycled materials.",
      "sizes": [
        "S",
        "M",
        "L"
      ],
      "inStock": true,
      "featured": true
    },
    {
      "id": "6",
      "name": "Real Madrid 2025/26 Third Kit",
      "price": "₹4,999",
      "originalPrice": "₹5,999",
      "discount": "17% OFF",
      "image": "/images/Real 3rd2025-1.webp",
      "category": "2025-26-season-kits",
      "team": "Real Madrid",
      "league": "La Liga",
      "description": "Elegant away kit for the 2025/26 season with premium design and comfort.",
      "sizes": [
        "S",
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": true
    },
    {
      "id": "7",
      "name": "Fc Barcelona x CJ Retro Jersey",
      "price": "₹4,999",
      "image": "/images/FCB CJ 1.jpeg",
      "category": "retro-jerseys",
      "team": "Fc Barcelona",
      "description": "Classic 2001 Cactus-Jack limited-edition.",
      "sizes": [
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": true
    },
    {
      "id": "8",
      "name": "Japan x Naruto Uzumaki Retro Jersey",
      "price": "₹4,999",
      "originalPrice": "₹5,999",
      "discount": "17% OFF",
      "image": "/images/japan-retro-1.webp",
      "category": "retro-jerseys",
      "team": "Japan",
      "description": "Japan x Naruto Uzumaki special edition football jersey with a Naruto graphic, made of polyester material.",
      "sizes": [
        "M",
        "L",
        "XL"
      ],
      "inStock": true,
      "featured": true
    }
  ]
}

RegisterPage (src/Components/Auth/)

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

const validationSchema = Yup.object({
  username: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
  cpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
})

function RegisterPage() {
  const { register, loading } = useAuth()
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
      
      // goes to login after 1s
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } else {
      setMessage(`❌ ${result.error}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-6">
           <img 
              src="src/assets/DRIBBLEFIT.PNG" 
              alt="DRIBBLEFIT" 
              className=" mx-auto"
            />
          <p className="text-gray-400 text-sm font-light mt-2">CREATE ACCOUNT</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
            message.includes('❌') ? 'bg-red-500/20 text-red-400' : 'bg-[#00ff00]/20 text-[#00ff00]'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-[#111111] border border-[#00ff00]/30 rounded-xl p-6">
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
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                />
                <ErrorMessage name="username" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <Field 
                  type="email" 
                  name="email" 
                  placeholder="Email"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <Field 
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <Field 
                  type="password" 
                  name="cpassword" 
                  placeholder="Confirm Password"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                />
                <ErrorMessage name="cpassword" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00ff00] text-black font-bold py-3 rounded-lg hover:bg-[#00ff00] transition-all text-sm disabled:opacity-50"
              >
                {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              </button>
            </Form>
          </Formik>

          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
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

LoginPage (src/Components/Auth/)

import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext.jsx'

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
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (values) => {
    setMessage('')
    
    const result = await login(values.email, values.password)
    
    if (result.success) {
      setMessage('✅ Login successful!')
      // goes to home after 1sec
      setTimeout(() => {
        navigate('/home')
      }, 1000)
    } else {
      setMessage(`❌ ${result.error}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        
        <div className="text-center mb-6">
          <img 
              src="src/assets/Logo (1).PNG" 
              alt="DRIBBLEFIT" 
              className=" mx-auto"
            />
          <p className="text-gray-400 text-sm font-light mt-2">WELCOME BACK</p>
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm text-center ${
            message.includes('❌') ? 'bg-red-500/20 text-red-400' : 'bg-[#00ff00]/20 text-[#00ff00]'
          }`}>
            {message}
          </div>
        )}

        <div className="bg-[#111111] border border-[#00ff00]/30 rounded-xl p-6">
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
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              <div>
                <Field 
                  type="password" 
                  name="password" 
                  placeholder="Password"
                  className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-3 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                />
                <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-1" />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#00ff00] text-black font-bold py-3 rounded-lg hover:bg-[#00ff00] transition-all text-sm disabled:opacity-50"
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </button>
            </Form>
          </Formik>

          <div className="text-center mt-4 pt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
              New to DribbleFit?{' '}
              <Link to="/register" className="text-[#00ff00] font-semibold hover:underline">
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

AuthContext (src/Contexts/)

// src/Contexts/AuthContext.jsx (COMPLETE VERSION)
import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true) 

  // checking existing user in localstorage
  useEffect(() => {
    const savedUser = localStorage.getItem('dribblefit_user')
    const savedAuth = localStorage.getItem('dribblefit_isAuthenticated')
    
    if (savedUser && savedAuth === 'true') {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('currentUserId', userData.id)
      } catch (error) {
        console.error('Error parsing saved user data:', error)
        localStorage.removeItem('dribblefit_user')
        localStorage.removeItem('dribblefit_isAuthenticated')
        localStorage.removeItem('currentUserId')
      }
    }
    setInitialLoading(false)
  }, [])

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
        cart: [],
        addresses: [], // Add empty addresses array
        orders: [], // Add empty orders array
        phone: '',
        fullName: '',
        dateOfBirth: '',
        createdAt: new Date().toISOString()
      }

      // saves to db
      const response = await api.post('/users', newUser)
      
      // auto-login
      setUser(response.data)
      setIsAuthenticated(true)
      
      // saves to ls
      localStorage.setItem('dribblefit_user', JSON.stringify(response.data))
      localStorage.setItem('dribblefit_isAuthenticated', 'true')
      localStorage.setItem('currentUserId', response.data.id)
      
      return { success: true, user: response.data }
      
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
      
      // Ensure user has required fields (for existing users without these fields)
      if (!user.addresses) user.addresses = []
      if (!user.orders) user.orders = []
      if (!user.phone) user.phone = ''
      if (!user.fullName) user.fullName = ''
      if (!user.dateOfBirth) user.dateOfBirth = ''
      
      setUser(user)
      setIsAuthenticated(true)
      
      localStorage.setItem('dribblefit_user', JSON.stringify(user))
      localStorage.setItem('dribblefit_isAuthenticated', 'true')
      localStorage.setItem('currentUserId', user.id)
      
      return { success: true, user }
      
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('currentUserId')
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('dribblefit_user')
    localStorage.removeItem('dribblefit_isAuthenticated')
  }

  // ADD THIS FUNCTION: Update user profile
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
      
      // Update localStorage
      localStorage.setItem('dribblefit_user', JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
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


Navbar (src/Components/Layout/)

import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { useCart } from '../../Contexts/CartContext'
import { useWishlist } from '../../Contexts/WishlistContext'
import api from '../../Api/Axios.jsx'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
    } catch (error) {
      console.error('Error fetching products for search:', error)
    }
  }

  const categories = [
    '2025-26-season-kits',
    'international-kits',
    'retro-jerseys',
    'anthem-jackets'
  ]

  const getCategoryDisplayName = (category) => {
    const names = {
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits', 
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-yellow-500 text-black'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    
    if (value.trim() === '') {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setLoading(true)
    
    setTimeout(() => {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.team?.toLowerCase().includes(value.toLowerCase()) ||
        product.league?.toLowerCase().includes(value.toLowerCase()) ||
        product.category?.toLowerCase().includes(value.toLowerCase())
      )
      
      setSearchResults(filtered.slice(0, 5))
      setShowResults(true)
      setLoading(false)
    }, 300)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setShowResults(false)
      setIsSearchOpen(false)
    }
  }

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`)
    setSearchTerm('')
    setShowResults(false)
    setIsSearchOpen(false)
  }

  const handleViewAllResults = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
      setSearchTerm('')
      setShowResults(false)
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    showToast('Logged out successfully!', 'success')
    logout()
    setIsMenuOpen(false)
    setShowProfileDropdown(false)
  }

  return (
    <>
      <nav className="bg-[#0a0a0a] border-b border-[#00ff00]/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-6">
              <Link to="/home" className="flex-shrink-0">
                <img 
                  src="/src/assets/DRIBBLEFIT.PNG" 
                  alt="DRIBBLEFIT" 
                  className="h-8"
                />
              </Link>

              <div className="hidden md:block relative">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => searchTerm.trim() && setShowResults(true)}
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                    placeholder="Search jerseys..."
                    className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-64 text-sm placeholder-gray-500"
                  />
                  <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-500 hover:text-[#00ff00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  
                  {showResults && searchTerm.trim() && (
                    <div className="absolute top-full left-0 mt-2 w-96 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                      <div className="p-2">
                        {loading ? (
                          <div className="p-4 text-center">
                            <div className="text-[#00ff00]">Searching...</div>
                          </div>
                        ) : searchResults.length > 0 ? (
                          <>
                            {searchResults.map((product) => (
                              <div
                                key={product.id}
                                onClick={() => handleResultClick(product.id)}
                                className="flex items-center gap-3 p-3 hover:bg-[#00ff00]/10 rounded-lg cursor-pointer transition-colors group"
                              >
                                <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-white text-sm font-poppins font-semibold truncate group-hover:text-[#00ff00] transition-colors">
                                    {product.name}
                                  </div>
                                  <div className="text-gray-400 text-xs flex items-center gap-2">
                                    <span>{product.team}</span>
                                    {product.league && <span>• {product.league}</span>}
                                  </div>
                                  <div className="text-[#00ff00] font-poppins font-bold text-sm mt-1">
                                    {product.price}
                                  </div>
                                </div>
                                <div className="text-gray-400 group-hover:text-[#00ff00] transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            ))}
                            <div className="mt-2 pt-2 border-t border-gray-800">
                              <button
                                onClick={handleViewAllResults}
                                className="w-full text-center text-[#00ff00] font-poppins font-semibold text-sm py-2 hover:bg-[#00ff00]/10 rounded-lg transition-colors"
                              >
                                View all results for "{searchTerm}"
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="p-4 text-center">
                            <div className="text-gray-400">No results found for "{searchTerm}"</div>
                            <div className="text-gray-500 text-xs mt-1">Try different keywords</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/home" className="text-white hover:text-[#00ff00] transition-colors font-medium">
                Home
              </Link>
              <div className="relative group">
                <button className="text-white hover:text-[#00ff00] transition-colors font-medium flex items-center gap-1">
                  Categories
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    {categories.map((category) => (
                      <Link 
                        key={category}
                        to={`/products?category=${category}`}
                        className="block px-4 py-2 text-white hover:bg-[#00ff00] hover:text-black transition-colors"
                      >
                        {getCategoryDisplayName(category)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Link to="/products" className="text-white hover:text-[#00ff00] transition-colors font-medium">
                Products
              </Link>
              <Link to="/contact" className="text-white hover:text-[#00ff00] transition-colors font-medium">
                Contact Us
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen)
                  setShowResults(false)
                }}
                className="md:hidden text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {isAuthenticated && user && (
                <div className="hidden sm:block text-sm text-gray-300">
                  Welcome, <span className="text-[#00ff00] font-medium">{user.username}</span>
                </div>
              )}

              <Link to="/wishlist" className="relative text-gray-400 hover:text-red-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </Link>

              <Link to="/cart" className="relative text-gray-400 hover:text-[#00ff00] transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#00ff00] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-2 text-white hover:text-[#00ff00] transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center font-bold text-black">
                      {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${showProfileDropdown ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* UPDATED PROFILE DROPDOWN */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl z-50 animate-fade-in overflow-hidden">
                      <div className="p-4 border-b border-gray-800 bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a]">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center font-bold text-black text-xl">
                            {user.username?.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-white font-poppins font-semibold text-lg truncate">
                              {user.username}
                            </div>
                            <div className="text-gray-400 text-sm truncate">{user.email}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Member since: {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#00ff00]/10 hover:text-[#00ff00] transition-colors duration-200 border-b border-gray-800/50"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">My Profile</div>
                            <div className="text-xs text-gray-500">View & edit profile</div>
                          </div>
                        </Link>
                        
                        <Link
                          to="/address"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#00ff00]/10 hover:text-[#00ff00] transition-colors duration-200 border-b border-gray-800/50"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">My Addresses</div>
                            <div className="text-xs text-gray-500">Manage shipping addresses</div>
                          </div>
                        </Link>
                        
                        <Link
                          to="/orders"
                          onClick={() => setShowProfileDropdown(false)}
                          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-[#00ff00]/10 hover:text-[#00ff00] transition-colors duration-200 border-b border-gray-800/50"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <div className="flex-1">
                            <div className="font-medium">My Orders</div>
                            <div className="text-xs text-gray-500">View order history</div>
                          </div>
                        </Link>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <div className="flex-1 text-left">
                            <div className="font-medium">Logout</div>
                            <div className="text-xs text-red-400/70">Sign out of your account</div>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#00ff00] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#00ff00]/90 transition-colors text-sm"
                >
                  Login
                </Link>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-400 hover:text-[#00ff00] transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="md:hidden pb-4 relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  onFocus={() => searchTerm.trim() && setShowResults(true)}
                  placeholder="Search jerseys..."
                  className="bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] w-full text-sm placeholder-gray-500"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-500 hover:text-[#00ff00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
              
              {showResults && searchTerm.trim() && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
                  <div className="p-2">
                    {loading ? (
                      <div className="p-4 text-center">
                        <div className="text-[#00ff00]">Searching...</div>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        {searchResults.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleResultClick(product.id)}
                            className="flex items-center gap-3 p-3 hover:bg-[#00ff00]/10 rounded-lg cursor-pointer transition-colors group"
                          >
                            <div className="w-12 h-12 bg-[#2a2a2a] rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-200"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-white text-sm font-poppins font-semibold truncate group-hover:text-[#00ff00] transition-colors">
                                {product.name}
                              </div>
                              <div className="text-gray-400 text-xs">
                                {product.team}
                              </div>
                              <div className="text-[#00ff00] font-poppins font-bold text-sm mt-1">
                                {product.price}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="mt-2 pt-2 border-t border-gray-800">
                          <button
                            onClick={handleViewAllResults}
                            className="w-full text-center text-[#00ff00] font-poppins font-semibold text-sm py-2 hover:bg-[#00ff00]/10 rounded-lg transition-colors"
                          >
                            View all results for "{searchTerm}"
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center">
                        <div className="text-gray-400">No results found for "{searchTerm}"</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1a1a] border-t border-gray-800">
            <div className="px-4 py-4 space-y-4">
              <Link to="/home" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                All Products
              </Link>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link 
                    key={category}
                    to={`/products?category=${category}`}
                    className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {getCategoryDisplayName(category)}
                  </Link>
                ))}
              </div>
              <Link to="/contact" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
              <Link to="/cart" className="block text-white hover:text-[#00ff00] transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <Link to="/wishlist" className="block text-white hover:text-red-500 transition-colors font-medium" onClick={() => setIsMenuOpen(false)}>
                Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              
              {/* UPDATED MOBILE MENU - ADD ACCOUNT LINKS */}
              {isAuthenticated && user && (
                <>
                  <div className="pt-4 border-t border-gray-800 text-sm text-gray-300">
                    Welcome, <span className="text-[#00ff00] font-medium">{user.username}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-800">
                    <div className="text-sm text-gray-500 mb-2">MY ACCOUNT</div>
                    <Link 
                      to="/profile" 
                      className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/address" 
                      className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Addresses
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block text-gray-400 hover:text-[#00ff00] transition-colors text-sm pl-4"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-red-400 hover:text-red-300 transition-colors text-sm pl-4 mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </>
  )
}

export default Navbar


SaleBanner (src/Components/Home/)

import React, { useState, useEffect } from 'react'

function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    // getting current year and putting xmas on dec 25
    const currentYear = new Date().getFullYear()
    const christmas = new Date(`December 25, ${currentYear} 00:00:00`).getTime()
    const now = new Date().getTime()
    const difference = christmas - now

    // if xmas not in this year, set to nxt year
    if (difference < 0) {
      const nextYear = currentYear + 1
      const nextChristmas = new Date(`December 25, ${nextYear} 00:00:00`).getTime()
      const newDifference = nextChristmas - now
      
      return {
        days: Math.floor(newDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((newDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((newDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((newDifference % (1000 * 60)) / 1000)
      }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-[#0a0a0a] border-b border-[#00ff00]/20 py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs">
        
        
        <div className="flex items-center gap-4">
          {Object.entries(timeLeft).map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="text-[#00ff00] font-bold text-lg">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-400 text-xs uppercase tracking-wide">
                {label.charAt(0)}
              </div>
            </div>
          ))}
        </div>

        
        <div className="text-gray-300 text-center">
          <span className="font-medium">CHRISTMAS SALE • UP TO 50% OFF • ENDS DECEMBER 25TH</span>
        </div>

      </div>
    </div>
  )
}

export default SaleBanner

HeroBanner (src/Components/Home/)

import React from 'react'
import { useNavigate } from 'react-router-dom'

function HeroBanner() {
  const navigate = useNavigate()

  const handleViewCollection = () => {
    navigate('/products')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      
      {/* Bg image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="src/assets/kitsmain2-min.webp" 
          alt="Football Kits Collection"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
      </div>

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full lg:w-1/2">
          
          
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            ELEVATE YOUR 
            <span className="text-[#00ff00] block">GAME STYLE</span>
          </h1>

          
          <p className="text-gray-300 text-lg lg:text-xl mb-8 max-w-lg">
            Discover authentic football jerseys from top leagues worldwide. 
            Limited editions, exclusive designs, and unbeatable quality.
          </p>

          {/* view coll - button */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            
            <button 
              onClick={handleViewCollection}
              className="group border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm uppercase tracking-wider relative overflow-hidden"
            >
              <span className="relative z-10">View Collection</span>
              
              <div className="absolute inset-0 bg-[#00ff00] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          <div className="flex flex-wrap gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-2 h-2 bg-[#00ff00] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
              <span className="group-hover:text-white transition-colors duration-200">Authentic Jerseys</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-2 h-2 bg-[#00ff00] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
              <span className="group-hover:text-white transition-colors duration-200">Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-2 h-2 bg-[#00ff00] rounded-full group-hover:scale-125 transition-transform duration-200"></div>
              <span className="group-hover:text-white transition-colors duration-200">Limited Editions</span>
            </div>
          </div>

        </div>
      </div>

      {/* scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00ff00] rounded-full flex justify-center group cursor-pointer">
            <div className="w-1 h-3 bg-[#00ff00] rounded-full mt-2 group-hover:scale-110 transition-transform duration-200"></div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeroBanner

InternationalKits (src/Components/Home/)

import React from 'react'
import { useNavigate } from 'react-router-dom'

function InternationalKits() {
  const navigate = useNavigate()

  const handleShopNow = () => {
    navigate('/products?category=international-kits')
  }

  return (
    <div className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="min-h-[70vh] flex items-center justify-center py-20">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="src/assets/portugal19-min.webp" 
            alt="International Football Kits"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/40"></div>
        </div>

       
        <div className="relative z-10 w-full text-center px-4 space-y-8">
          

          <h2 className="text-4xl md:text-6xl font-bold text-white font-poppins tracking-tight">
            INTERNATIONAL <span className="text-[#00ff00]">KITS</span>
          </h2>
          
          <p className="text-gray-200 text-xl font-poppins tracking-widest uppercase">
            STARTING AT
          </p>
          
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-2xl text-gray-200 font-poppins">₹</span>
            <span className="text-7xl md:text-8xl font-bold text-white font-poppins tracking-tighter">699</span>
          </div>

          <div className="pt-4">
            <button 
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-14 py-4 rounded-lg hover:shadow-[0_0_25px_rgba(0,255,0,0.6)] hover:bg-[#00ff00]/90 transition-all duration-300 text-sm uppercase tracking-widest font-poppins"
            >
              Shop Now
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default InternationalKits

BestSellers (src/Components/Home/)

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../Contexts/CartContext'
import WishlistButton from '../Common/WishlistButton'

function BestSellers() {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [imageIndex, setImageIndex] = useState({ 1: 0, 2: 0, 3: 0 })

  // Update the bestSellers data structure to have proper 'id' field
  const bestSellers = [
    {
      id: 7, // Use productId as id for WishlistButton
      bestsellerId: 1,
      name: "BARCELONA X TRAVIS SCOTT SPECIAL EDITION KIT",
      price: "₹4,999",
      images: [
        "src/assets/FCB CJ 1.jpeg", 
        "src/assets/FCB CJ 2.jpeg", 
        "src/assets/FCB CJ 3.jpeg"
      ],
      team: "Barcelona",
      inStock: true,
      sizes: ['M', 'L', 'XL']
    },
    {
      id: 6, // Use productId as id for WishlistButton
      bestsellerId: 2,
      name: "REAL MADRID 25-26 THIRD KIT",
      price: "₹4,999",
      images: [
        "src/assets/Real 3rd2025-1.webp", 
        "src/assets/Real 3rd2025-2.webp", 
        "src/assets/Real 3rd2025-3.webp"
      ],
      team: "Real Madrid",
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2, // Use productId as id for WishlistButton
      bestsellerId: 3,
      name: "NEYMAR SANTOS SPECIAL EDITION PREMIUM KIT",
      price: "₹6,499",
      images: [
        "src/assets/SANTOS 10 1.jpeg", 
        "src/assets/SANTOS 10 2.jpeg", 
        "src/assets/SANTOS 10 4.jpeg"
      ],
      team: "Santos",
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL']
    }
  ]

  const handleImageHover = (bestsellerId) => {
    setImageIndex(prev => ({
      ...prev,
      [bestsellerId]: (prev[bestsellerId] + 1) % 3
    }))
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  const handleAddToCart = (product) => {
    if (!product.inStock) {
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = `Sorry! ${product.name} is out of stock`
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
      return
    }
    
    const cartProduct = {
      id: product.id, // Use product.id instead of product.productId
      name: product.name,
      price: product.price,
      image: product.images[0],
      team: product.team,
      inStock: product.inStock
    }
    
    addToCart(cartProduct, 'M', 1)
    
    const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = `Added ${product.name} to cart!`
      document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className="bg-gradient-to-br from-[#0a0a0a] to-[#001a00] py-20 px-4 border-y border-[#00ff00]/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            BEST <span className="text-[#00ff00]">SELLERS</span>
          </h2>
          <p className="text-gray-400 text-lg font-poppins max-w-2xl mx-auto">
            Discover our most popular football jerseys loved by fans worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestSellers.map((product) => (
            <div 
              key={product.bestsellerId}
              className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 flex flex-col group"
            >
              
              <div 
                className="relative h-80 mb-6 overflow-hidden rounded-xl bg-[#1a1a1a] cursor-pointer flex-shrink-0"
                onMouseEnter={() => handleImageHover(product.bestsellerId)}
                onClick={() => handleViewDetails(product.id)} // Use product.id
              >
                <div className="relative w-full h-full">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageIndex[product.bestsellerId] === 0 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  />
                  <img 
                    src={product.images[1]} 
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageIndex[product.bestsellerId] === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  />
                  <img 
                    src={product.images[2]} 
                    alt={product.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                      imageIndex[product.bestsellerId] === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}
                  />
                </div>

                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {[0, 1, 2].map((dotIndex) => (
                    <div 
                      key={dotIndex}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        imageIndex[product.bestsellerId] === dotIndex ? 'bg-[#00ff00]' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Wishlist Button - Top Right */}
                <div className="absolute top-3 right-3 z-10">
                  <WishlistButton product={product} size="sm" />
                </div>

                <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  Hover to scroll
                </div>

                {!product.inStock && (
                  <div className="absolute top-3 left-10 bg-red-500 text-white font-bold px-3 py-1 rounded text-xs">
                    OUT OF STOCK
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-white font-poppins font-semibold text-sm mb-3 line-clamp-2 leading-tight min-h-[2.8rem] text-center group-hover:text-[#00ff00] transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <div className="text-center mb-2">
                    <span className="text-gray-400 text-xs font-poppins">
                      {product.team}
                    </span>
                  </div>
                  
                  <div className="h-12 flex items-center justify-center mb-4">
                    <p className="text-[#00ff00] font-poppins font-bold text-xl text-center">
                      {product.price}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`flex-1 font-poppins font-bold py-3 rounded-lg transition-all duration-300 text-sm uppercase tracking-wider group/btn ${
                      product.inStock 
                        ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]' 
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <span className="group-hover/btn:scale-105 transition-transform duration-200">
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </span>
                  </button>
                  <button 
                    onClick={() => handleViewDetails(product.id)} // Use product.id
                    className="px-4 bg-transparent border border-[#00ff00] text-[#00ff00] font-poppins font-bold py-3 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm"
                  >
                    View
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleShopNow}
            className="border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold px-12 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm uppercase tracking-wider"
          >
            VIEW ALL PRODUCTS
          </button>
        </div>

      </div>
    </div>
  )
}

export default BestSellers

PassionSection (src/Components/Home/)

import React from 'react'
import { useNavigate } from 'react-router-dom'

function PassionSection() {
  const navigate = useNavigate()

  const handleExploreAll = () => {
    navigate('/products')
  }

  return (
    <div className="relative py-24 px-4">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="src/assets/wirtzzz.jpeg" 
          alt="Football Passion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        <h1 className="text-4xl md:text-6xl font-bold text-white font-poppins mb-6">
          WEAR YOUR <span className="text-[#00ff00]">PASSION.</span>
          <br />
          OWN THE <span className="text-[#00ff00]">GAME.</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl font-poppins mb-10 max-w-xl mx-auto">
          Shop by teams that rule the game.
        </p>

        <button 
          onClick={handleExploreAll}
          className="border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold px-12 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm uppercase tracking-wider"
        >
          EXPLORE ALL
        </button>

      </div>
    </div>
  )
}

export default PassionSection

PromoCategories (src/Components/Home/)

import React from 'react'
import { useNavigate } from 'react-router-dom'

function PromoCategories() {
  const navigate = useNavigate()

  const promoItems = [
    {
      id: 1,
      name: "RETRO JERSEYS",
      count: "180",
      image: "src/assets/retro-jersey-main.webp",
      route: "/products?category=retro-jerseys"
    },
    {
      id: 2,
      name: "ANTHEM JACKETS",
      count: "22", 
      image: "src/assets/city-jackets.webp",
      route: "/products?category=anthem-jackets"
    },
    {
      id: 3,
      name: "2025/26 SEASON KITS",
      count: "37",
      image: "src/assets/real3bs.jpg",
      route: "/products?category=2025-26-season-kits"
    }
  ]

  const handleCardClick = (route) => {
    navigate(route)
  }

  const handleNameClick = (e, route) => {
    e.stopPropagation() 
    navigate(route)
  }

  return (
    <div className="bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            EXPLORE <span className="text-[#00ff00]">COLLECTIONS</span>
          </h2>
          <p className="text-gray-400 text-lg font-poppins max-w-2xl mx-auto">
            Discover our curated collections for every football enthusiast
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promoItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 cursor-pointer flex flex-col"
              onClick={() => handleCardClick(item.route)}
            >
              
              <div className="relative h-80 mb-6 overflow-hidden rounded-xl bg-[#1a1a1a] flex-shrink-0">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <div>

                  <h3 
                    onClick={(e) => handleNameClick(e, item.route)}
                    className="text-white font-poppins font-semibold text-lg mb-3 text-center cursor-pointer hover:text-[#00ff00] transition-colors duration-200 group-hover:underline"
                  >
                    {item.name}
                  </h3>
                  

                  <div className="h-12 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <p className="text-[#00ff00] font-poppins font-bold text-2xl">
                        {item.count}
                      </p>
                      <p className="text-gray-400 font-poppins text-xs mt-1">
                        ITEMS AVAILABLE
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default PromoCategories

MexicoDeOro (src/Components/Home/)

import React from 'react'
import { useNavigate } from 'react-router-dom'

function MexicoDeOro() {
  const navigate = useNavigate()

  const handleShopNow = () => {
    navigate('/product/5')
  }

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="src/assets/mexico-jersey-poster.jpg"
        >
          <source src="src/assets/Mexico-de-oro.mp4" type="video/mp4" />
          <img 
            src="src/assets/mexico-de-oro.webp" 
            alt="Mexico De Oro Jersey" 
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide uppercase">
          MEXICO DE ORO
        </h1>

        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed uppercase">
          A JERSEY THAT SHOWS YOU TREASURE MEXICAN CULTURE, 
          <span className="block">MADE WITH RECYCLED MATERIALS.</span>
        </p>

       
        <button 
          onClick={handleShopNow}
          className="group bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:border-[#00ff00] hover:text-black transition-all duration-300 text-sm uppercase tracking-wider flex items-center gap-2 mx-auto"
        >
          SHOP NOW
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </button>

      </div>

    </div>
  )
}

export default MexicoDeOro

AnimatedFeatures (src/Components/Home/)

import React from 'react'

function AnimatedFeatures() {
  const features = [
    {
      id: 1,
      title: "PROVED QUALITY",
      description: "100% authentic jerseys with quality assurance",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      title: "PREMIUM, PRICED RIGHT", 
      description: "Competitive prices for premium quality products",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      id: 3,
      title: "FRESH WEEKLY DROPS",
      description: "New arrivals every week to keep your collection fresh",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 4,
      title: "TRUSTED SUPPORT",
      description: "24/7 customer support for all your needs",
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ]

  return (
    <>
      <style>
        {`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }
        `}
      </style>

      <div className="bg-[#111111] py-20 border-y border-[#00ff00]/10">
        <div className="max-w-7xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.id}
                className="text-center group p-6 rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#111111] border border-[#00ff00]/10 hover:border-[#00ff00]/40 hover:shadow-2xl hover:shadow-[#00ff00]/10 transition-all duration-500 transform hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
                }}
              >
                <div className="w-16 h-16 bg-[#00ff00]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00ff00]/20 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-white font-poppins font-bold text-lg mb-3 uppercase tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default AnimatedFeatures

Home (src/Pages/)

import React from 'react'
import SaleBanner from '../Components/Home/SaleBanner'
import Navbar from '../Components/Layout/Navbar'
import HeroBanner from '../Components/Home/HeroBanner'
import InternationalKits from '../Components/Home/InternationalKits'
import BestSellers from '../Components/Home/BestSellers'
import PassionSection from '../Components/Home/PassionSection'
import PromoCategories from '../Components/Home/PromoCategories'
import MexicoDeOro from '../Components/Home/MexicoDeOro'
import AnimatedFeatures from '../Components/Home/AnimatedFeatures'
import Footer from '../Components/Layout/Footer'

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SaleBanner />
      <Navbar />
      <HeroBanner />
      <InternationalKits />
      <BestSellers />
      <PassionSection/>
      <PromoCategories />
      <MexicoDeOro />
      <AnimatedFeatures />
      <Footer />
    </div>
  )
}

export default Home

Footer (src/Components/Layout/)

import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#00ff00]/20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/src/assets/DRIBBLEFIT.PNG" 
                alt="DRIBBLEFIT" 
                className="h-8"
              />
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your ultimate destination for authentic football jerseys. Wear your passion, own the game with premium quality kits from top leagues worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-poppins font-semibold text-lg mb-6 uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products?category=2025-26-season-kits" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">2025/26 Season Kits</Link>
              </li>
              <li>
                <Link to="/products?category=international-kits" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">International Kits</Link>
              </li>
              <li>
                <Link to="/products?category=retro-jerseys" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Retro Jerseys</Link>
              </li>
              <li>
                <Link to="/products?category=anthem-jackets" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Anthem Jackets</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">All Products</Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h3 className="text-white font-poppins font-semibold text-lg mb-6 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Contact Us</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Returns & Exchanges</Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Size Guide</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/care" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">Jersey Care</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-poppins font-semibold text-lg mb-6 uppercase tracking-wider">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive offers, new arrivals, and football updates
            </p>
            <div className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
              />
              <button className="bg-[#00ff00] text-black font-poppins font-bold py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm uppercase tracking-wider">
                Subscribe
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 DRIBBLEFIT. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-[#00ff00] transition-colors duration-200 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

Products (src/Components/Products/)

import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../../Api/Axios.jsx'
import { useCart } from '../../Contexts/CartContext'
import WishlistButton from '../Common/WishlistButton' // Add this import
import Navbar from '../Layout/Navbar.jsx'

function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { addToCart } = useCart()
  
  const [searchParams] = useSearchParams()
  const urlCategory = searchParams.get('category')
  const urlSearch = searchParams.get('search') 

  const categories = [
    'all',
    '2025-26-season-kits',
    'international-kits',
    'retro-jerseys',
    'anthem-jackets'
  ]

  const getCategoryDisplayName = (category) => {
    const names = {
      'all': 'All Products',
      '2025-26-season-kits': '2025/26 Season Kits',
      'international-kits': 'International Kits', 
      'retro-jerseys': 'Retro Jerseys',
      'anthem-jackets': 'Anthem Jackets'
    }
    return names[category] || category
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory)
    }
    if (urlSearch) {
      setSearchTerm(urlSearch) 
    }
  }, [urlCategory, urlSearch]) 

  
  useEffect(() => {
    filterProducts()
  }, [products, selectedCategory, searchTerm])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  const filterProducts = () => {
    let filtered = products

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category === selectedCategory
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.league?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
  }

  const handleAddToCart = (product) => {
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M'
    addToCart(product, defaultSize, 1)
    
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Added ${product.name} to cart!`
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-[#00ff00] text-lg">Loading products...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            OUR <span className="text-[#00ff00]">COLLECTIONS</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Explore our complete range of football jerseys and accessories
          </p>
          
          
          {searchTerm && (
            <div className="mt-4">
              <p className="text-[#00ff00]">
                Showing results for: <span className="font-bold">"{searchTerm}"</span>
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {getCategoryDisplayName(category)}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex-1 relative">
            <input
              type="text"
              placeholder="Search jerseys, teams, leagues..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 pl-10 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-500"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-4 h-4 text-gray-500 hover:text-[#00ff00] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </form>
        </div>

        {/* products-count */}
        <div className="text-gray-400 mb-6">
          Showing {filteredProducts.length} of {products.length} products
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedCategory !== 'all' && ` in ${getCategoryDisplayName(selectedCategory)}`}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">
              No products found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== 'all' && ` in ${getCategoryDisplayName(selectedCategory)}`}
            </div>
            <button 
              onClick={() => {
                setSelectedCategory('all')
                setSearchTerm('')
              }}
              className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-4 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 group"
              >

                <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-[#1a1a1a]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Wishlist Button - Top Right */}
                  <div className="absolute top-2 right-2 z-10">
                    <WishlistButton product={product} size="sm" />
                  </div>
                  
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-[#00ff00] text-black font-bold px-2 py-1 rounded text-xs">
                      {product.discount}
                    </div>
                  )}
                  {!product.inStock && (
                    <div className="absolute top-2 right-10 bg-red-500 text-white font-bold px-2 py-1 rounded text-xs">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* product-info */}
                <div className="p-2">
                  <h3 className="text-white font-poppins font-semibold text-sm mb-2 line-clamp-2 min-h-[2.8rem]">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-xs">
                      {product.team} {product.league && `• ${product.league}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#00ff00] font-poppins font-bold text-lg">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 text-sm line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className={`flex-1 font-poppins font-bold py-2 rounded-lg transition-all duration-300 text-sm ${
                        product.inStock 
                          ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)]' 
                          : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <Link 
                      to={`/product/${product.id}`}
                      className="bg-transparent border border-[#00ff00] text-[#00ff00] font-poppins font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Products

ProductsDetail (src/Components/Products/)

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../Contexts/AuthContext'
import { useCart } from '../../Contexts/CartContext'
import api from '../../Api/Axios'
import Navbar from '../Layout/Navbar'
import Footer from '../Layout/Footer'
import WishlistButton from '../Common/WishlistButton' // Add this import

function ProductsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [id])

  useEffect(() => {
    if (product) {
      fetchRelatedProducts()
    }
  }, [product])

  const fetchProduct = async () => {
    try {
      const response = await api.get('/products')
      const foundProduct = response.data.find(p => p.id.toString() === id)
      
      if (foundProduct) {
        setProduct(foundProduct)
        if (foundProduct.sizes && foundProduct.sizes.length > 0) {
          setSelectedSize(foundProduct.sizes[0])
        }
      } else {
        setProduct(null)
      }
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
      setProduct(null)
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await api.get('/products')
      const related = response.data
        .filter(p => p.id.toString() !== id && p.category === product.category)
        .slice(0, 4)
      setRelatedProducts(related)
    } catch (error) {
      console.error('Error fetching related products:', error)
    }
  }

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-yellow-500 text-black'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size', 'error')
      return
    }
    
    if (!product.inStock) {
      showToast(`Sorry! ${product.name} is out of stock`, 'error')
      return
    }
    
    addToCart(product, selectedSize, quantity)
    showToast(`Added ${product.name} (${selectedSize}) to cart!`, 'success')
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size', 'error')
      return
    }
    
    if (!product.inStock) {
      showToast(`Sorry! ${product.name} is out of stock`, 'error')
      return
    }
    
    if (!isAuthenticated) {
      showToast('Please login to proceed with purchase', 'error')
      navigate('/login')
      return
    }
    
    addToCart(product, selectedSize, quantity)
    navigate('/cart')
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <div className="text-[#00ff00] text-lg">Loading product...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 text-center">
          <div className="text-white text-2xl mb-4">Product not found</div>
          <Link 
            to="/products" 
            className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      
      <div className="pt-24 max-w-7xl mx-auto px-4">
        <div className="text-sm text-gray-400 mb-8">
          <Link to="/" className="hover:text-[#00ff00] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#00ff00] transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 relative">
            <img 
              src={`http://localhost:5173/${product?.image}`}
              alt={product?.name}
              className="w-full object-cover rounded-xl"
            />
            
            {/* Wishlist Button on Product Image */}
            <div className="absolute top-4 right-4 z-10">
              <WishlistButton product={product} size="md" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#00ff00] font-poppins font-bold text-2xl">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 text-lg line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-[#00ff00] text-black font-bold px-3 py-1 rounded text-sm">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <span>Team: {product.team}</span>
                  {product.league && <span>League: {product.league}</span>}
                  <span className={`flex items-center gap-1 ${product.inStock ? 'text-[#00ff00]' : 'text-red-500'}`}>
                    <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-[#00ff00]' : 'bg-red-500'}`}></div>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              {/* Wishlist Button in Header for mobile/tablet */}
              <div className="lg:hidden">
                <WishlistButton product={product} size="md" />
              </div>
            </div>

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
              <h3 className="text-white font-poppins font-semibold mb-3">Description</h3>
              <p className="text-gray-400 leading-relaxed">{product.description}</p>
            </div>

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
              <h3 className="text-white font-poppins font-semibold mb-4">Select Size</h3>
              <div className="grid grid-cols-4 gap-3">
                {product.sizes && product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-poppins font-bold transition-all duration-300 ${
                      selectedSize === size
                        ? 'border-[#00ff00] bg-[#00ff00] text-black shadow-lg shadow-[#00ff00]/30'
                        : 'border-[#00ff00]/30 text-white hover:border-[#00ff00] hover:bg-[#00ff00]/10'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-white font-poppins font-semibold">Quantity:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-white font-poppins font-bold text-lg w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock || !selectedSize}
                    className={`flex-1 font-poppins font-bold py-4 rounded-lg transition-all duration-300 text-sm ${
                      product.inStock && selectedSize
                        ? 'bg-[#00ff00] text-black hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={!product.inStock || !selectedSize}
                    className={`flex-1 font-poppins font-bold py-4 rounded-lg transition-all duration-300 text-sm ${
                      product.inStock && selectedSize
                        ? 'bg-transparent border-2 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-black hover:shadow-[0_0_20px_rgba(0,255,0,0.4)]'
                        : 'bg-gray-600 text-gray-300 cursor-not-allowed border-gray-600'
                    }`}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                <div className="text-[#00ff00] font-poppins font-bold text-sm mb-1">Free Shipping</div>
                <div className="text-gray-400 text-xs">On orders over ₹5,000</div>
              </div>
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                <div className="text-[#00ff00] font-poppins font-bold text-sm mb-1">30-Day Returns</div>
                <div className="text-gray-400 text-xs">Easy return policy</div>
              </div>
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-4">
                <div className="text-[#00ff00] font-poppins font-bold text-sm mb-1">Authentic</div>
                <div className="text-gray-400 text-xs">100% genuine products</div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white font-poppins mb-8 text-center">
              RELATED <span className="text-[#00ff00]">PRODUCTS</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-4 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 group"
                >
                  <div className="relative h-48 mb-4 overflow-hidden rounded-xl bg-[#1a1a1a]">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Wishlist Button on Related Products */}
                    <div className="absolute top-2 right-2 z-10">
                      <WishlistButton product={relatedProduct} size="sm" />
                    </div>
                  </div>
                  <h3 className="text-white font-poppins font-semibold text-sm mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#00ff00] font-poppins font-bold">
                      {relatedProduct.price}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {relatedProduct.team}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ProductsDetail

CartContext (src/Contexts/)

import React, { createContext, useState, useContext, useEffect } from 'react'
import api from '../Api/Axios.jsx'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    loadCartFromDB()
  }, [])

  // Load cart from db.json
  const loadCartFromDB = async () => {
    try {
      const currentUserId = localStorage.getItem('currentUserId')
      
      if (currentUserId) {
        const response = await api.get(`/users/${currentUserId}`)
        const user = response.data
        
        if (user && user.cart) {
          setCartItems(user.cart)
          updateCartCount(user.cart)
        } else {
          setCartItems([])
          updateCartCount([])
        }
      } else {
        const savedCart = localStorage.getItem('dribblefit-cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setCartItems(parsedCart)
          updateCartCount(parsedCart)
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error)
      const savedCart = localStorage.getItem('dribblefit-cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
        updateCartCount(parsedCart)
      }
    } finally {
      setIsInitialized(true)
    }
  }

  // Save cart to db.json
  const saveCartToDB = async (items) => {
    try {
      const currentUserId = localStorage.getItem('currentUserId')
      
      if (currentUserId) {
        await api.patch(`/users/${currentUserId}`, {
          cart: items
        })
      } else {
        localStorage.setItem('dribblefit-cart', JSON.stringify(items))
      }
    } catch (error) {
      console.error('Error saving cart:', error)
      localStorage.setItem('dribblefit-cart', JSON.stringify(items))
    }
  }

  // Auto-save when cart changes
  useEffect(() => {
    if (isInitialized && cartItems.length >= 0) {
      saveCartToDB(cartItems)
    }
  }, [cartItems, isInitialized])

  const updateCartCount = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0)
    setCartCount(count)
  }

  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === size
      )

      let newItems
      if (existingItem) {
        newItems = prevItems.map(item =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size: size,
          quantity: quantity,
          inStock: product.inStock,
          team: product.team
        }
        newItems = [...prevItems, newItem]
      }
      
      // UPDATE CART COUNT IMMEDIATELY
      updateCartCount(newItems)
      
      return newItems
    })
  }

  const removeFromCart = (productId, size) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => !(item.id === productId && item.size === size))
      
      // UPDATE CART COUNT IMMEDIATELY
      updateCartCount(newItems)
      
      return newItems
    })
  }

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId, size)
      return
    }

    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
      
      // UPDATE CART COUNT IMMEDIATELY
      updateCartCount(newItems)
      
      return newItems
    })
  }

  const clearCart = () => {
    setCartItems([])
    updateCartCount([])
  }

  const applyCoupon = (coupon) => {
    setAppliedCoupon(coupon)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceString = item.price.replace('₹', '').replace(',', '')
      const price = parseFloat(priceString)
      return total + (price * item.quantity)
    }, 0)
  }

  const getCouponDiscount = () => {
    if (!appliedCoupon) return 0
    const subtotal = getCartTotal()
    return subtotal * (appliedCoupon.discount / 100)
  }

  const getFinalTotal = () => {
    const subtotal = getCartTotal()
    const discount = getCouponDiscount()
    return subtotal - discount
  }

  const getCartItemCount = (productId, size) => {
    const item = cartItems.find(item => item.id === productId && item.size === size)
    return item ? item.quantity : 0
  }

  const syncCartOnLogin = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}`)
      const user = response.data
      
      const guestCartJson = localStorage.getItem('dribblefit-cart')
      const guestCart = guestCartJson ? JSON.parse(guestCartJson) : []
      
      const mergedCart = mergeCarts(user.cart || [], guestCart)
      
      setCartItems(mergedCart)
      updateCartCount(mergedCart)
      
      await api.patch(`/users/${userId}`, {
        cart: mergedCart
      })
      
      localStorage.removeItem('dribblefit-cart')
      
    } catch (error) {
      console.error('Error syncing cart on login:', error)
    }
  }

  const mergeCarts = (dbCart, localCart) => {
    const merged = [...dbCart]
    
    localCart.forEach(localItem => {
      const existingItem = merged.find(item => 
        item.id === localItem.id && item.size === localItem.size
      )
      
      if (existingItem) {
        existingItem.quantity += localItem.quantity
      } else {
        merged.push(localItem)
      }
    })
    
    return merged
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      appliedCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      applyCoupon,
      removeCoupon,
      getCartTotal,
      getCouponDiscount,
      getFinalTotal,
      getCartItemCount,
      syncCartOnLogin
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}


Cart (src/Pages/)

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Contexts/CartContext'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Contexts/CartContext'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getCouponDiscount,
    getFinalTotal
  } = useCart()
  
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  
  const [couponCode, setCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')

  const handleQuantityChange = (productId, size, newQuantity) => {
    updateQuantity(productId, size, newQuantity)
  }

  const handleRemoveItem = (productId, size) => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      removeFromCart(productId, size)
    }
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed with checkout')
      navigate('/login')
      return
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }

    navigate('/checkout')
  }

  const handleContinueShopping = () => {
    navigate('/products')
  }

  const handleApplyCoupon = () => {
    setCouponError('')
    
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }

    if (couponCode.toUpperCase() === 'DRIBBLEFIT20') {
      applyCoupon({ 
        discount: 20, 
        type: 'percentage', 
        message: '20% off your entire order!',
        code: 'DRIBBLEFIT20'
      })
      setCouponError('')
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
      removeCoupon()
    }
  }

  const handleRemoveCoupon = () => {
    removeCoupon()
    setCouponCode('')
    setCouponError('')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-[#00ff00] text-6xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins">
            SHOPPING <span className="text-[#00ff00]">CART</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 transition-colors text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div 
                key={`${item.id}-${item.size}`}
                className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 hover:border-[#00ff00]/40 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-xl bg-[#1a1a1a]"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-poppins font-semibold text-lg">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.size)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-gray-400 text-sm mb-4">
                      <div>Team: {item.team}</div>
                      <div>Size: {item.size}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="text-white font-poppins font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 bg-[#1a1a1a] border border-[#00ff00]/30 text-white rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-[#00ff00] font-poppins font-bold text-lg">
                        {item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-poppins font-semibold text-xl mb-6">
                ORDER SUMMARY
              </h3>

              <div className="mb-6">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Enter DRIBBLEFIT20"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:border-[#00ff00] text-sm placeholder-gray-500"
                    disabled={appliedCoupon}
                  />
                  {appliedCoupon ? (
                    <button
                      onClick={handleRemoveCoupon}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={handleApplyCoupon}
                      className="bg-[#00ff00] text-black font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300 text-sm"
                    >
                      Apply
                    </button>
                  )}
                </div>
                
                {couponError && (
                  <div className="text-red-400 text-sm">{couponError}</div>
                )}
                
                {appliedCoupon && (
                  <div className="text-[#00ff00] text-sm font-semibold">
                    ✅ {appliedCoupon.message}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>₹{getCartTotal().toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#00ff00]">FREE</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-[#00ff00]">
                    <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{getCouponDiscount().toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white font-poppins font-bold text-lg">
                    <span>Total</span>
                    <span>₹{getFinalTotal().toFixed(2)}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="text-[#00ff00] text-sm mt-2 text-right">
                      You save ₹{getCouponDiscount().toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-[#00ff00] text-black font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300 mb-4"
              >
                PROCEED TO CHECKOUT
              </button>

              <button
                onClick={handleContinueShopping}
                className="w-full bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300"
              >
                CONTINUE SHOPPING
              </button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <svg className="w-4 h-4 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Secure Checkout • 100% Authentic
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart

CheckoutPage (src/Pages/)


import React, { useState, useEffect } from 'react'
import api from '../Api/Axios'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../Contexts/CartContext'
import { useAuth } from '../Contexts/AuthContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function CheckoutPage() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const { cartItems, getCartTotal, getCouponDiscount, getFinalTotal, appliedCoupon, clearCart } = useCart()
  
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [isProcessingOrder, setIsProcessingOrder] = useState(false)
  
  // Store order summary for success page
  const [orderSummary, setOrderSummary] = useState({
    items: [],
    subtotal: 0,
    discount: 0,
    total: 0,
    couponDiscount: 0,
    codCharges: 0
  })

  useEffect(() => {
    // Check if user is authenticated
    if (isAuthenticated === false) {
      navigate('/login')
    } else if (isAuthenticated === true) {
      setCheckingAuth(false)
    }
    // If isAuthenticated is undefined/null, we're still loading, don't redirect
  }, [isAuthenticated, navigate])

  const [state, setState] = useState({
    selectedPayment: 'cod',
    orderPlaced: false,
    orderNumber: '',
    useSavedAddress: true,
    selectedAddressIndex: 0,
    formData: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      landmark: ''
    },
    upiId: '',
    cardData: {
      cardNumber: '',
      expiry: '',
      cvv: ''
    },
    showCvv: false,
    formErrors: {},
    codCharges: 0
  })

  // Get saved addresses from user
  const savedAddresses = user?.addresses || []

  // Initialize form with default address or user info
  useEffect(() => {
    if (user) {
      const defaultAddress = savedAddresses.find(addr => addr.isDefault)
      
      if (defaultAddress) {
        setState(prev => ({
          ...prev,
          formData: {
            name: defaultAddress.name || user.username || '',
            email: user.email || '',
            phone: defaultAddress.phone || '',
            address: defaultAddress.address || '',
            city: defaultAddress.city || '',
            state: defaultAddress.state || '',
            pincode: defaultAddress.pincode || '',
            landmark: defaultAddress.landmark || ''
          }
        }))
      } else if (savedAddresses.length > 0) {
        const firstAddress = savedAddresses[0]
        setState(prev => ({
          ...prev,
          selectedAddressIndex: 0,
          formData: {
            name: firstAddress.name || user.username || '',
            email: user.email || '',
            phone: firstAddress.phone || '',
            address: firstAddress.address || '',
            city: firstAddress.city || '',
            state: firstAddress.state || '',
            pincode: firstAddress.pincode || '',
            landmark: firstAddress.landmark || ''
          }
        }))
      } else {
        setState(prev => ({
          ...prev,
          useSavedAddress: false,
          formData: {
            ...prev.formData,
            name: user.username || '',
            email: user.email || ''
          }
        }))
      }
    }
  }, [user, savedAddresses])

  useEffect(() => {
    setState(prev => ({ ...prev, codCharges: state.selectedPayment === 'cod' ? 10 : 0 }))
  }, [state.selectedPayment])

  const updateState = (key, value) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  const updateFormData = (name, value) => {
    setState(prev => ({
      ...prev,
      formData: { ...prev.formData, [name]: value }
    }))
  }

  // Handle address selection
  const handleAddressSelect = (index) => {
    const selectedAddress = savedAddresses[index]
    setState(prev => ({
      ...prev,
      useSavedAddress: true,
      selectedAddressIndex: index,
      formData: {
        name: selectedAddress.name || user.username || '',
        email: user.email || '',
        phone: selectedAddress.phone || '',
        address: selectedAddress.address || '',
        city: selectedAddress.city || '',
        state: selectedAddress.state || '',
        pincode: selectedAddress.pincode || '',
        landmark: selectedAddress.landmark || ''
      }
    }))
  }

  // Toggle between saved address and manual entry
  const toggleAddressMode = () => {
    setState(prev => ({
      ...prev,
      useSavedAddress: !prev.useSavedAddress
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let processedValue = value
    
    if (name === 'phone' || name === 'pincode') {
      processedValue = value.replace(/\D/g, '').slice(0, name === 'phone' ? 10 : 6)
      
      if ((name === 'phone' && processedValue.length < 10 && processedValue.length > 0) ||
          (name === 'pincode' && processedValue.length < 6 && processedValue.length > 0)) {
        setState(prev => ({
          ...prev,
          formErrors: { ...prev.formErrors, [name]: `${name === 'phone' ? 'Phone number' : 'Pincode'} must be ${name === 'phone' ? '10' : '6'} digits` }
        }))
      } else {
        setState(prev => ({
          ...prev,
          formErrors: { ...prev.formErrors, [name]: '' }
        }))
      }
    }
    
    updateFormData(name, processedValue || value)
  }

  const handleUpiIdChange = (e) => {
    const value = e.target.value
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    const phonePattern = /^[6-9]\d{9}$/
    
    setState(prev => ({ ...prev, upiId: value }))
    
    if (value.trim() === '') {
      setState(prev => ({ ...prev, formErrors: { ...prev.formErrors, upiId: '' } }))
    } else if (!upiPattern.test(value) && !phonePattern.test(value.replace(/\D/g, ''))) {
      setState(prev => ({ ...prev, formErrors: { ...prev.formErrors, upiId: 'Enter valid UPI ID or Phone Number' } }))
    } else {
      setState(prev => ({ ...prev, formErrors: { ...prev.formErrors, upiId: '' } }))
    }
  }

  const handleCardInput = (type, value) => {
    let formattedValue = value.replace(/\D/g, '')
    
    switch(type) {
      case 'cardNumber':
        formattedValue = formattedValue.slice(0, 16)
        formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1-')
        break
      case 'expiry':
        formattedValue = formattedValue.slice(0, 4)
        if (formattedValue.length >= 2) formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2)
        break
      case 'cvv':
        formattedValue = formattedValue.slice(0, 3)
        break
      default:
        break
    }
    
    setState(prev => ({
      ...prev,
      cardData: { ...prev.cardData, [type]: formattedValue }
    }))
    
    if ((type === 'cardNumber' && formattedValue.replace(/\D/g, '').length < 16 && formattedValue.replace(/\D/g, '').length > 0) ||
        (type === 'expiry' && formattedValue.replace(/\D/g, '').length < 4 && formattedValue.replace(/\D/g, '').length > 0) ||
        (type === 'cvv' && formattedValue.length < 3 && formattedValue.length > 0)) {
      setState(prev => ({
        ...prev,
        formErrors: { 
          ...prev.formErrors, 
          [type]: `${type === 'cardNumber' ? 'Card number must be 16 digits' : 
                  type === 'expiry' ? 'Expiry must be MM/YY format' : 
                  'CVV must be 3 digits'}` 
        }
      }))
    } else {
      setState(prev => ({
        ...prev,
        formErrors: { ...prev.formErrors, [type]: '' }
      }))
    }
  }

  const validateForm = () => {
    const errors = {}
    const { formData } = state
    
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'pincode']
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        errors[field] = 'This field is required'
      }
    })
    
    if (formData.phone && formData.phone.length !== 10) {
      errors.phone = 'Phone number must be exactly 10 digits'
    }
    
    if (formData.pincode && formData.pincode.length !== 6) {
      errors.pincode = 'Pincode must be exactly 6 digits'
    }
    
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Enter a valid email address'
    }
    
    if (state.selectedPayment === 'upi') {
      if (!state.upiId.trim()) {
        errors.upiId = 'Please enter UPI ID or Phone Number'
      } else {
        const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
        const phonePattern = /^[6-9]\d{9}$/
        if (!upiPattern.test(state.upiId) && !phonePattern.test(state.upiId.replace(/\D/g, ''))) {
          errors.upiId = 'Enter valid UPI ID or Phone Number'
        }
      }
    }
    
    if (state.selectedPayment === 'card') {
      if (state.cardData.cardNumber.replace(/\D/g, '').length !== 16) {
        errors.cardNumber = 'Card number must be 16 digits'
      }
      if (state.cardData.expiry.replace(/\D/g, '').length !== 4) {
        errors.expiry = 'Expiry must be MM/YY format'
      }
      if (state.cardData.cvv.length !== 3) {
        errors.cvv = 'CVV must be 3 digits'
      }
    }
    
    return errors
  }

  const showToast = (message, type = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce ${
      type === 'success' ? 'bg-[#00ff00] text-black' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-yellow-500 text-black'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  const handlePlaceOrder = async () => {
  const errors = validateForm()
  
  if (Object.keys(errors).length > 0) {
    setState(prev => ({ ...prev, formErrors: errors }))
    showToast('Please fix the errors in the form', 'error')
    return
  }
  
  // SHOW PROCESSING SCREEN IMMEDIATELY
  setIsProcessingOrder(true)
  
  // IMPORTANT: Force React to render the processing screen before continuing
  await new Promise(resolve => setTimeout(resolve, 100))
  
  try {
    const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`
    const subtotal = parseFloat(getCartTotal()) || 0
    const discount = parseFloat(getCouponDiscount()) || 0
    const codCharges = state.selectedPayment === 'cod' ? 10 : 0
    const total = subtotal - discount + codCharges
    
    // SAVE ORDER SUMMARY BEFORE CLEARING CART
    setOrderSummary({
      items: [...cartItems], // Copy cart items
      subtotal: subtotal,
      discount: discount,
      total: total,
      couponDiscount: discount,
      codCharges: codCharges
    })
    
    // Create order object
    const orderData = {
      id: Date.now().toString(),
      orderNumber: newOrderNumber,
      userId: user.id,
      username: user.username,
      userEmail: user.email,
      date: new Date().toISOString(),
      status: 'Processing',
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        image: item.image,
        price: parseFloat(item.price) || 0,
        size: item.size,
        quantity: parseInt(item.quantity) || 1,
        team: item.team,
        total: (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1)
      })),
      subtotal: subtotal,
      discount: discount,
      total: total,
      paymentMethod: state.selectedPayment,
      shippingAddress: {
        ...state.formData,
        name: state.formData.name || user.username || ''
      },
      couponApplied: appliedCoupon?.code || null,
      couponDiscount: discount,
      codCharges: codCharges,
      trackingNumber: `TRK${Math.floor(100000000 + Math.random() * 900000000)}`,
      addressSource: state.useSavedAddress ? 'saved_address' : 'manual_entry'
    }
    
    console.log('Order data to save:', orderData)
    
    // ADD ARTIFICIAL DELAY TO SHOW PROCESSING SCREEN (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Save order to orders collection
    try {
      const orderResponse = await api.post('/orders', orderData)
      console.log('Order saved to /orders:', orderResponse.data)
    } catch (orderError) {
      console.warn('Could not save to /orders:', orderError.message)
    }
    
    // Update user's orders
    const updatedUserOrders = [...(user.orders || []), orderData]
    try {
      await api.patch(`/users/${user.id}`, {
        orders: updatedUserOrders
      })
      console.log('User orders updated')
    } catch (userError) {
      console.warn('Could not update user orders:', userError.message)
    }
    
    // Clear the cart
    if (clearCart) {
      clearCart()
    }
    
    // Add small delay before showing success
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Update local state to show success page
    updateState('orderNumber', newOrderNumber)
    updateState('orderPlaced', true)
    setIsProcessingOrder(false)
    
    showToast('Order placed successfully!', 'success')
    
  } catch (error) {
    console.error('Order placement error:', error)
    let errorMessage = 'Failed to place order. Please try again.'
    if (error.message) {
      errorMessage += ` (${error.message})`
    }
    showToast(errorMessage, 'error')
    setIsProcessingOrder(false)
  }
}
  // FIXED: Added parseFloat to prevent NaN
  const calculateFinalTotalWithCharges = () => {
    const finalTotal = parseFloat(getFinalTotal()) || 0
    const codCharges = state.selectedPayment === 'cod' ? 10 : 0
    const total = finalTotal + codCharges
    return isNaN(total) ? 0 : total
  }

  const handleContinueShopping = () => {
    navigate('/products')
  }

  // FIXED: Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex justify-center items-center">
          <div className="text-[#00ff00] text-lg">Loading checkout...</div>
        </div>
      </div>
    )
  }

  // FIXED: Only redirect if explicitly false, not if undefined/null (loading)
  if (isAuthenticated === false) {
    return null // Will redirect in useEffect
  }

  if (isProcessingOrder) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-[#00ff00] text-6xl mb-6 animate-pulse">⏳</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              PROCESSING YOUR ORDER
            </h2>
            <div className="text-gray-400 mb-8">
              Please wait while we confirm your order...
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 border-4 border-[#00ff00]/30 border-t-[#00ff00] rounded-full animate-spin"></div>
            </div>
            
            <div className="text-gray-400 text-sm space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                <span>Verifying payment details</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full animate-pulse"></div>
                <span>Confirming inventory</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                <span>Generating order confirmation</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (state.orderPlaced) {
    // Use saved order summary instead of cartItems
    const itemsCount = orderSummary.items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0)
    
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-[#00ff00] text-6xl mb-6 animate-bounce">✅</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">ORDER PLACED SUCCESSFULLY!</h2>
            <div className="text-[#00ff00] text-xl font-bold mb-4">Order #{state.orderNumber}</div>
            <p className="text-gray-400 mb-6">Thank you for your purchase!</p>
            
            <div className="bg-[#1a1a1a] border border-[#00ff00]/20 rounded-xl p-6 mb-8">
              <div className="text-white font-poppins font-semibold text-lg mb-4">Order Summary</div>
              
              {orderSummary.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between bg-[#111111] p-3 rounded-lg mb-3">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg"/>
                    <div>
                      <div className="text-white text-sm font-poppins font-medium">{item.name}</div>
                      <div className="text-gray-400 text-xs text-left">Size: {item.size} • Qty: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="text-[#00ff00] font-poppins font-bold">{item.price}</div>
                </div>
              ))}
              
              <div className="space-y-2 text-left border-t border-gray-700 pt-4 mt-4">
                <div className="flex justify-between text-gray-400">
                  <span>Items ({itemsCount})</span>
                  <span>₹{(orderSummary.subtotal || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#00ff00]">FREE</span>
                </div>
                {appliedCoupon && orderSummary.discount > 0 && (
                  <div className="flex justify-between text-[#00ff00]">
                    <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{(orderSummary.discount || 0).toFixed(2)}</span>
                  </div>
                )}
                {state.selectedPayment === 'cod' && (
                  <div className="flex justify-between text-yellow-400">
                    <span>COD Charges</span>
                    <span>+₹{(orderSummary.codCharges || 0).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-poppins font-bold text-lg pt-2">
                  <span>Total</span>
                  <span>₹{(orderSummary.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleContinueShopping}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">Your Cart is Empty</h2>
            <button
              onClick={handleContinueShopping}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const paymentMethods = [
    { id: 'cod', label: 'Cash on Delivery (COD)', icon: '💵', desc: 'Pay when you receive your order', charge: 'Additional ₹10 COD charges apply' },
    { id: 'upi', label: 'UPI Payment', icon: '📱', desc: 'Pay via Google Pay, PhonePe, etc.', charge: 'No additional charges' },
    { id: 'card', label: 'Credit/Debit Card', icon: '💳', desc: 'Secure card payment', charge: 'No additional charges' }
  ]

  const formFields = [
    { name: 'name', label: 'Full Name *', type: 'text' },
    { name: 'email', label: 'Email *', type: 'email' },
    { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: 'Enter 10-digit mobile number', maxLength: 10 },
    { name: 'pincode', label: 'Pincode *', type: 'text', placeholder: 'Enter 6-digit pincode', maxLength: 6 },
    { name: 'city', label: 'City *', type: 'text' },
    { name: 'state', label: 'State *', type: 'text' }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            CHECKOUT <span className="text-[#00ff00]">PAGE</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* SHIPPING INFORMATION SECTION */}
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white font-poppins">SHIPPING INFORMATION</h2>
                
                {/* Toggle between saved addresses and manual entry */}
                {savedAddresses.length > 0 && (
                  <button
                    type="button"
                    onClick={toggleAddressMode}
                    className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors text-sm font-semibold"
                  >
                    {state.useSavedAddress ? 'Enter Address Manually' : 'Use Saved Address'}
                  </button>
                )}
              </div>

              {/* SAVED ADDRESSES SELECTION */}
              {state.useSavedAddress && savedAddresses.length > 0 ? (
                <div className="mb-8">
                  <div className="text-gray-400 text-sm mb-4">Select a saved address:</div>
                  <div className="space-y-4">
                    {savedAddresses.map((address, index) => (
                      <div 
                        key={index}
                        onClick={() => handleAddressSelect(index)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          state.selectedAddressIndex === index 
                            ? 'border-[#00ff00] bg-[#00ff00]/10' 
                            : 'border-gray-700 hover:border-[#00ff00]/50'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            state.selectedAddressIndex === index ? 'border-[#00ff00]' : 'border-gray-600'
                          }`}>
                            {state.selectedAddressIndex === index && (
                              <div className="w-3 h-3 bg-[#00ff00] rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-white font-poppins font-semibold">{address.name}</div>
                              {address.isDefault && (
                                <span className="bg-[#00ff00] text-black text-xs font-bold px-2 py-1 rounded-full">
                                  DEFAULT
                                </span>
                              )}
                            </div>
                            <div className="text-gray-300 mb-2">{address.address}</div>
                            <div className="text-gray-400 text-sm">
                              {address.city}, {address.state} - {address.pincode}
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                              📞 {address.phone}
                              {address.landmark && <span> • Landmark: {address.landmark}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-xl">
                    <div className="text-white font-poppins font-semibold text-sm mb-2">
                      Selected Address Preview
                    </div>
                    <div className="text-gray-300">
                      <div className="mb-1"><strong>{state.formData.name}</strong></div>
                      <div className="mb-1">{state.formData.address}</div>
                      <div className="text-gray-400">
                        {state.formData.city}, {state.formData.state} - {state.formData.pincode}
                      </div>
                      <div className="text-gray-400 mt-1">📞 {state.formData.phone}</div>
                      {state.formData.landmark && (
                        <div className="text-gray-400">📍 {state.formData.landmark}</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* MANUAL ADDRESS ENTRY */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formFields.map(field => (
                    <div key={field.name}>
                      <label className="block text-gray-400 text-sm mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={state.formData[field.name]}
                        onChange={handleInputChange}
                        className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                        placeholder={field.placeholder || ''}
                        maxLength={field.maxLength}
                        required
                      />
                      {state.formErrors[field.name] && (
                        <div className="text-red-400 text-xs mt-1">{state.formErrors[field.name]}</div>
                      )}
                    </div>
                  ))}
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={state.formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
                      required
                    />
                    {state.formErrors.address && (
                      <div className="text-red-400 text-xs mt-1">{state.formErrors.address}</div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-gray-400 text-sm mb-2">Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={state.formData.landmark}
                      onChange={handleInputChange}
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      placeholder="Nearby landmark"
                    />
                  </div>
                </div>
              )}

              {/* NO SAVED ADDRESSES MESSAGE */}
              {state.useSavedAddress && savedAddresses.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-[#00ff00] text-4xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-white font-poppins mb-2">No Saved Addresses</h3>
                  <p className="text-gray-400 mb-6">You haven't saved any addresses yet.</p>
                  <button
                    onClick={toggleAddressMode}
                    className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors"
                  >
                    Enter Address Manually
                  </button>
                  <div className="mt-4 text-gray-500 text-sm">
                    Or <Link to="/profile" className="text-[#00ff00] hover:underline">add addresses in your profile</Link> for faster checkout
                  </div>
                </div>
              )}
            </div>

            {/* PAYMENT METHOD SECTION */}
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white font-poppins mb-6">PAYMENT METHOD</h2>
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div 
                    key={method.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      state.selectedPayment === method.id 
                        ? 'border-[#00ff00] bg-[#00ff00]/10' 
                        : 'border-gray-700 hover:border-[#00ff00]/50'
                    }`}
                    onClick={() => updateState('selectedPayment', method.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        state.selectedPayment === method.id ? 'border-[#00ff00]' : 'border-gray-600'
                      }`}>
                        {state.selectedPayment === method.id && <div className="w-3 h-3 bg-[#00ff00] rounded-full"></div>}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-poppins font-semibold">{method.label}</div>
                        <div className="text-gray-400 text-sm">{method.desc}</div>
                        <div className={`text-xs mt-1 ${method.id === 'cod' ? 'text-yellow-400' : 'text-green-400'}`}>
                          {method.charge}
                        </div>
                      </div>
                      <div className="text-[#00ff00] text-lg">{method.icon}</div>
                    </div>
                  </div>
                ))}
              </div>

              {state.selectedPayment === 'upi' && (
                <div className="mt-6 p-4 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-xl">
                  <label className="block text-white font-poppins font-semibold text-sm mb-2">
                    Enter UPI ID or Phone Number *
                  </label>
                  <input
                    type="text"
                    value={state.upiId}
                    onChange={handleUpiIdChange}
                    className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                    placeholder="username@upi or 9876543210"
                  />
                  {state.formErrors.upiId && <div className="text-red-400 text-xs mt-1">{state.formErrors.upiId}</div>}
                </div>
              )}

              {state.selectedPayment === 'card' && (
                <div className="mt-6 space-y-4 p-4 bg-[#1a1a1a] border border-[#00ff00]/30 rounded-xl">
                  <h3 className="text-white font-poppins font-semibold mb-2">Enter Card Details</h3>
                  
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Card Number *</label>
                    <input
                      type="text"
                      value={state.cardData.cardNumber}
                      onChange={(e) => handleCardInput('cardNumber', e.target.value)}
                      className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      placeholder="4444-5555-6666-7777"
                      maxLength="19"
                    />
                    {state.formErrors.cardNumber && <div className="text-red-400 text-xs mt-1">{state.formErrors.cardNumber}</div>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        value={state.cardData.expiry}
                        onChange={(e) => handleCardInput('expiry', e.target.value)}
                        className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {state.formErrors.expiry && <div className="text-red-400 text-xs mt-1">{state.formErrors.expiry}</div>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">CVV *</label>
                      <div className="relative">
                        <input
                          type={state.showCvv ? "text" : "password"}
                          value={state.cardData.cvv}
                          onChange={(e) => handleCardInput('cvv', e.target.value)}
                          className="w-full bg-[#111111] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] pr-10"
                          placeholder="123"
                          maxLength="3"
                        />
                        <button
                          type="button"
                          onClick={() => updateState('showCvv', !state.showCvv)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00ff00]"
                        >
                          {state.showCvv ? '👁️' : '👁️‍🗨️'}
                        </button>
                      </div>
                      {state.formErrors.cvv && <div className="text-red-400 text-xs mt-1">{state.formErrors.cvv}</div>}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-6">
                <button
                  onClick={handleContinueShopping}
                  className="w-full bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-poppins font-bold py-3 rounded-lg hover:bg-[#00ff00]/10 transition-all duration-300"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-poppins font-semibold text-xl mb-6">ORDER SUMMARY</h3>

              {appliedCoupon && (
                <div className="mb-4 p-3 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded-lg">
                  <div className="text-[#00ff00] font-poppins font-bold text-sm">✅ {appliedCoupon.message}</div>
                </div>
              )}

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg"/>
                    <div className="flex-1">
                      <div className="text-white text-sm font-poppins font-semibold">{item.name}</div>
                      <div className="text-gray-400 text-xs">Size: {item.size} • Qty: {item.quantity}</div>
                    </div>
                    <div className="text-[#00ff00] font-poppins font-bold">{item.price}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0)} items)</span>
                  <span>₹{(parseFloat(getCartTotal()) || 0).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-[#00ff00]">FREE</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#00ff00]">
                    <span>Coupon Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{(parseFloat(getCouponDiscount()) || 0).toFixed(2)}</span>
                  </div>
                )}
                {state.selectedPayment === 'cod' && (
                  <div className="flex justify-between text-yellow-400">
                    <span>COD Charges</span>
                    <span>+₹10.00</span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white font-poppins font-bold text-lg">
                    <span>Total</span>
                    <span>₹{calculateFinalTotalWithCharges().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#00ff00] text-black font-poppins font-bold py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300 mb-4"
              >
                PLACE ORDER
              </button>

              <div className="text-center text-gray-400 text-sm">
                100% Secure Payment • SSL Encrypted
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CheckoutPage

CouponPage (src/Pages/)

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function CouponPage() {
  const navigate = useNavigate()
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')

  const validCoupons = {
    DRIBBLEFIT20: {
      discount: 20,
      type: 'percentage',
      message: '20% off your entire order!',
      description: 'Get massive 20% discount on all products'
    }
  }

  const handleApplyCoupon = () => {
    setCouponError('')
    if (!couponCode.trim()) {
      setCouponError('Please enter a coupon code')
      return
    }
    const coupon = validCoupons[couponCode.toUpperCase()]
    if (coupon) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), ...coupon })
      setCouponError('')
    } else {
      setCouponError('Invalid coupon code')
      setAppliedCoupon(null)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    setCouponError('')
  }

  const handleShopNow = () => navigate('/products')

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
            EXCLUSIVE <span className="text-[#00ff00]">OFFER</span>
          </h1>
          <p className="text-gray-400 text-lg">Unlock special discounts with coupon codes</p>
        </div>

        <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white font-poppins mb-6">APPLY COUPON CODE</h2>
            <div className="max-w-md mx-auto">
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  placeholder="Enter DRIBBLEFIT20"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] placeholder-gray-500 text-lg"
                  disabled={appliedCoupon}
                />
                {appliedCoupon ? (
                  <button
                    onClick={handleRemoveCoupon}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-semibold"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300"
                  >
                    Apply
                  </button>
                )}
              </div>

              {couponError && <div className="text-red-400 text-sm">{couponError}</div>}
              {appliedCoupon && <div className="text-[#00ff00] text-lg font-semibold">✅ {appliedCoupon.message}</div>}
            </div>
          </div>

          {appliedCoupon && (
            <div className="bg-[#00ff00]/10 border-2 border-[#00ff00] rounded-xl p-6 text-center mb-8">
              <div className="text-[#00ff00] text-2xl font-bold mb-2">{appliedCoupon.code} APPLIED!</div>
              <div className="text-white text-lg font-semibold mb-2">{appliedCoupon.discount}% OFF YOUR ORDER</div>
              <div className="text-gray-300">{appliedCoupon.description}</div>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-white font-poppins font-semibold text-xl mb-4">AVAILABLE COUPON</h3>
            <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] border border-[#00ff00]/30 rounded-xl p-6 max-w-md mx-auto">
              <div className="text-[#00ff00] text-2xl font-bold mb-2">DRIBBLEFIT20</div>
              <div className="text-white text-lg font-semibold mb-2">20% OFF ALL ORDERS</div>
              <div className="text-gray-400 text-sm mb-4">Apply this code at checkout for instant 20% discount</div>
              <button
                onClick={() => setCouponCode('DRIBBLEFIT20')}
                className="bg-[#00ff00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300 text-sm"
              >
                USE THIS CODE
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <button
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
            <button
              onClick={() => navigate('/cart')}
              className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300"
            >
              VIEW CART
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CouponPage

ContactUs (src/Pages/)

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'
import SaleBanner from '../Components/Home/SaleBanner'

function ContactUs() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      title: "EMAIL US",
      info: "support@dribblefit.com",
      description: "We'll respond within 24 hours"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      title: "CALL US",
      info: "+91 98765 43210",
      description: "Mon-Sat, 10AM to 7PM"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      title: "VISIT US",
      info: "123 Football Street, Sports District",
      description: "Mumbai, Maharashtra 400001"
    }
  ]

  const faqs = [
    { question: "How long does shipping take?", answer: "Standard shipping takes 5-7 business days..." },
    { question: "What is your return policy?", answer: "We offer 30-day returns on unworn items..." },
    { question: "Are your jerseys authentic?", answer: "Yes, all jerseys are 100% authentic." },
    { question: "Do you ship internationally?", answer: "Yes, worldwide shipping available." },
    { question: "What payment methods do you accept?", answer: "UPI, cards, net banking, COD." },
    { question: "How do I track my order?", answer: "Tracking link provided via email/SMS." }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      console.log('Contact form submitted:', formData)
      setIsSubmitting(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <SaleBanner />
      <Navbar />

      <div className="pt-24 pb-16 bg-gradient-to-b from-[#0a0a0a] to-[#001a00] border-b border-[#00ff00]/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white font-poppins mb-6">
            CONTACT <span className="text-[#00ff00]">US</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Get in touch with our team. We're here to help!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white font-poppins mb-2">SEND US A MESSAGE</h2>
            <p className="text-gray-400 mb-6">Fill out the form below and we'll reply soon</p>

            {submitted && (
              <div className="mb-6 p-4 bg-[#00ff00]/10 border border-[#00ff00] rounded-lg text-[#00ff00] font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Message sent successfully!
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg" placeholder="Your Name"/>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg" placeholder="Email"/>
              </div>

              <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg">
                <option value="">Select a subject</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Shipping Question">Shipping</option>
                <option value="Return/Exchange">Return/Exchange</option>
                <option value="Size Help">Size Help</option>
                <option value="Other">Other</option>
              </select>

              <textarea name="message" value={formData.message} onChange={handleChange} required rows="6" className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg resize-none" placeholder="Your Message"/>
              
              <button type="submit" disabled={isSubmitting} className="w-full bg-[#00ff00] text-black font-bold py-4 rounded-lg disabled:opacity-50">
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">GET IN TOUCH</h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <div key={i} className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-6 flex gap-4">
                    <div className="bg-[#00ff00]/10 p-3 rounded-lg">{item.icon}</div>
                    <div>
                      <h4 className="text-[#00ff00] font-bold">{item.title}</h4>
                      <p className="text-white font-semibold">{item.info}</p>
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-6">FAQ</h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-[#111111] border border-[#00ff00]/20 rounded-xl p-5 cursor-pointer group"
                    onClick={() => {
                      const el = document.getElementById(`faq-${i}`)
                      if (el) el.classList.toggle('hidden')
                    }}>
                    <h4 className="text-white font-semibold group-hover:text-[#00ff00]">{faq.question}</h4>
                    <p id={`faq-${i}`} className="text-gray-400 hidden">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-white mb-4">BUSINESS HOURS</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-800 py-2">
                  <span className="text-gray-300">Mon - Fri</span>
                  <span className="text-[#00ff00]">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 py-2">
                  <span className="text-gray-300">Saturday</span>
                  <span className="text-[#00ff00]">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-300">Sunday</span>
                  <span className="text-red-400">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">OUR LOCATION</h3>
              <p className="text-gray-400">Visit our flagship store in Mumbai</p>
            </div>
            <div className="h-96 bg-[#1a1a1a] flex flex-col items-center justify-center">
              <div className="text-[#00ff00] text-6xl mb-4">📍</div>
              <p className="text-white font-semibold text-lg">123 Football Street</p>
              <p className="text-gray-400">Mumbai, MH 400001</p>
              <button onClick={() => window.open('https://maps.google.com', '_blank')} className="mt-4 bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg">
                GET DIRECTIONS
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ContactUs

WishlistContext (src/Contexts/)

import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const hasLoaded = useRef(false)

  // Load from localStorage ONCE
  useEffect(() => {
    if (hasLoaded.current) return
    
    console.log('🔄 Loading wishlist...')
    const saved = localStorage.getItem('dribblefit-wishlist')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setWishlistItems(parsed)
        console.log('✅ Loaded:', parsed)
      } catch {
        console.log('❌ Error loading, starting fresh')
      }
    }
    
    hasLoaded.current = true
  }, [])

  // Save to localStorage when wishlist changes
  useEffect(() => {
    if (!hasLoaded.current) return
    
    console.log('💾 Saving wishlist:', wishlistItems)
    localStorage.setItem('dribblefit-wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const addToWishlist = (product) => {
    setWishlistItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev // Already exists
      }
      return [...prev, product]
    })
  }

  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (id) => {
    return wishlistItems.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      wishlistCount: wishlistItems.length,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}

Wishlist (src/Pages/)

import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useWishlist } from '../Contexts/WishlistContext'
import { useCart } from '../Contexts/CartContext'
import Navbar from '../Components/Layout/Navbar'
import Footer from '../Components/Layout/Footer'

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const navigate = useNavigate()

  const handleAddToCart = (product) => {
    const defaultSize = 'M' // Default size
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      team: product.team,
      inStock: product.inStock
    }
    
    addToCart(cartProduct, defaultSize, 1)
    
    // Show notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-[#00ff00] text-black font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Added ${product.name} to cart!`
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const handleRemoveItem = (productId, productName) => {
    removeFromWishlist(productId)
    
    // Show notification
    const notification = document.createElement('div')
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
    notification.textContent = `Removed ${productName} from wishlist`
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist()
      
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white font-poppins font-bold px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce'
      notification.textContent = 'Wishlist cleared!'
      document.body.appendChild(notification)
      
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 3000)
    }
  }

  const handleShopNow = () => {
    navigate('/products')
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12">
            <div className="text-red-500 text-6xl mb-6">❤️</div>
            <h2 className="text-3xl font-bold text-white font-poppins mb-4">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-gray-400 mb-8">
              Save your favorite football jerseys here for later!
            </p>
            <button
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
            >
              BROWSE PRODUCTS
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-24 max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white font-poppins">
            MY <span className="text-[#00ff00]">WISHLIST</span>
            <span className="text-gray-400 text-lg ml-4">({wishlistItems.length} items)</span>
          </h1>
          
          <div className="flex gap-4">
            <button
              onClick={handleClearWishlist}
              className="text-red-400 hover:text-red-300 transition-colors text-sm border border-red-400/30 hover:border-red-300/50 px-4 py-2 rounded-lg"
            >
              Clear All
            </button>
            <button
              onClick={handleShopNow}
              className="bg-[#00ff00] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#00ff00]/90 transition-all duration-300 text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div 
              key={item.id}
              className="bg-gradient-to-b from-[#111111] to-[#1a1a1a] border border-[#00ff00]/20 rounded-2xl p-4 hover:border-[#00ff00]/40 hover:shadow-lg hover:shadow-[#00ff00]/10 transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-[#1a1a1a]">
                <img 
                  src={item.image} // FIXED: Remove the localhost prefix
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                  }}
                />
                
                {/* Remove Button - Top Right */}
                <button
                  onClick={() => handleRemoveItem(item.id, item.name)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:text-red-400 hover:scale-110 transition-all duration-300"
                  aria-label="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Team Badge */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {item.team}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-2">
                <h3 className="text-white font-poppins font-semibold text-sm mb-2 line-clamp-2 min-h-[2.8rem]">
                  {item.name}
                </h3>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#00ff00] font-poppins font-bold text-lg">
                    {item.price}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-[#00ff00] text-black font-poppins font-bold py-2 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-all duration-300 text-sm"
                  >
                    Add to Cart
                  </button>
                  <Link 
                    to={`/product/${item.id}`}
                    className="bg-transparent border border-[#00ff00] text-[#00ff00] font-poppins font-bold px-4 py-2 rounded-lg hover:bg-[#00ff00] hover:text-black transition-all duration-300 text-sm flex items-center justify-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Wishlist

WishlistButton (src/Components/Common/)

import React from 'react'
import { useWishlist } from '../../Contexts/WishlistContext'

function WishlistButton({ product, size = 'md' }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const productId = product.id
  const isWishlisted = isInWishlist(productId)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeFromWishlist(productId)
      
      // Simple notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50'
      notification.textContent = 'Removed from wishlist'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || '',
        team: product.team || ''
      })
      
      // Simple notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50'
      notification.textContent = 'Added to wishlist'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    }
  }

  const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <button
      onClick={handleClick}
      className={`${sizeClass} bg-black/70 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
        isWishlisted ? 'text-red-500' : 'text-white hover:text-red-500'
      }`}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWishlisted ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  )
}

export default WishlistButton

import React from 'react'
import { useWishlist } from '../../Contexts/WishlistContext'

function WishlistButton({ product, size = 'md' }) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const productId = product.id
  const isWishlisted = isInWishlist(productId)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isWishlisted) {
      removeFromWishlist(productId)
      
      // Simple notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-50'
      notification.textContent = 'Removed from wishlist'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    } else {
      addToWishlist({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0] || '',
        team: product.team || ''
      })
      
      // Simple notification
      const notification = document.createElement('div')
      notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50'
      notification.textContent = 'Added to wishlist'
      document.body.appendChild(notification)
      setTimeout(() => notification.remove(), 2000)
    }
  }

  const sizeClass = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'

  return (
    <button
      onClick={handleClick}
      className={`${sizeClass} bg-black/70 rounded-full flex items-center justify-center hover:scale-110 transition-all ${
        isWishlisted ? 'text-red-500' : 'text-white hover:text-red-500'
      }`}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      {isWishlisted ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )}
    </button>
  )
}

export default WishlistButton

App.jsx 

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Contexts/AuthContext.jsx'
import { CartProvider } from './Contexts/CartContext.jsx'
import { WishlistProvider } from './Contexts/WishlistContext.jsx'
import RegisterPage from './Components/Auth/RegisterPage.jsx'
import LoginPage from './Components/Auth/LoginPage.jsx'
import Home from './Pages/Home.jsx'
import Products from './Components/Products/Products.jsx'
import ProductsDetail from './Components/Products/ProductsDetail.jsx'
import Cart from './Pages/Cart.jsx'
import CouponPage from './Pages/CouponPage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import ContactUs from './Pages/ContactUs.jsx'
import Wishlist from './Pages/Wishlist.jsx'
import Profile from './Pages/Profile.jsx'
import Address from './Pages/Address.jsx'
import Orders from './Pages/Orders.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
          <div className="min-h-screen bg-black text-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductsDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/coupons" element={<CouponPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/address" element={<Address />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App