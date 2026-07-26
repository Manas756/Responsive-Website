import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
  return (
    <div
      className='font-[Yuyu] flex flex-wrap items-end justify-center gap-x-4 gap-y-2 px-4 py-7 text-center'
      style={{ fontSize: 'clamp(2rem, 11vw, 4rem)' }}
    >
      <div className='uppercase leading-[0.9]'>BE STORED</div>
      <div className='flex items-center justify-center uppercase leading-[0.9]'>Be</div>
      <div className='flex items-center justify-center uppercase leading-[0.9]'>
        Cre
        <div className='mx-2 mb-2 h-[3vw] min-h-[2rem] w-[7vw] min-w-[4rem] overflow-hidden rounded-full'>
          <Video />
        </div>
        ative
      </div>
      <div className='w-full text-sm uppercase tracking-[0.2em] md:text-base'>-By Manas</div>
    </div>
  )
}

export default HomeHeroText;