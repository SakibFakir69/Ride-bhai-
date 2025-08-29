


import HeroSection from './components/HeroSection'
import LandingFeatures from './LandingFeatures'
import LandingAbout from './LandingAbout'
import LandingFAQ from './LandingFAQ'
import LandingContact from './LandingContact'

function LandingHome() {
  return (
    <div className='dark:bg-black'>
        <HeroSection/>
        <LandingFeatures/>
        <LandingAbout/>
        <LandingContact/>
        <LandingFAQ/>

      
      
    </div>
  )
}

export default LandingHome
