import React from 'react'
import Pricebox from './views/Pricebox'

const Pricing = () => {
  return (
    <div className='pt-20 pb-10 sm:pt-32 sm:pb-20'>
      {/* Subtitle */}
      <p className='text-[#57479E] text-sm text-center sm:text-base'>Pricing</p>
      {/* Heading */}
      {/* Adjust text size for mobile (text-xl) and increase for larger screens (text-2xl)
          Add max-w for better readability on small screens. */}
      <h2 className='text-[#FAFAFA] text-xl text-center font-semibold pt-4 max-w-sm mx-auto sm:text-2xl sm:pt-6'>
        Choose the Plan That Fits Your Needs
      </h2>
      {/* Description Paragraph */}
      {/* Adjust text size, width for mobile */}
      <p className='text-[#FAFAFA] text-sm text-center pt-4 w-10/12 mx-auto max-w-md sm:text-lg sm:pt-6 sm:max-w-xl'>
        We offer flexible pricing plans to meet the needs of businesses of all sizes.
      </p>
        <Pricebox />
    </div>
  )
}

export default Pricing