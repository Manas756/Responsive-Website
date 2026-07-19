import React from 'react'

const Video = () => {
  return (
    <div className='h-full w-full'>
        <video className='h-full w-full object-cover' autoPlay loop muted playsInline src="/1080x1080.mp4"></video>
    </div>
  )
}

export default Video