import React from 'react'

const Video = () => {
  return (
    <div className='h-full w-full'>
        <video className='h-full w-full object-cover' autoPlay loop muted playsInline src="/1280x720.mp4"></video>
    </div>
  )
}

export default Video