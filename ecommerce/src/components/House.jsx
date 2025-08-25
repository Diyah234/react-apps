import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import building from '../assets/building.png'

const House = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200])

  // Text animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -15 
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.5,
      },
    },
  }

  return (
    <motion.div 
      ref={ref}
      className='relative items-center py-20 bg-[#f8f8f8] overflow-hidden'
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        style={{ y: backgroundY }}
      >
        {/* Geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 border border-[#D9A441]/20 rotate-45"
          animate={{ rotate: [45, 90, 45] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-24 h-24 bg-gradient-to-br from-[#D9A441]/10 to-transparent rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0] 
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className='text-center relative z-10'
      >
        {/* Title with letter-by-letter animation */}
        <motion.div variants={textVariants}>
          <motion.h1 className='text-3xl font-semibold text-[#2B2B2B] mb-6'>
            {"House of Élan, Lagos".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  color: "#D9A441",
                  y: -3,
                  transition: { duration: 0.2 },
                }}
                className="inline-block cursor-default"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          {/* Decorative underline */}
          <motion.div
            className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#D9A441] to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </motion.div>

        {/* Description with typewriter effect */}
        <motion.div variants={textVariants} className="relative">
          <motion.p 
            className='pt-8 w-7/12 mx-auto text-base/6 text-[#4A4A4A] relative'
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: "100%" } : { width: 0 }}
              transition={{ duration: 2, delay: 1.2 }}
              className="inline-block overflow-hidden"
            >
              Nestled in the heart of Lagos, Élan finds its home on Adeola Odeku Street, Victoria Island.
              A timeless expression of elegance and modern sophistication, Élan is more than a place — it is a landmark where
              style meets culture and luxury.
            </motion.span>
          </motion.p>

          {/* Floating accent elements */}
          <motion.div
            className="absolute -top-4 -left-4 w-2 h-2 bg-[#D9A441] rounded-full"
            animate={isInView ? {
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
          />
          <motion.div
            className="absolute -bottom-4 -right-4 w-3 h-3 border border-[#D9A441] rounded-full"
            animate={isInView ? {
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            } : {}}
            transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
          />
        </motion.div>
      </motion.div>

      {/* Enhanced building image with multiple effects */}
      <motion.div 
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className='w-11/12 mx-auto mt-10 relative'
      >
        {/* Main image container with 3D effects */}
        <motion.div
          className="relative overflow-hidden rounded-2xl shadow-2xl"
          whileHover={{
            scale: 1.02,
            rotateX: 2,
            rotateY: 2,
            transition: { duration: 0.6, type: "spring", stiffness: 100 }
          }}
          style={{ 
            y: imageY,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Image with parallax */}
          <motion.img 
            src={building} 
            alt="House of Élan Building"
            className="w-full h-auto"
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.6 }
            }}
          />

          {/* Overlay with gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Animated corner accents */}
          <motion.div
            className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D9A441]"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          />
          <motion.div
            className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D9A441]"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.7 }}
          />

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ transform: "skewX(-15deg)" }}
          />
        </motion.div>

        {/* Floating information cards */}
        <motion.div
          className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-gray-100"
          initial={{ opacity: 0, x: 50, y: 50 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 50, y: 50 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(217, 164, 65, 0.2)"
          }}
        >
          <motion.p 
            className="text-sm font-semibold text-[#D9A441] mb-1"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📍 Victoria Island
          </motion.p>
          <p className="text-xs text-gray-600">Lagos, Nigeria</p>
        </motion.div>

        <motion.div
          className="absolute -top-6 -left-6 bg-gradient-to-r from-[#D9A441] to-[#B8932E] rounded-xl shadow-xl p-4 text-white"
          initial={{ opacity: 0, x: -50, y: -50 }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -50, y: -50 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          whileHover={{ 
            scale: 1.05,
            rotate: 2
          }}
        >
          <motion.p 
            className="text-sm font-semibold mb-1"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Luxury Fashion Hub
          </motion.p>
          <p className="text-xs opacity-90">Since 2020</p>
        </motion.div>
      </motion.div>

      {/* Additional decorative elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 3 }}
      />
    </motion.div>
  )
}

export default House