import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import '../App.css'
import video from '../assets/video.mp4'

function Modern() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  
  // Parallax effects based on scroll
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8])

  // Mouse tracking for subtle interactions
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 50,
        y: (e.clientY - window.innerHeight / 2) / 50,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Text reveal animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  }

  // Floating particles animation
  const ParticleComponent = ({ delay = 0 }) => (
    <motion.div
      className="absolute w-2 h-2 bg-white/20 rounded-full"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 20,
        opacity: 0 
      }}
      animate={{
        y: -20,
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Animated Background Video with Parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ scale: videoScale }}
      >
        <video
          className="w-full h-full object-cover object-top"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Dynamic Overlay */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <ParticleComponent key={i} delay={i * 1.5} />
      ))}

      {/* Animated Grid Pattern Overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />

      {/* Main Content with Sophisticated Animations */}
      <motion.div 
        className="relative flex flex-col justify-center items-center text-center h-full px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: textY }}
      >
        {/* Animated Logo/Brand */}
        <motion.div
          variants={textVariants}
          className="relative"
          whileHover={{ scale: 1.05 }}
          style={{ 
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5 
          }}
        >
          <motion.h1 
            className="text-white text-lg drop-shadow-md relative z-10"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.2em' }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            {"Élan Premiere".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -5,
                  color: "#D9A441",
                  transition: { duration: 0.2 },
                }}
                className="inline-block cursor-default"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Glowing underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#D9A441] to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 2 }}
          />
        </motion.div>

        {/* Main Tagline with Typewriter Effect */}
        <motion.div variants={textVariants} className="relative mt-8">
          <motion.p 
            className="text-white/90 text-3xl md:text-4xl max-w-2xl drop-shadow-lg font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 2 }}
              className="inline-block overflow-hidden whitespace-nowrap"
            >
              An Expression of Modern Sophistication
            </motion.span>
          </motion.p>
          
          {/* Subtle accent line */}
          <motion.div
            className="w-24 h-px bg-[#D9A441] mx-auto mt-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 2.5 }}
          />
        </motion.div>

        {/* Enhanced CTA Button */}
        <motion.div
          variants={textVariants}
          className="mt-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            className="relative px-8 py-3 text-lg text-white cursor-pointer group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3 }}
          >
            {/* Button Background */}
            <motion.div
              className="absolute inset-0 border border-white/30 rounded-full"
              whileHover={{ 
                borderColor: "rgba(217, 164, 65, 0.8)",
                boxShadow: "0 0 20px rgba(217, 164, 65, 0.3)" 
              }}
            />
            
            {/* Hover fill effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#D9A441] to-[#B8932E] rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Button text */}
            <span className="relative z-10 font-medium tracking-wide">
              Discover More
            </span>
            
            {/* Animated arrow */}
            <motion.span
              className="relative z-10 ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 4 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center"
          whileHover={{ borderColor: "rgba(217, 164, 65, 0.8)" }}
        >
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.p
          className="text-white/60 text-xs mt-2 text-center tracking-wider"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SCROLL
        </motion.p>
      </motion.div>
    </section>
  )
}

export default Modern