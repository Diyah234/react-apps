import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingBag } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { RiArrowDropRightLine } from "react-icons/ri";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    "Women's Fashion",
    "Men's Fashion",
    "Bags",
    "Jewelry & Timepieces",
    "Kids & Baby",
    "Home",
    "Haute Couture",
    "Élan World & Fashion Shows",
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`flex justify-between items-center p-4 fixed top-0 left-0 w-full z-20 px-6 md:px-20 ${
        scrolled
          ? "bg-[#121212]/70 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {/* Hamburger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMobileMenu}
        className="p-2 mr-4 z-30"
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? 45 : 0,
              y: mobileMenuOpen ? 6 : 0,
            }}
            className={`w-full h-0.5 origin-center transition-all duration-300 ${mobileMenuOpen? "bg-black": "bg-white" }`}
          />
          <motion.span
            animate={{
              opacity: mobileMenuOpen ? 0 : 1,
            }}
            className={`w-full h-0.5 transition-all duration-300 ${mobileMenuOpen? "bg-black": "bg-white" }`}
          />
          <motion.span
            animate={{
              rotate: mobileMenuOpen ? -45 : 0,
              y: mobileMenuOpen ? -6 : 0,
            }}
            className={`w-full h-0.5 origin-center transition-all duration-300 ${mobileMenuOpen? "bg-black": "bg-white" }`}
          />
        </div>
      </motion.button>

      {/* Brand */}
      <div className="font-bold underline text-[#FAF7F4] text-3xl">Élan</div>

      {/* Icons */}
      <div className="flex flex-row justify-between items-center gap-6 text-2xl text-[#FAF7F4]">
        <CiSearch />
        <IoMdHeartEmpty />
        <MdOutlineShoppingBag />
      </div>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-10"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-80 h-full bg-white shadow-xl z-20 flex flex-col justify-between"
            >
              {/* Menu List */}
              <div className="flex flex-col divide-y mt-12">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className="flex justify-between items-center px-6 py-4 text-gray-800 hover:bg-gray-50 transition"
                  >
                    {item}
                    <RiArrowDropRightLine className="text-2xl" />
                  </button>
                ))}
              </div>

              {/* Bottom Tabs */}
              <div className="grid grid-cols-2 border-t">
                <button className="py-4 font-medium bg-gray-100 text-gray-900">
                  Fashion & Accessories
                </button>
                <button className="py-4 font-medium text-gray-600 hover:bg-gray-50">
                  Fragrance & Beauty
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
