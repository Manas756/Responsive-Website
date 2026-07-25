import React from 'react'

const Maintext = () => {
  return (
<div className="absolute inset-0 z-10 h-60 flex flex-col items-center justify-center">
  <div className="flex items-start">
    <h1 className="font-changa-one text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#0174ad] drop-shadow-lg">
      Be Creative
    </h1>

    <span className="text-sm sm:text-base md:text-lg mt-2 ml-1 text-[#0174ad]">
      ©
    </span>
  </div>


  <div className="mt-10">
    <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center pt-2">
      <div className="w-1.5 h-3 bg-white rounded-full animate-wheel"></div>
    </div>
  </div>
</div>
  )
}

export default Maintext