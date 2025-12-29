import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFAQs, setActiveFAQs] = useState({});

  const categories = [
    { id: 'all', label: 'All Questions', icon: '❓', count: 0 },
    { id: 'ordering', label: 'Ordering & Payment', icon: '🛒', count: 8 },
    { id: 'shipping', label: 'Shipping & Delivery', icon: '🚚', count: 7 },
    { id: 'returns', label: 'Returns & Exchanges', icon: '🔄', count: 6 },
    { id: 'sizing', label: 'Sizing & Fit', icon: '📏', count: 6 },
    { id: 'products', label: 'Products & Quality', icon: '⚽', count: 5 },
    { id: 'account', label: 'Account & Security', icon: '👤', count: 4 },
    { id: 'customization', label: 'Customization', icon: '✏️', count: 5 }
  ];

  const faqs = {
    ordering: [
      {
        question: 'How do I place an order?',
        answer: 'Browse our collection, select your desired jersey, choose size and any customization options, add to cart, and proceed to checkout. You\'ll need to create an account or login to complete your purchase.',
        tags: ['ordering', 'checkout']
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept Credit/Debit Cards (Visa, MasterCard, American Express), UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD) for orders within India.',
        tags: ['payment', 'cod']
      },
      {
        question: 'Is it safe to use my credit card on your site?',
        answer: 'Yes! We use SSL encryption and secure payment gateways to protect your information. We don\'t store your credit card details on our servers.',
        tags: ['security', 'payment']
      },
      {
        question: 'Do you charge any additional fees?',
        answer: 'No hidden fees! The price you see is what you pay. For Cash on Delivery orders, there is a ₹10 COD charge. International shipping has separate charges.',
        tags: ['pricing', 'cod']
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer support team immediately.',
        tags: ['order', 'modification']
      },
      {
        question: 'Do you offer bulk discounts for team orders?',
        answer: 'Yes! We offer special discounts for team orders (10+ jerseys). Contact our sales team at teamorders@jerseystore.com for customized pricing.',
        tags: ['bulk', 'teams']
      },
      {
        question: 'How will I know if my order is confirmed?',
        answer: 'You\'ll receive an order confirmation email immediately after purchase. You can also check your order status in your account dashboard.',
        tags: ['confirmation', 'email']
      },
      {
        question: 'Do you accept international orders?',
        answer: 'Yes, we ship to select countries including USA, UK, Canada, Australia, UAE, and Singapore. International shipping charges apply.',
        tags: ['international', 'shipping']
      }
    ],
    shipping: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping within India takes 5-7 business days. Express shipping (2-3 days) and overnight shipping (1 day) are also available.',
        tags: ['delivery', 'time']
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders within India. Express and overnight shipping have additional charges.',
        tags: ['free', 'shipping']
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order is shipped, you\'ll receive a tracking number via email and SMS. You can track it on our website or the courier\'s website.',
        tags: ['tracking', 'delivery']
      },
      {
        question: 'What are your shipping zones and delivery times?',
        answer: 'Metro cities: 3-5 days, Tier 1 cities: 4-6 days, Tier 2/3 cities: 5-7 days, Remote areas: 7-10 days. Check our Shipping Info page for details.',
        tags: ['zones', 'delivery']
      },
      {
        question: 'Do you ship on weekends and holidays?',
        answer: 'We process and ship orders Monday through Saturday. Orders placed on weekends are processed on the next business day.',
        tags: ['weekend', 'holidays']
      },
      {
        question: 'Can I change my shipping address after ordering?',
        answer: 'Address changes can be made within 12 hours of ordering. Contact customer support immediately if you need to change your shipping address.',
        tags: ['address', 'change']
      },
      {
        question: 'What happens if I\'m not available to receive my package?',
        answer: 'The courier will attempt delivery 3 times. After that, the package returns to us and a return shipping fee may apply for reshipping.',
        tags: ['delivery', 'attempts']
      }
    ],
    returns: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 30 days of delivery. Items must be unworn, unwashed, and with original tags attached. Customized items are non-returnable.',
        tags: ['policy', 'returns']
      },
      {
        question: 'How do I return an item?',
        answer: 'Initiate a return from your account dashboard, print the return label, pack the item securely, and ship it back. We\'ll process your refund once received.',
        tags: ['process', 'returns']
      },
      {
        question: 'Are customized jerseys returnable?',
        answer: 'No, customized items (with player names, numbers, or patches) cannot be returned or exchanged unless they are defective or we made an error.',
        tags: ['customization', 'non-returnable']
      },
      {
        question: 'How long does it take to process a refund?',
        answer: 'Once we receive your return, refunds are processed within 3-5 business days. It may take 5-7 additional days to appear in your account.',
        tags: ['refund', 'processing']
      },
      {
        question: 'Who pays for return shipping?',
        answer: 'Return shipping is free for defective items or if we made an error. For other returns, you may be responsible for return shipping costs.',
        tags: ['shipping', 'returns']
      },
      {
        question: 'Can I exchange for a different size?',
        answer: 'Yes! You can exchange for a different size within 30 days. The item must be unworn with original tags. Size exchanges are free.',
        tags: ['exchange', 'size']
      }
    ],
    sizing: [
      {
        question: 'How do I choose the right size?',
        answer: 'Check our detailed Size Guide with measurements for each size. Measure your chest and compare with our size chart for the perfect fit.',
        tags: ['measurement', 'fit']
      },
      {
        question: 'Do jerseys run true to size?',
        answer: 'Our jerseys follow standard sizing. For a tighter athletic fit, choose your regular size. For a looser fit, consider going one size up.',
        tags: ['fit', 'sizing']
      },
      {
        question: 'What if I\'m between sizes?',
        answer: 'If you\'re between sizes, we recommend going with the larger size for a more comfortable fit, especially if you plan to wear layers.',
        tags: ['between', 'sizes']
      },
      {
        question: 'Do you have different fits (slim, regular, relaxed)?',
        answer: 'We offer standard fit for most jerseys. Some collections may have athletic (slimmer) or relaxed fits - check individual product descriptions.',
        tags: ['fit', 'types']
      },
      {
        question: 'How do I measure myself for the perfect fit?',
        answer: 'Measure your chest at the widest part, waist at the narrowest part, and compare with our size chart. Use a soft measuring tape over light clothing.',
        tags: ['measurement', 'guide']
      },
      {
        question: 'Do sizes vary between different teams/collections?',
        answer: 'No, all our jerseys follow the same sizing standards. Your size will be consistent across different teams, leagues, and collections.',
        tags: ['consistency', 'sizing']
      }
    ],
    products: [
      {
        question: 'Are your jerseys authentic?',
        answer: 'Yes! We sell 100% authentic licensed jerseys from official manufacturers. All products come with authenticity tags and certificates.',
        tags: ['authentic', 'quality']
      },
      {
        question: 'What materials are your jerseys made from?',
        answer: 'Our jerseys are made from high-quality, breathable polyester fabrics designed for performance and comfort, often with moisture-wicking technology.',
        tags: ['materials', 'fabric']
      },
      {
        question: 'How should I care for my jersey?',
        answer: 'Wash cold inside out, gentle cycle. Hang dry or lay flat. Do not use bleach. Iron on low heat if needed, avoiding prints and patches.',
        tags: ['care', 'washing']
      },
      {
        question: 'Do jerseys shrink after washing?',
        answer: 'Our jerseys are made from pre-shrunk fabric. Follow care instructions (cold wash, hang dry) to minimize any potential shrinkage.',
        tags: ['shrinkage', 'washing']
      },
      {
        question: 'Are the colors fade-resistant?',
        answer: 'Yes, our jerseys use high-quality dyes that are fade-resistant. Follow care instructions to maintain color vibrancy for longer.',
        tags: ['colors', 'fade']
      }
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click "Register" at the top of any page, enter your details, verify your email, and your account will be ready to use.',
        tags: ['register', 'account']
      },
      {
        question: 'I forgot my password. How can I reset it?',
        answer: 'Click "Forgot Password" on the login page, enter your email, and follow the instructions sent to your email to reset your password.',
        tags: ['password', 'reset']
      },
      {
        question: 'How do I update my account information?',
        answer: 'Login to your account, go to "My Profile", and edit your personal information, shipping addresses, or contact details.',
        tags: ['update', 'profile']
      },
      {
        question: 'Is my personal information secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your personal information. We never share your data with third parties.',
        tags: ['security', 'privacy']
      }
    ],
    customization: [
      {
        question: 'What customization options are available?',
        answer: 'You can add player names, numbers, patches (league badges, club crests), and sometimes sleeve badges. Options vary by jersey.',
        tags: ['options', 'personalization']
      },
      {
        question: 'How long does customization take?',
        answer: 'Customized items typically take 2-3 additional business days for processing before shipping.',
        tags: ['time', 'processing']
      },
      {
        question: 'Can I customize any jersey?',
        answer: 'Most jerseys can be customized, but some limited edition or special jerseys may have restrictions. Check individual product pages.',
        tags: ['availability', 'customization']
      },
      {
        question: 'How are names and numbers applied?',
        answer: 'We use professional heat-press technology for precise application that is durable and withstands washing when cared for properly.',
        tags: ['application', 'quality']
      },
      {
        question: 'Can I get a custom design or logo?',
        answer: 'For custom designs or team logos, please contact our custom orders team at custom@jerseystore.com for bulk orders (minimum 10 jerseys).',
        tags: ['design', 'teams']
      }
    ]
  };

  // Calculate total count for "All Questions"
  const totalCount = Object.values(faqs).reduce((sum, category) => sum + category.length, 0);
  categories[0].count = totalCount;

  const toggleFAQ = (categoryId, index) => {
    const key = `${categoryId}-${index}`;
    setActiveFAQs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Get filtered FAQs
  const getFilteredFAQs = () => {
    if (activeCategory === 'all') {
      // Combine all FAQs
      const allFAQs = [];
      Object.entries(faqs).forEach(([categoryId, categoryFAQs]) => {
        categoryFAQs.forEach((faq, index) => {
          allFAQs.push({
            ...faq,
            categoryId,
            originalIndex: index
          });
        });
      });
      
      // Filter by search term if present
      if (searchTerm.trim()) {
        return allFAQs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      return allFAQs;
    } else {
      // Get FAQs for specific category
      let categoryFAQs = faqs[activeCategory] || [];
      
      // Filter by search term if present
      if (searchTerm.trim()) {
        categoryFAQs = categoryFAQs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
      
      return categoryFAQs.map((faq, index) => ({
        ...faq,
        categoryId: activeCategory,
        originalIndex: index
      }));
    }
  };

  const filteredFAQs = getFilteredFAQs();

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <div className="pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[#00ff00] text-6xl mb-6">❓</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
              FREQUENTLY ASKED <span className="text-[#00ff00]">QUESTIONS</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Find quick answers to common questions about our jerseys, ordering, shipping, and more
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111111] border border-gray-700 text-white px-6 py-4 pl-14 rounded-2xl focus:outline-none focus:border-[#00ff00] text-lg"
              />
              <svg className="w-6 h-6 text-gray-500 absolute left-5 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6 sticky top-24">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setSearchTerm('');
                      }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                        activeCategory === category.id
                          ? 'bg-[#00ff00] text-black font-bold'
                          : 'bg-[#1a1a1a] text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span>{category.label}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        activeCategory === category.id
                          ? 'bg-black/20'
                          : 'bg-gray-800'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Popular Topics */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-white font-poppins font-semibold mb-4">Popular Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {['sizing', 'returns', 'customization', 'shipping', 'payment'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h4 className="text-white font-poppins font-semibold mb-4">Quick Links</h4>
                  <div className="space-y-2">
                    <Link to="/contact" className="block text-gray-300 hover:text-[#00ff00] py-2 px-3 rounded-lg hover:bg-[#00ff00]/10 transition-colors text-sm">
                      Still have questions? Contact us
                    </Link>
                    <Link to="/size-guide" className="block text-gray-300 hover:text-[#00ff00] py-2 px-3 rounded-lg hover:bg-[#00ff00]/10 transition-colors text-sm">
                      View Size Guide
                    </Link>
                    <Link to="/shipping-info" className="block text-gray-300 hover:text-[#00ff00] py-2 px-3 rounded-lg hover:bg-[#00ff00]/10 transition-colors text-sm">
                      Shipping Information
                    </Link>
                    <Link to="/returns" className="block text-gray-300 hover:text-[#00ff00] py-2 px-3 rounded-lg hover:bg-[#00ff00]/10 transition-colors text-sm">
                      Returns & Exchanges
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              {searchTerm && (
                <div className="mb-6 p-4 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded-xl">
                  <div className="text-[#00ff00]">
                    Showing {filteredFAQs.length} results for "{searchTerm}"
                  </div>
                </div>
              )}

              {filteredFAQs.length === 0 ? (
                <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-12 text-center">
                  <div className="text-[#00ff00] text-6xl mb-6">🔍</div>
                  <h3 className="text-2xl font-bold text-white font-poppins mb-4">No questions found</h3>
                  <p className="text-gray-400 mb-8">
                    {searchTerm 
                      ? `No results found for "${searchTerm}". Try a different search term or browse categories.`
                      : 'No questions available in this category.'}
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                    className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors inline-block"
                  >
                    View All Questions
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Category Header */}
                  {activeCategory !== 'all' && (
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-white font-poppins">
                          {categories.find(c => c.id === activeCategory)?.label}
                        </h2>
                        <p className="text-gray-400 mt-2">
                          {filteredFAQs.length} questions in this category
                        </p>
                      </div>
                      <div className="text-3xl">
                        {categories.find(c => c.id === activeCategory)?.icon}
                      </div>
                    </div>
                  )}

                  {/* FAQ List */}
                  <div className="space-y-4">
                    {filteredFAQs.map((faq, index) => {
                      const key = `${faq.categoryId}-${faq.originalIndex}`;
                      const isOpen = activeFAQs[key];
                      
                      return (
                        <div 
                          key={key}
                          className="bg-[#111111] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300"
                        >
                          <button
                            onClick={() => toggleFAQ(faq.categoryId, faq.originalIndex)}
                            className="w-full text-left p-6 flex justify-between items-start hover:bg-[#1a1a1a]/50 transition-colors"
                          >
                            <div className="flex-1 pr-6">
                              <div className="text-white font-poppins font-semibold text-lg mb-2">{faq.question}</div>
                              <div className="flex flex-wrap gap-2">
                                {faq.tags.map((tag, tagIndex) => (
                                  <span 
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {activeCategory === 'all' && (
                                  <span className="px-2 py-1 bg-[#00ff00]/10 text-[#00ff00] text-xs rounded-full">
                                    {categories.find(c => c.id === faq.categoryId)?.label}
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-[#00ff00] text-2xl flex-shrink-0">
                              {isOpen ? '−' : '+'}
                            </span>
                          </button>
                          
                          {isOpen && (
                            <div className="p-6 pt-0 border-t border-gray-800 animate-fade-in">
                              <div className="text-gray-300 leading-relaxed">{faq.answer}</div>
                              
                              {/* Related Questions */}
                              {activeCategory === 'all' && (
                                <div className="mt-4 pt-4 border-t border-gray-800">
                                  <div className="text-gray-400 text-sm mb-2">Related questions:</div>
                                  <div className="space-y-2">
                                    {faqs[faq.categoryId]
                                      ?.filter((relatedFaq, relatedIndex) => 
                                        relatedIndex !== faq.originalIndex && 
                                        (relatedFaq.tags.some(tag => faq.tags.includes(tag)) || 
                                         relatedFaq.question.toLowerCase().includes(faq.question.split(' ')[0].toLowerCase()))
                                      )
                                      .slice(0, 2)
                                      .map((relatedFaq, relatedIndex) => (
                                        <button
                                          key={relatedIndex}
                                          onClick={() => toggleFAQ(faq.categoryId, relatedIndex)}
                                          className="block w-full text-left text-gray-300 hover:text-[#00ff00] transition-colors text-sm"
                                        >
                                          → {relatedFaq.question}
                                        </button>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pagination/View More */}
                  {activeCategory === 'all' && filteredFAQs.length > 10 && (
                    <div className="text-center pt-6">
                      <div className="text-gray-400 mb-4">
                        Showing {Math.min(10, filteredFAQs.length)} of {filteredFAQs.length} questions
                      </div>
                      <button
                        className="bg-transparent border border-[#00ff00] text-[#00ff00] px-6 py-3 rounded-lg hover:bg-[#00ff00]/10 transition-colors"
                      >
                        Load More Questions
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Still Have Questions */}
              <div className="mt-12 bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="text-white font-poppins font-bold text-xl mb-2">Still have questions?</div>
                    <div className="text-gray-300">
                      Can't find what you're looking for? Our support team is here to help!
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link 
                      to="/contact"
                      className="bg-[#00ff00] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#00ff00]/90 transition-colors text-center"
                    >
                      Contact Support
                    </Link>
                    <a 
                      href="mailto:support@jerseystore.com"
                      className="bg-transparent border border-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center"
                    >
                      Email Us
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-[#00ff00] text-3xl mb-4">📧</div>
                  <div className="text-white font-semibold mb-2">Email Support</div>
                  <div className="text-gray-400 text-sm">support@jerseystore.com</div>
                  <div className="text-gray-500 text-xs mt-2">Response within 24 hours</div>
                </div>
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-[#00ff00] text-3xl mb-4">📞</div>
                  <div className="text-white font-semibold mb-2">Call Us</div>
                  <div className="text-gray-400 text-sm">+91 98765 43210</div>
                  <div className="text-gray-500 text-xs mt-2">Mon-Sat: 9 AM - 7 PM</div>
                </div>
                <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-[#00ff00] text-3xl mb-4">💬</div>
                  <div className="text-white font-semibold mb-2">Live Chat</div>
                  <div className="text-gray-400 text-sm">Available on website</div>
                  <div className="text-gray-500 text-xs mt-2">Click the chat icon below</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
      {/* Chat Icon */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-[#00ff00] rounded-full flex items-center justify-center shadow-lg hover:bg-[#00ff00]/90 transition-colors z-40">
        <span className="text-2xl">💬</span>
      </button>

      <style jsx>{`
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
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default FAQ;