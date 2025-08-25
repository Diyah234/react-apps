import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import assets (keeping your original imports)
import classic1 from "../assets/classic1.png";
import classic2 from "../assets/classic2.png";
import classic3 from "../assets/classic3.png";
import classic4 from "../assets/classic4.png";

import men1 from "../assets/men1.png";
import men2 from "../assets/men2.png";
import men3 from "../assets/men3.png";
import men4 from "../assets/men4.png";

const Classic = () => {
  const items = {
    women: [
      { img: classic1, desc: "Avantive Halter Neck And Off-The-Shoulder", price: "$149" },
      { img: classic2, desc: "Glamine Women Summer Sleeveless Backless Dress", price: "$199" },
      { img: classic3, desc: "Opulessa Women's Deep Draped Neck Backless Dress", price: "$179" },
      { img: classic4, desc: "Hauture Women's Solid Color Sexy Fashion Cowl Neck Blouse", price: "$129" },
    ],
    men: [
      { img: men1, desc: "Manfinity Homme Men's Vacation Casual Shirt", price: "$89" },
      { img: men2, desc: "AKNOTIC Party Men Knitted Cardigan Fall Sweater", price: "$159" },
      { img: men3, desc: "Manfinity Homme Men Short Sleeve T-Shirt", price: "$49" },
      { img: men4, desc: "Manfinity CasualCool Men's 2pcs T-Shirt Set", price: "$99" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("women");
  const [hoveredItem, setHoveredItem] = useState(null);

  // Enhanced stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      },
    },
  };

  // Floating animation for title
  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Magnetic button effect
  const magneticVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: false }}
      className="p-10 pt-22 text-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-[#D9A441]/20 to-transparent rounded-full blur-xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating title with letter animation */}
      <motion.div variants={floatingVariants} animate="animate">
        <motion.h2 
          className="text-4xl font-semibold pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
        >
          {"The Classics".split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                color: "#D9A441",
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              className="inline-block cursor-default"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h2>
      </motion.div>

      {/* Enhanced Toggle Buttons with morphing background */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        className="flex flex-row gap-6 justify-center pb-10 relative"
      >
        {/* Morphing background indicator */}
        <motion.div
          className="absolute top-0 h-full bg-gradient-to-r from-[#D9A441]/20 to-[#D9A441]/30 rounded-full"
          initial={false}
          animate={{
            x: selectedCategory === "women" ? 0 : 120,
            width: selectedCategory === "women" ? 80 : 60,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
        
        {["women", "men"].map((category) => (
          <motion.p
            key={category}
            onClick={() => setSelectedCategory(category)}
            variants={magneticVariants}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
            className={`cursor-pointer text-lg font-medium transition-all duration-300 relative z-10 px-4 py-2 ${
              selectedCategory === category
                ? "text-[#D9A441]"
                : "text-gray-500 hover:text-[#D9A441]"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
            {/* Underline animation */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#D9A441]"
              initial={{ width: 0 }}
              animate={{
                width: selectedCategory === category ? "100%" : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.p>
        ))}
      </motion.div>

      {/* Enhanced Grid with 3D effects */}
      <div className="relative w-full flex justify-center overflow-hidden perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              rotateY: -90,
              transition: { duration: 0.5 },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {items[selectedCategory].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative rounded-xl shadow-xl cursor-pointer overflow-hidden group bg-white"
                style={{ transformStyle: "preserve-3d" }}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  z: 50,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                  },
                }}
              >
                {/* Image with parallax effect */}
                <motion.div className="relative overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={selectedCategory}
                    className="w-full h-64 object-cover"
                    whileHover={{
                      scale: 1.1,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  />
                  
                  {/* Shimmer effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={hoveredItem === index ? { x: "100%" } : { x: "-100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ transform: "skewX(-20deg)" }}
                  />
                </motion.div>

                {/* Enhanced content overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
                           flex flex-col justify-end p-4 text-white"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.h3
                    className="font-medium text-sm mb-2"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    {item.desc}
                  </motion.h3>
                  
                  <motion.div
                    className="flex justify-between items-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-[#D9A441] font-bold text-lg">{item.price}</span>
                    <motion.button
                      className="bg-white text-black px-3 py-1 rounded-full text-xs font-medium"
                      whileHover={{ scale: 1.1, backgroundColor: "#D9A441", color: "white" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Add to Cart
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute top-3 right-3 bg-[#D9A441] text-white text-xs px-2 py-1 rounded-full"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                  whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.3 } }}
                >
                  New
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Animated call-to-action section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: false }}
        className="mt-12"
      >
        <motion.button
          className="bg-gradient-to-r from-[#D9A441] to-[#B8932E] text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(217, 164, 65, 0.4)",
            background: "linear-gradient(45deg, #D9A441, #B8932E, #D9A441)",
            backgroundSize: "200% 200%",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            backgroundPosition: {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          Explore Collection
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Classic;