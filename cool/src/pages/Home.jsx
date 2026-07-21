import React from 'react'
import Video from '../components/home/Video'
import HomeHeroText from '../components/home/HomeHeroText'
import HomeBottemtext from '../components/home/HomeBottemtext'

const Home = () => {
  return (
    <div>
    <div className="h-screen w-screen overflow-hidden fixed">
      <Video/>
    </div> 
    <div className='h-screen w-screen relative text-white justify-between flex-col'>
      <HomeHeroText/>
      <HomeBottemtext/> </div>
    </div>
   
  )
  
}

export default Home