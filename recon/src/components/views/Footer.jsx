import React from 'react'
import logo from '../../assets/logo.jpg'

const Footer = () => {
  return (
    // Adjust top padding for mobile, keep desktop pt-40
    <div className='pt-16 md:pt-40'>
      {/* Footer Grid Container */}
      {/* Mobile: grid-cols-2 with more padding and smaller max-w.
          For sm screens (tablets), adjust grid-cols-3 or 4.
          Desktop (md): Revert to grid-cols-5 and original max-w, gap. */}
      <div className='
        grid grid-cols-2 gap-y-10 gap-x-6 text-[#FAFAFA] text-base mx-4 max-w-lg
        sm:grid-cols-3 sm:gap-y-10 sm:gap-x-10 sm:max-w-xl
        md:grid-cols-5 md:gap-4 md:max-w-5xl md:mx-auto
      '>
        {/* Logo Column */}
        {/* On mobile, span 2 columns to give logo more space and center it. */}
        {/* On desktop (md), revert to auto-width within grid and align left. */}
        <div className='col-span-2 flex justify-center items-center md:col-span-1 md:block'>
          <img src={logo} alt="Company Logo" className='w-1/2 max-w-[120px] md:w-[60%]'/> {/* Adjust logo size for mobile */}
        </div>

        {/* Product Column */}
        <div className='flex flex-col gap-3 md:gap-5'> {/* Reduce gap for mobile */}
          <h3 className='text-sm font-semibold md:text-base'>Product</h3> {/* Adjust font size for mobile */}
          <p className='text-xs md:text-sm'>Features</p> {/* Adjust font size for mobile */}
          <p className='text-xs md:text-sm'>Plan</p>
          <p className='text-xs md:text-sm'>Build</p>
          <p className='text-xs md:text-sm'>Insights</p>
        </div>

        {/* Company Column */}
        <div className='flex flex-col gap-3 md:gap-5'> {/* Reduce gap for mobile */}
          <h3 className='text-sm font-semibold md:text-base'>Company</h3> {/* Adjust font size for mobile */}
          <p className='text-xs md:text-sm'>About</p>
          <p className='text-xs md:text-sm'>Customers</p>
          <p className='text-xs md:text-sm'>Careers</p>
          <p className='text-xs md:text-sm'>Blog</p>
          <p className='text-xs md:text-sm'>Brand</p>
        </div>

        {/* Legal & Connect Column */}
        <div className='flex flex-col gap-3 md:gap-5'> {/* Reduce gap for mobile */}
          <h3 className='text-sm font-semibold md:text-base'>Legal & Connect</h3> {/* Adjust font size for mobile */}
          <p className='text-xs md:text-sm'>Security</p>
          <p className='text-xs md:text-sm'>Report Issue</p>
          <p className='text-xs md:text-sm'>Privacy</p>
          <p className='text-xs md:text-sm'>Terms</p>
          <p className='text-xs md:text-sm'>Contact Us</p>
        </div>

        {/* Community Column */}
        <div className='flex flex-col gap-3 md:gap-5'> {/* Reduce gap for mobile */}
          <h3 className='text-sm font-semibold md:text-base'>Community</h3> {/* Adjust font size for mobile */}
          <p className='text-xs md:text-sm'>X(Twitter)</p>
          <p className='text-xs md:text-sm'>Github</p>
          <p className='text-xs md:text-sm'>Youtube</p>
        </div>
      </div>

      {/* Copyright Text */}
      {/* Adjust mt and pb for mobile */}
      <p className='text-[#FAFAFA] text-xs text-center mt-10 pb-6 md:text-sm md:mt-20 md:pb-10'>
        2025. Recon. All rights reserved.
      </p>
    </div>
  )
}

export default Footer