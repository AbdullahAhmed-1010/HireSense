import React from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import Category from './Category.jsx'
import LatestJobs from './LatestJobs.jsx'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Category/>
        <LatestJobs/>
        {/* <Footer/> */}
    </div>
  )
}

export default Home