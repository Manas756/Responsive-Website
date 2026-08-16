import React from 'react'
import {motion} from 'framer-motion'
const Maintext = () => {
  return (
<div className="absolute inset-0 z-10 h-60 flex flex-col items-center justify-center">
  <div className="flex items-start">
    <motion.h1
    initial={{opacity :0,y:50,
      scale:0.9
    }}
    animate={{opacity :1,y:0,scale:1}}
    transition={{type:'spring',stiffness:100,damping:12,delay:0.5
    }} className="font-changa-one text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#0174ad] drop-shadow-lg">
      Be Creative
    </motion.h1>

    <motion.span
      className="text-sm sm:text-base md:text-lg mt-2 ml-1 text-[#0174ad]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      ©
    </motion.span>
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