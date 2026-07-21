import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div className='font-[font1] text-center'>
      <div className='text-[9.5vw] uppercase leading-[8vw]'>Welcome To</div>
      <div className='text-[9.5vw] justify-center flex items-center uppercase leading-[8vw]'>
        Li<span>fe</span>
      </div>
      <div className='text-[9.5vw] justify-center flex items-center uppercase leading-[8vw]'>
         <div className='h-[8vw] rounded-full overflow-hidden w-[8vw]'>
          <Video /></div>f
        
        <div className='ml-8'>Website</div>
      </div>
    </div>
  )
}

export default HomeHeroText;