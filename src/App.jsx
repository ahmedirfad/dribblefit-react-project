import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import AdminLayout from './Admin/Components/AdminLayout.jsx'
import Dashboard from './Admin/Pages/Dashboard.jsx'
import UserManagement from './Admin/Pages/UserManagement.jsx'
import ProductManagement from './Admin/Pages/ProductManagement.jsx'
import AddProduct from './Admin/Pages/AddProduct.jsx' // Add this import
import EditProduct from './Admin/Pages/EditProduct.jsx' // Add this import
import ProductDetail from './Admin/Pages/ProductDetail.jsx' // Add this import
import OrderManagement from './Admin/Pages/OrderManagement.jsx'
import AdminRoute from './Components/Common/AdminRoute.jsx'
import NotFound from './Pages/NotFound.jsx'
import ShippingInfo from './Pages/ShippingInfo.jsx'
import ReturnsExchanges from './Pages/ReturnsExchanges.jsx'
import SizeGuide from './Pages/SizeGuide.jsx'
import FAQ from './Pages/FAQ.jsx'
import JerseyCare from './Pages/JerseyCare.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-black text-white">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/product/:id" element={<ProductsDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                {/* <Route path="/coupons" element={<CouponPage />} /> */}
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/address" element={<Address />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/shipping-info" element={<ShippingInfo />} />
                <Route path="/returns" element={<ReturnsExchanges />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/care" element={<JerseyCare />} />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<UserManagement />} />
                  
                  {/* Product Management Routes */}
                  <Route path="products" element={<ProductManagement />} />
                  <Route path="products/add" element={<AddProduct />} />
                  <Route path="products/:id" element={<ProductDetail />} />
                  <Route path="products/edit/:id" element={<EditProduct />} />
                  
                  <Route path="orders" element={<OrderManagement />} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App