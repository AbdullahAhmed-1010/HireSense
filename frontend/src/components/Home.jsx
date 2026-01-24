import React from 'react'
import Navbar from './shared/Navbar.jsx'
import HeroSection from './HeroSection.jsx'
import Category from './Category.jsx'
import LatestJobs from './LatestJobs.jsx'
import Footer from './shared/Footer.jsx'
import useGetAllJobs from '@/hooks/useGetAllJobs.jsx'

const Home = () => {
  useGetAllJobs()
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <Category/>
        <LatestJobs/>
        <Footer/>
    </div>
  )
}

export default Home