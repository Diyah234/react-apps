import React, { useState, useEffect } from "react";
import heroVideo from "../assets/heroVideo.mp4";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Elegant", "Timeless", "Luxe"];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        loop
        autoPlay
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay for Luxe feel */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

      <Navbar />

      {/* Hero Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-white drop-shadow-2xl leading-snug">
          Timeless fashion, <br /> boundless expression
        </h1>

        {/* Animated Words */}
        <div className="relative mt-8 h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={index}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute text-2xl md:text-3xl font-semibold tracking-wider 
                         bg-gradient-to-r from-[#D4A5A5] via-[#EBD7D7] to-[#C17878] 
                         bg-clip-text text-transparent drop-shadow-lg"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Hero;
