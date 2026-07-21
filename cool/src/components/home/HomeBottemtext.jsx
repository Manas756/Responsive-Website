import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottemtext = () => {
  return (
    <div className='font-[font2] flex items-center justify-center gap-2 '>
      <Link className='text-[6.5vw] text-bold border-3 border-white rounded-full px-8 py-1 '>Projects</Link>
      <Link className='text-[6.5vw] text-bold border-3 border-white rounded-full px-8 py-1 '>Agents</Link>
    </div>
  )
}

export default HomeBottemtext;