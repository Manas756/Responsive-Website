import React, { useEffect, useRef, useState } from 'react'
import HangarReveal from './HangerReveal'
import { motion } from 'framer-motion'

const aircraftSpecs = [
  { value: '1958', label: 'First Flight' },
  { value: 'Mach 2.2', label: 'Top Speed' },
  { value: 'United States', label: 'Country' },
  { value: 'Twin Engine', label: 'Configuration' },
]

const specBadges = ['Interceptor', 'Reconnaissance', 'Nuclear-Capable']

const SpecificationBlock = ({ value, label }) => {
  return (
    <div className="group flex min-w-[120px] flex-col gap-3 pb-4 pt-1 transition-transform duration-300 hover:-translate-y-0.5">
      <p className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
        {value}
      </p>
      <div className="h-px w-16 bg-neutral-500/45 transition-colors duration-300 group-hover:bg-neutral-800/65" />
      <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-600 sm:text-xs">
        {label}
      </p>
    </div>
  )
}

const Body = () => {
  const [playAnimation, setPlayAnimation] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-[#E5E5E5] px-6 py-12 sm:px-10 lg:min-h-screen lg:px-16 lg:py-16">
      <p className="pointer-events-none absolute left-6 top-4 text-[10px] uppercase tracking-[0.3em] text-neutral-500 sm:left-10 sm:top-6">
        Section 04 / Aircraft Archive
      </p>
      <p className="pointer-events-none absolute -left-8 top-16 font-serif text-7xl tracking-wide text-neutral-800/10 sm:text-8xl lg:text-9xl">
        PHANTOM
      </p>
      <p className="pointer-events-none absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:bottom-8 sm:right-10">
        34.733° N — 86.586° W
      </p>

      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 border border-neutral-800/15 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
        <div className="lg:col-span-5">
          
          <motion.p
      initial={{
    opacity: 0,
    y: 50,
    scale: 0.9,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }} className="js-aircraft-label mb-3 text-[11px] uppercase tracking-[0.22em] text-neutral-600">
            McDonnell Douglas / F-4E Variant
          </motion.p>
          <motion.h2   initial={{
    opacity: 0,
    y: 50,
    scale: 0.9,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }} className="js-aircraft-heading font-serif text-5xl leading-[0.92] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl xl:text-8xl">
            F-4
            <motion.span className="block">PHANTOM II</motion.span>
          </motion.h2>
          <motion.p   initial={{
    opacity: 0,
    y: 50,
    scale: 0.9,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }} className="js-aircraft-subtitle mt-5 text-sm uppercase tracking-[0.2em] text-neutral-700 sm:text-base">
            Legendary Supersonic Fighter
          </motion.p>
          <motion.p   initial={{
    opacity: 0,
    y: 50,
    scale: 0.9,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }} className="js-aircraft-description mt-6 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base">
            A defining silhouette of post-war aviation, the F-4 Phantom II paired
            uncompromising thrust with multirole versatility. Engineered for speed,
            adapted for endurance, and remembered for its unmistakable aggression,
            it remains a benchmark in military aircraft heritage.
          </motion.p>

          <div className="js-aircraft-badges mt-7 flex flex-wrap gap-2">
            {specBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-neutral-700/35 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-neutral-700 sm:text-[11px]"
              >
                {badge}
              </span>
            ))}
          </div>

      

          <motion.div  initial={{
    opacity: 0,
    y: 50,
    scale: 0.9,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }} className="js-aircraft-specs mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-neutral-800/20 pt-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {aircraftSpecs.map((spec) => (
              <SpecificationBlock
                key={spec.label}
                value={spec.value}
                label={spec.label}
              />
            ))}
          </motion.div>
        </div>

        <div className="lg:col-span-7 lg:pl-4">
          <div className="plane-placeholder relative h-[320px] w-full overflow-hidden border border-dashed border-neutral-700/30 bg-[#E5E5E5] sm:h-[420px] lg:h-[500px]">
            <div className="absolute left-6 right-6 top-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-neutral-500 z-10 pointer-events-none">
              <span>3D MODEL STAGE</span>
              <span>READY FOR R3F</span>
            </div>
            <motion.div  initial={{
    opacity: 0,
    y: 50,
    scale: 0.9,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }}  className="absolute inset-0 pt-12 pb-6 px-6 ">
              <HangarReveal />
            </motion.div>
            <div className="absolute bottom-6 left-8 right-6 h-px bg-neutral-700/25" />
          </div>
        </div>
      </div>
    </section>

  )
}

export default Body