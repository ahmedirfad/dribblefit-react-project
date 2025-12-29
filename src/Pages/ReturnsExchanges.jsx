import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Layout/Navbar';
import Footer from '../Components/Layout/Footer';

function ReturnsExchanges() {
  const { isAuthenticated, user } = useAuth();
  const [returnForm, setReturnForm] = useState({
    orderNumber: '',
    reason: '',
    product: '',
    condition: '',
    comments: ''
  });

  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const returnReasons = [
    { id: 'wrong-size', label: 'Wrong Size' },
    { id: 'defective', label: 'Defective Product' },
    { id: 'not-as-described', label: 'Not as Described' },
    { id: 'wrong-item', label: 'Wrong Item Received' },
    { id: 'change-mind', label: 'Changed My Mind' },
    { id: 'better-fit', label: 'Need Different Size' }
  ];

  const conditionOptions = [
    { id: 'new', label: 'Unworn with tags' },
    { id: 'worn-once', label: 'Worn once, like new' },
    { id: 'no-tags', label: 'Unworn without tags' },
    { id: 'signs-wear', label: 'Shows signs of wear' }
  ];

  const policy = {
    returnWindow: '30 days from delivery',
    exchangeWindow: '30 days from delivery',
    refundProcessing: '5-7 business days',
    returnShipping: 'Free for defective/wrong items',
    nonReturnable: [
      'Customized items (player names/numbers)',
      'Items without original tags',
      'Worn or used items',
      'Gift cards',
      'Personalized items'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Initiate Return',
        description: 'Fill out the return form below or contact our support team.',
        time: 'Within 30 days'
      },
      {
        step: 2,
        title: 'Get Return Label',
        description: 'We\'ll email you a prepaid return shipping label (if applicable).',
        time: '24 hours'
      },
      {
        step: 3,
        title: 'Ship Item Back',
        description: 'Pack item securely with all original tags and accessories.',
        time: '5-7 days'
      },
      {
        step: 4,
        title: 'Inspection & Processing',
        description: 'We inspect the returned item and process your refund/exchange.',
        time: '3-5 days'
      },
      {
        step: 5,
        title: 'Refund/Exchange Complete',
        description: 'Refund issued to original payment method or exchange shipped.',
        time: '5-7 days'
      }
    ]
  };

  const faqs = [
    {
      question: 'How long does it take to process a return?',
      answer: 'Once we receive your return, it takes 3-5 business days to inspect and process. Refunds are then issued within 5-7 business days.'
    },
    {
      question: 'Are customized jerseys returnable?',
      answer: 'No, customized items (with player names, numbers, or patches) cannot be returned or exchanged unless they are defective.'
    },
    {
      question: 'Do I have to pay for return shipping?',
      answer: 'Return shipping is free for defective items or if we made an error. For other returns, you may be responsible for return shipping costs.'
    },
    {
      question: 'Can I exchange for a different size?',
      answer: 'Yes! You can exchange for a different size within 30 days of delivery. The item must be unworn with original tags attached.'
    },
    {
      question: 'How will I receive my refund?',
      answer: 'Refunds are issued to the original payment method. Credit/debit card refunds take 5-7 business days, while UPI refunds are usually faster.'
    },
    {
      question: 'What if I received a damaged or wrong item?',
      answer: 'Contact us immediately with photos of the damaged/wrong item. We will arrange a free pickup and replacement at no cost to you.'
    }
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReturnForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReturn = (e) => {
    e.preventDefault();
    // In a real app, this would submit to your backend
    alert(`Return request submitted for order ${returnForm.orderNumber}. Our team will contact you within 24 hours.`);
    setReturnForm({
      orderNumber: '',
      reason: '',
      product: '',
      condition: '',
      comments: ''
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a]">
        <Navbar />
        <div className="pt-32 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-[#00ff00] text-6xl mb-6">🔄</div>
            <div className="text-white text-2xl font-bold mb-4">Authentication Required</div>
            <p className="text-gray-400 mb-8">Please login to access returns & exchanges</p>
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
            <div className="text-[#00ff00] text-6xl mb-6">🔄</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-4">
              RETURNS & <span className="text-[#00ff00]">EXCHANGES</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hassle-free returns and exchanges within {policy.returnWindow}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Policy Summary */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Policy Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Return Window</span>
                    <span className="text-[#00ff00] font-bold">{policy.returnWindow}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Exchange Window</span>
                    <span className="text-[#00ff00] font-bold">{policy.exchangeWindow}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Refund Processing</span>
                    <span className="text-[#00ff00] font-bold">{policy.refundProcessing}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Return Shipping</span>
                    <span className="text-[#00ff00] font-bold">Free for errors</span>
                  </div>
                </div>
              </div>

              {/* Non-Returnable Items */}
              <div className="bg-[#111111] border border-red-500/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Non-Returnable Items</h3>
                <div className="space-y-3">
                  {policy.nonReturnable.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                        <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <span className="text-gray-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Quick Links</h3>
                <div className="space-y-1">
                  <Link to="/orders" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    My Orders
                  </Link>
                  <Link to="/shipping-info" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Shipping Info
                  </Link>
                  <Link to="/contact" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Contact Support
                  </Link>
                  <Link to="/products" className="block text-gray-300 hover:text-[#00ff00] py-3 px-4 rounded-lg hover:bg-[#00ff00]/10 transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-6">
                <h3 className="text-white font-poppins font-semibold text-xl mb-6">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00] text-lg">📧</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Email Support</div>
                      <div className="text-white text-sm">returns@jerseystore.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#00ff00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-[#00ff00] text-lg">📞</span>
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Call Us</div>
                      <div className="text-white">+91 98765 43210</div>
                      <div className="text-gray-400 text-xs">Mon-Sat: 9 AM - 7 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Return Process Timeline */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Return Process</h2>
                <div className="space-y-6">
                  {policy.processSteps.map((step) => (
                    <div key={step.step} className="flex items-start gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00ff00] to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black font-bold text-lg">{step.step}</span>
                        </div>
                        {step.step < policy.processSteps.length && (
                          <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-[#00ff00] to-emerald-600"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-poppins font-semibold text-lg mb-1">{step.title}</div>
                        <div className="text-gray-300 mb-2">{step.description}</div>
                        <div className="text-gray-400 text-sm">Timeframe: {step.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return Request Form */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Start a Return</h2>
                <form onSubmit={handleSubmitReturn} className="space-y-6">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Order Number *</label>
                    <input
                      type="text"
                      name="orderNumber"
                      value={returnForm.orderNumber}
                      onChange={handleFormChange}
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      placeholder="e.g., ORD-12345678"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Reason for Return *</label>
                    <div className="grid grid-cols-2 gap-3">
                      {returnReasons.map((reason) => (
                        <label 
                          key={reason.id}
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                            returnForm.reason === reason.id 
                              ? 'border-[#00ff00] bg-[#00ff00]/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="reason"
                            value={reason.id}
                            checked={returnForm.reason === reason.id}
                            onChange={handleFormChange}
                            className="text-[#00ff00] focus:ring-[#00ff00]"
                            required
                          />
                          <span className="text-white text-sm">{reason.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Product Name *</label>
                    <input
                      type="text"
                      name="product"
                      value={returnForm.product}
                      onChange={handleFormChange}
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00]"
                      placeholder="e.g., Argentina Home Jersey 2022 - Size M"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Item Condition *</label>
                    <div className="space-y-3">
                      {conditionOptions.map((condition) => (
                        <label 
                          key={condition.id}
                          className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                            returnForm.condition === condition.id 
                              ? 'border-[#00ff00] bg-[#00ff00]/10' 
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <input
                            type="radio"
                            name="condition"
                            value={condition.id}
                            checked={returnForm.condition === condition.id}
                            onChange={handleFormChange}
                            className="text-[#00ff00] focus:ring-[#00ff00]"
                            required
                          />
                          <span className="text-white text-sm">{condition.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm mb-2">Additional Comments</label>
                    <textarea
                      name="comments"
                      value={returnForm.comments}
                      onChange={handleFormChange}
                      rows="4"
                      className="w-full bg-[#1a1a1a] border border-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#00ff00] resize-none"
                      placeholder="Please provide any additional details about your return..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#00ff00] to-emerald-600 text-black font-bold py-4 rounded-lg hover:opacity-90 transition-opacity"
                    >
                      SUBMIT RETURN REQUEST
                    </button>
                    <p className="text-gray-400 text-xs text-center mt-3">
                      By submitting, you agree to our Return Policy. We'll contact you within 24 hours.
                    </p>
                  </div>
                </form>
              </div>

              {/* FAQs */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
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

              {/* Exchange Policy */}
              <div className="bg-[#111111] border border-[#00ff00]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white font-poppins mb-6">Exchange Policy</h2>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-xl p-6">
                    <div className="text-white font-poppins font-bold text-lg mb-4">Size Exchange Process</div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black text-sm">1</span>
                        </div>
                        <span className="text-white">Request exchange within {policy.exchangeWindow}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black text-sm">2</span>
                        </div>
                        <span className="text-white">Item must be unworn with original tags</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black text-sm">3</span>
                        </div>
                        <span className="text-white">We'll ship replacement once return is received</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#00ff00] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-black text-sm">4</span>
                        </div>
                        <span className="text-white">No extra charge for size exchanges</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#1a1a1a] rounded-xl p-6">
                    <div className="text-white font-poppins font-semibold text-lg mb-4">Important Notes</div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Exchanges are subject to stock availability</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300">If desired size is unavailable, we'll issue a refund</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                          <svg className="w-5 h-5 text-[#00ff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-300">Customized items cannot be exchanged unless defective</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-[#00ff00]/10 to-emerald-600/10 border border-[#00ff00]/30 rounded-2xl p-12">
              <div className="text-[#00ff00] text-6xl mb-6">✅</div>
              <h3 className="text-3xl font-bold text-white font-poppins mb-4">Still Have Questions?</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Our customer support team is here to help you with any return or exchange queries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/contact"
                  className="bg-[#00ff00] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/90 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
                >
                  Contact Support
                </Link>
                <Link 
                  to="/orders"
                  className="bg-transparent border-2 border-[#00ff00] text-[#00ff00] font-bold px-8 py-4 rounded-lg hover:bg-[#00ff00]/10 transition-all duration-300"
                >
                  View My Orders
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

export default ReturnsExchanges;