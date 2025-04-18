import React from 'react'
import Navbar from '../components/navbar'
import HeroSection from '../components/HeroSection'

import FeaturedProductSection from '../components/FeaturedProductSection'
import Footer from '../components/footer'

const Homepage = () => {
  return (
    <>
     <Navbar/>
     <HeroSection/>
     <FeaturedProductSection/>
     <Footer/>
    </>
  )
}

export default Homepage