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