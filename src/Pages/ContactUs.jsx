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