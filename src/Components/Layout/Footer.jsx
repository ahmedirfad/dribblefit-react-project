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