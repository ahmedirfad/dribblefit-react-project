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