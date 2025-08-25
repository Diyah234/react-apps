import React, { useState, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const footerRef = useRef(null)
  const isInView = useInView(footerRef, { once: false, margin: "-50px" })
  
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true)
      setTimeout(() => setIsSubscribed(false), 3000)
      setEmail('')
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15 
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const linkHoverVariants = {
    rest: { scale: 1, color: "#9ca3af" },
    hover: { 
      scale: 1.05, 
      color: "#8e44ad",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      } 
    },
    tap: { scale: 0.95 },
  }

  return (
    <motion.footer 
      ref={footerRef}
      className="relative p-10 pt-14 bg-[#121212] text-gray-300 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Grid pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
          transition={{ duration: 2 }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(142, 68, 173, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(142, 68, 173, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 right-20 w-24 h-24 border border-[#8e44ad]/20 rotate-12"
          animate={{ 
            rotate: [12, 57, 12],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-br from-[#8e44ad]/10 to-transparent rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10"
      >
        {/* Newsletter Section with Enhanced Animation */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.h2 
            className="text-xl font-semibold text-white mb-6 relative"
            whileHover={{ scale: 1.02 }}
          >
            {"Inspire me with the latest Élan news".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.03,
                }}
                whileHover={{
                  color: "#8e44ad",
                  y: -2,
                  transition: { duration: 0.1 },
                }}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
            
            {/* Decorative accent */}
            <motion.div
              className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#8e44ad] to-transparent"
              initial={{ width: 0 }}
              animate={isInView ? { width: "60%" } : { width: 0 }}
              transition={{ duration: 1, delay: 1 }}
            />
          </motion.h2>
          
          {/* Enhanced Input Section */}
          <motion.div 
            className="flex flex-row gap-4 flex-wrap"
            variants={itemVariants}
          >
            <motion.div 
              className="relative"
              whileFocus={{ scale: 1.02 }}
            >
              <motion.div
                className="p-2 border border-gray-600 rounded-lg w-80 bg-[#1a1a1a] relative overflow-hidden"
                whileHover={{ 
                  borderColor: "#8e44ad",
                  boxShadow: "0 0 20px rgba(142, 68, 173, 0.2)"
                }}
                whileFocus={{ 
                  borderColor: "#8e44ad",
                  boxShadow: "0 0 30px rgba(142, 68, 173, 0.3)"
                }}
              >
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none px-2 w-full bg-transparent text-gray-200 placeholder-gray-500 relative z-10"
                />
                
                {/* Input highlight effect */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#8e44ad]"
                  initial={{ width: 0 }}
                  animate={{ width: email ? "100%" : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
            
            {/* Enhanced Subscribe Button */}
            <motion.button
              onClick={handleSubscribe}
              className="relative bg-[#8e44ad] text-white px-6 py-2 rounded-lg font-medium overflow-hidden group"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(142, 68, 173, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubscribed}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#732d91] to-[#a855f7]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Button text */}
              <motion.span
                className="relative z-10"
                animate={isSubscribed ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {isSubscribed ? "✓ Subscribed!" : "Confirm"}
              </motion.span>
              
              {/* Success particles */}
              {isSubscribed && (
                <>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 1,
                        scale: 0 
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        opacity: 0,
                        scale: [0, 1, 0]
                      }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      style={{
                        top: "50%",
                        left: "50%",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer Links with Advanced Animations */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pt-12"
          variants={containerVariants}
        >
          {/* Branding Section */}
          <motion.div variants={itemVariants} className="relative">
            <motion.h3 
              className="text-lg font-semibold text-white mb-3"
              whileHover={{ color: "#8e44ad" }}
            >
              Branding
            </motion.h3>
            <motion.p 
              className="font-bold text-xl relative"
              whileHover={{ scale: 1.05 }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                backgroundPosition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{
                background: "linear-gradient(45deg, #8e44ad, #a855f7, #8e44ad)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ÉLAN
            </motion.p>
            <motion.p 
              className="text-gray-400 mt-2"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Redefining luxury fashion in Lagos.
            </motion.p>
            
            {/* Decorative element */}
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 border border-[#8e44ad]/30 rounded-full"
              animate={{ 
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>

          {/* Location Section */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold text-white mb-3"
              whileHover={{ color: "#8e44ad" }}
            >
              📍 Location
            </motion.h3>
            <motion.p 
              className="hover:text-[#8e44ad] transition-colors cursor-pointer"
              whileHover={{ x: 5, scale: 1.02 }}
            >
              15 Adeola Odeku Street, Victoria Island, Lagos
            </motion.p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold text-white mb-3"
              whileHover={{ color: "#8e44ad" }}
            >
              Quick Links
            </motion.h3>
            <ul className="space-y-2">
              {["About Us", "Collections", "Contact", "Careers"].map((link, index) => (
                <motion.li
                  key={link}
                  variants={linkHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="cursor-pointer transition-colors relative"
                  style={{ originX: 0 }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {link}
                  </motion.span>
                  
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#8e44ad]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Notices */}
          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-lg font-semibold text-white mb-3"
              whileHover={{ color: "#8e44ad" }}
            >
              Legal Notices
            </motion.h3>
            <ul className="space-y-2">
              {["Accessibility", "Privacy Policy", "Legal Terms"].map((link, index) => (
                <motion.li
                  key={link}
                  variants={linkHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="cursor-pointer transition-colors relative"
                  style={{ originX: 0 }}
                >
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {link}
                  </motion.span>
                  
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#8e44ad]"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-10 border-t border-gray-700 pt-6 relative"
        >
          {/* Animated border line */}
          <motion.div
            className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-[#8e44ad] to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={isInView ? { width: "100%", x: 0 } : { width: 0, x: "-50%" }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          
          <motion.p 
            className="text-center text-gray-500 text-sm relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              © 2025 Élan. All rights reserved.
            </motion.span>
          </motion.p>
          
          {/* Floating social icons placeholder */}
          <motion.div
            className="flex justify-center space-x-4 mt-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                className="w-8 h-8 bg-gradient-to-r from-[#8e44ad]/20 to-[#a855f7]/20 rounded-full border border-[#8e44ad]/30 flex items-center justify-center cursor-pointer"
                whileHover={{ 
                  scale: 1.2,
                  backgroundColor: "#8e44ad",
                  boxShadow: "0 5px 15px rgba(142, 68, 173, 0.4)"
                }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  y: { duration: 2, repeat: Infinity, delay: item * 0.2 }
                }}
              >
                <motion.div
                  className="w-3 h-3 bg-[#8e44ad] rounded-full"
                  whileHover={{ backgroundColor: "white" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.footer>
  )
}

export default Footer