// src/Pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#111111] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        
        {/* Animated Icon */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-[#00ff00]/10 to-emerald-600/10 rounded-full blur-xl"></div>
          </div>
          <div className="relative">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-[#00ff00]/20 rotate-45 animate-pulse">
              <span className="text-5xl text-black font-bold -rotate-45">404</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Page Not Found</h1>
          <p className="text-gray-400 mb-6">
            Oops! The page you're looking for seems to have been dribbled away.
          </p>
          <div className="inline-block bg-[#111111] border border-[#00ff00]/20 rounded-lg px-4 py-2 mb-6">
            <code className="text-[#00ff00] font-mono">
              {window.location.pathname}
            </code>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <Link
            to="/home"
            className="block w-full bg-gradient-to-r from-[#00ff00] to-emerald-600 text-black font-bold py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[#00ff00]/20"
          >
            Go to Homepage
          </Link>
          
          <Link
            to="/products"
            className="block w-full bg-[#111111] border-2 border-[#00ff00]/30 text-white font-semibold py-3 rounded-lg hover:border-[#00ff00] hover:bg-[#00ff00]/10 transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>

        {/* Help Link */}
        <div className="pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Still lost?{' '}
            <Link to="/contact" className="text-[#00ff00] font-medium hover:text-[#00ff00]/80 transition-colors">
              Contact support →
            </Link>
          </p>
        </div>

        {/* Football Animation */}
        <div className="pt-8">
          <div className="inline-block animate-bounce">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#00ff00]/30">
              <span className="text-black font-bold text-xl">⚽</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Keep dribbling! The goal is just around the corner...
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;