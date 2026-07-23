import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottemtext = () => {
  return (
    <div className='font-[font2] flex leading-tight relative items-center justify-center gap-1  text-[6.5vw] text-white'>
      <div><Link className='text-[2.5vw] font-bold border-3 border-white rounded-full px-8 py-1 transition-colors hover:text-[#D3FD50] hover:border-[#D3FD50]' to='/projects'>PROJECTS</Link></div>
      <div><Link className='text-[2.5vw] font-bold border-3 border-white rounded-full px-8 py-1 transition-colors hover:text-[#D3FD50] hover:border-[#D3FD50]' to='/agents'>AGENTS</Link></div>
    </div>
  )
}

export default HomeBottemtext;