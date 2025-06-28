import React from 'react'
import logo from '../../assets/logo.jpg'
import navbg from '../../assets/nav.png'

const Navbar = () => {
  return (
    // For mobile, reduce padding and adjust flex behavior
    <div className='flex justify-between items-center p-4 px-4 sm:px-6 md:px-20'>
      {/* Logo */}
      <div className='w-1/4 sm:w-[10%]'> {/* Adjust logo width for mobile */}
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </div>

      {/* Navigation Links - Hidden on mobile, shown on medium screens and up */}
      <div className='hidden md:flex flex-row text-white list-none gap-10 p-4 px-10 rounded-4xl bg-[#202020]' style={{ backgroundImage: `url(${navbg})` }}>
        <li>Features</li>
        <li>Pricing</li>
        <li>Resources</li>
        <li>Contact</li>
      </div>

      {/* Buttons */}
      <div className='flex items-center'>
        {/* Login Button - Hidden on mobile, shown on medium screens and up */}
        <button className='text-white hidden md:block'>Login</button>
        {/* Get Started Button - Always visible, adjust margin for mobile */}
        <button className='text-black bg-white p-2 px-3 ml-4 font-semibold rounded-lg md:ml-10'>
          Get Started
        </button>
        {/* Placeholder for Hamburger Menu (if you want to implement one) */}
        <div className="md:hidden ml-4">
          {/* You would typically put a hamburger icon here */}
          {/* For example: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> */}
        </div>
      </div>
    </div>
  )
}

export default Navbar