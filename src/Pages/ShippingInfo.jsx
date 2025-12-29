import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';
import api from '../Api/Axios.jsx';

function ShippingInfo() {
  const { user, isAuthenticated } = useAuth();
  const [shippingInfo, setShippingInfo] = useState({
    processingTime: '2-3 business days',
    deliveryTime: '5-7 business days',
    shippingMethods: [
      {
        id: 'standard',
        name: 'Standard Shipping',
        cost: 'FREE',
        time: '5-7 business days',
        description: 'Regular shipping with tracking'
      },
      {
        id: 'express',
        name: 'Express Shipping',
        cost: '₹299',
        time: '2-3 business days',
        description: 'Faster delivery with priority handling'
      },
      {
        id: 'overnight',
        name: 'Overnight Shipping',
        cost: '₹599',
        time: '1 business day',
        description: 'Next day delivery (order before 2 PM)'
      }
    ],
    shippingZones: [
      {
        zone: 'Metro Cities',
        cities: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
        deliveryTime: '3-5 days'
      },
      {
        zone: 'Tier 1 Cities',
        cities: ['Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Bhopal', 'Indore', 'Nagpur'],
        deliveryTime: '4-6 days'
      },
      {
        zone: 'Tier 2 & 3 Cities',
        cities: ['All other cities'],
        deliveryTime: '5-7 days'
      },
      {
        zone: 'Remote Areas',
        cities: ['North East States', 'Jammu & Kashmir', 'Islands'],
        deliveryTime: '7-10 days'
      }
    ],
    internationalShipping: {
      available: true,
      countries: ['USA', 'UK', 'Canada', 'Australia', 'UAE', 'Singapore'],
      time: '10-15 business days',
      cost: 'Starts from ₹1499'
    },
    trackingInfo: {
      howToTrack: 'Once your order is shipped, you will receive a tracking number via email and SMS.',
      trackingLink: 'https://www.indiapost.gov.in/tracking.aspx',
      courierPartners: ['India Post', 'Delhivery', 'Blue Dart', 'DTDC', 'Ecom Express']
    },
    policies: [
      {
        title: 'Shipping Policy',
        content: 'We ship to all addresses within India. International shipping is available to select countries.'
      },
      {
        title: 'Processing Time',
        content: 'Orders are processed within 2-3 business days. Customized items may take additional 1-2 days.'
      },
      {
        title: 'Delivery Time',
        content: 'Delivery times vary based on location and shipping method selected.'
      },
      {
        title: 'Order Tracking',
        content: 'All orders come with tracking numbers. You can track your order using our tracking page or the courier website.'
      },
      {
        title: 'Shipping Costs',
        content: 'Standard shipping is free on all orders. Express and overnight shipping charges apply.'
      },
      {
        title: 'Address Accuracy',
        content: 'Please ensure your shipping address is accurate. We are not responsible for delays due to incorrect addresses.'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to process my order?',
        answer: 'Orders are typically processed within 2-3 business days. Customized items may take an additional 1-2 days.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship to select countries including USA, UK, Canada, Australia, UAE, and Singapore.'
      },
      {
        question: 'Can I change my shipping address after placing an order?',
        answer: 'You can change your shipping address within 12 hours of placing the order. Contact our customer support for assistance.'
      },
      {
        question: 'What happens if my order is delayed?',
        answer: 'In case of delays, we will notify you via email and SMS. You can contact our support team for updates.'
      },
      {
        question: 'Do you offer same-day delivery?',
        answer: 'Same-day delivery is available in select metro cities for orders placed before 11 AM.'
      },
      {
        question: 'How do I track my order?',
        answer: 'You can track your order using the tracking number sent to your email/SMS or visit the tracking page on our website.'
      }
    ]
  });

  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const [contactInfo, setContactInfo] = useState({
    email: 'support@jerseystore.com',
    phone: '+91 98765 43210',
    hours: 'Monday to Saturday: 9 AM - 7 PM',
    address: '123 Jersey Street, Sports Complex, Mumbai, Maharashtra - 400001'
  });

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Try to get user's location from their profile
    if (user?.addresses?.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
      if (defaultAddress) {
        setUserLocation(`${defaultAddress.city}, ${defaultAddress.state}`);
      }
    }
  }, [user]);

  const getEstimatedDelivery = () => {
    if (!userLocation) return '5-7 business days';
    
    const city = userLocation.split(',')[0].trim();
    
    for (const zone of shippingInfo.shippingZones) {
      if (zone.cities.some(zoneCity => 
        zoneCity.toLowerCase().includes(city.toLowerCase()) || 
        city.toLowerCase().includes(zoneCity.toLowerCase())
      )) {
        return zone.deliveryTime;
      }
    }
    
    return '5-7 business days';
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-[#00ff00] text-6xl mb-6">🚚</div>
            <div className="text-white text-2xl font-bold mb-4">Authentication Required</div>
            <p className="text-gray-400 mb-8">Please login to view shipping information</p>
            <Link to="/login" className="bg-[#00ff00] text-black px-8 py-3 rounded-lg font-bold hover:bg-[#00ff00]/90 transition-colors inline-block">
              Login Now
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[#00ff00] text-6xl mb-6">🚚</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
              SHIPPING <span className="text-[#00ff00]">INFORMATION</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about shipping, delivery, and tracking your orders
            </p>
          </div>

          {/* User Location Info */}
          {userLocation && (
            <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#00ff00] rounded-full flex items-center justify-center">
                    <span className="text-black text-2xl">📍</span>
                  </div>
                  <div>
                    <div className="text-white font-poppins font-semibold">Shipping to: {userLocation}</div>
                    <div className="text-gray-300">Estimated Delivery: {getEstimatedDelivery()}</div>
                  </div>
                </div>
                <Link 
                  to="/address" 
                  className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] px-6 py-3 rounded-lg hover:bg-[#00ff00]/10 transition-colors font-semibold"
                >
                  Update Address
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Stats */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Shipping Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Processing Time</span>
                    <span className="text-[#00ff00] font-bold">{shippingInfo.processingTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Delivery Time</span>
                    <span className="text-[#00ff00] font-bold">{shippingInfo.deliveryTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Standard Shipping</span>
                    <span className="text-[#00ff00] font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Order Tracking</span>
                    <span className="text-[#00ff00] font-bold">Available</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00] text-lg">✉️</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Email</div>
                      <div className="text-white">{contactInfo.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00] text-lg">📞</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Phone</div>
                      <div className="text-white">{contactInfo.phone}</div>
                      <div className="text-gray-400 text-xs">{contactInfo.hours}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00] text-lg">🏢</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Address</div>
                      <div className="text-white text-sm">{contactInfo.address}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Quick Links</h3>
                <div className="space-y-1">
                  <Link to="/orders" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Track Your Order
                  </Link>
                  <Link to="/products" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Continue Shopping
                  </Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Contact Support
                  </Link>
                  <Link to="/returns" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Returns & Exchange
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Methods */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Shipping Methods</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {shippingInfo.shippingMethods.map((method) => (
                    <div 
                      key={method.id}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6 hover:border-[#00ff00]/50 transition-all duration-300"
                    >
                      <div className="text-white font-poppins font-bold text-lg mb-2">{method.name}</div>
                      <div className="text-[#00ff00] font-bold text-2xl mb-3">{method.cost}</div>
                      <div className="text-gray-400 text-sm mb-4">{method.time}</div>
                      <div className="text-gray-300 mb-4">{method.description}</div>
                      {method.id === 'standard' && (
                        <span className="inline-block bg-[#00ff00]/10 text-[#00ff00] text-xs font-bold px-3 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Zones */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Delivery Zones & Times</h2>
                <div className="space-y-6">
                  {shippingInfo.shippingZones.map((zone, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div className="text-white font-poppins font-bold text-lg">{zone.zone}</div>
                        <div className="text-[#00ff00] font-bold">Delivery: {zone.deliveryTime}</div>
                      </div>
                      <div className="text-gray-300">
                        <span className="text-gray-400">Cities: </span>
                        {zone.cities.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* International Shipping */}
              {shippingInfo.internationalShipping.available && (
                <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-white font-poppins mb-6">International Shipping</h2>
                  <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                      <div>
                        <div className="text-white font-poppins font-bold text-lg mb-2">We Ship Worldwide</div>
                        <div className="text-gray-300">Available to select countries</div>
                      </div>
                      <div className="text-[#00ff00] font-bold text-lg">{shippingInfo.internationalShipping.cost}</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00ff00] rounded-full"></div>
                        <span className="text-white">Delivery Time: {shippingInfo.internationalShipping.time}</span>
                      </div>
                      <div>
                        <div className="text-gray-400 mb-2">Available Countries:</div>
                        <div className="flex flex-wrap gap-2">
                          {shippingInfo.internationalShipping.countries.map((country, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-[#00ff00]/10 text-[#00ff00] text-sm rounded-full border border-[#00ff00]/20"
                            >
                              {country}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Tracking */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Order Tracking</h2>
                <div className="bg-[#1a1a1a] rounded-xl p-6">
                  <div className="text-white font-poppins font-semibold text-lg mb-4">How to Track Your Order</div>
                  <div className="text-gray-300 mb-6">{shippingInfo.trackingInfo.howToTrack}</div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Track Your Order:</div>
                      <a 
                        href={shippingInfo.trackingInfo.trackingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ff00] hover:text-[#00ff00]/80 transition-colors underline"
                      >
                        Click here to track
                      </a>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm mb-2">Our Courier Partners:</div>
                      <div className="flex flex-wrap gap-2">
                        {shippingInfo.trackingInfo.courierPartners.map((partner, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full"
                          >
                            {partner}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-[#0a0a0a] rounded-lg border border-gray-800">
                    <div className="text-white font-semibold mb-2">💡 Pro Tip</div>
                    <div className="text-gray-300 text-sm">
                      Save your tracking number! You'll need it to track your order on the courier's website.
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Policies */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Shipping Policies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {shippingInfo.policies.map((policy, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6"
                    >
                      <div className="text-white font-poppins font-semibold text-lg mb-3">{policy.title}</div>
                      <div className="text-gray-300">{policy.content}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {shippingInfo.faqs.map((faq, index) => (
                    <div 
                      key={index}
                      className="bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-900/50 transition-colors"
                      >
                        <div className="text-white font-poppins font-semibold pr-4">{faq.question}</div>
                        <span className="text-[#00ff00] text-2xl flex-shrink-0">
                          {activeFAQ === index ? '−' : '+'}
                        </span>
                      </button>
                      {activeFAQ === index && (
                        <div className="p-6 pt-0 border-t border-gray-800">
                          <div className="text-gray-300">{faq.answer}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Timeline */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Shipping Timeline</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xl">1</span>
                    </div>
                    <div>
                      <div className="text-white font-poppins font-semibold text-lg mb-2">Order Placed</div>
                      <div className="text-gray-300">Your order is received and confirmed</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xl">2</span>
                    </div>
                    <div>
                      <div className="text-white font-poppins font-semibold text-lg mb-2">Order Processing</div>
                      <div className="text-gray-300">We prepare your items for shipping (2-3 days)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xl">3</span>
                    </div>
                    <div>
                      <div className="text-white font-poppins font-semibold text-lg mb-2">Order Shipped</div>
                      <div className="text-gray-300">Your order is dispatched with tracking</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xl">4</span>
                    </div>
                    <div>
                      <div className="text-white font-poppins font-semibold text-lg mb-2">In Transit</div>
                      <div className="text-gray-300">Your order is on its way to you</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-black text-xl">5</span>
                    </div>
                    <div>
                      <div className="text-white font-poppins font-semibold text-lg mb-2">Delivered</div>
                      <div className="text-gray-300">Your order arrives at your doorstep!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-12">
              <div className="text-[#00ff00] text-6xl mb-6">📦</div>
              <h3 className="text-3xl font-bold text-white font-poppins mb-4">Ready to Order?</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Now that you know all about our shipping, browse our collection and place your order!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/products"
                  className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/contact"
                  className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/10 transition-all duration-300"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ShippingInfo;