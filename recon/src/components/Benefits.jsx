import React from 'react';
import dashboard from '../assets/dashboard.png';
import benefit1 from '../assets/benefit1.png';
import benefit2 from '../assets/benefit2.png';
import benefit3 from '../assets/benefit3.png';
import benefit4 from '../assets/benefit4.png';

const Benefits = () => {
  return (
    <div>
      {/* Dashboard Image */}
      {/* For mobile, reduce width and adjust negative margin. 
          For larger screens, apply original desktop styles. */}
      <div className='w-[90%] mx-auto mt-[-80px] md:w-[70%] md:mt-[-130px]'>
        <img src={dashboard} alt="Dashboard" className="w-full h-auto" />
      </div>

      {/* Benefits Section */}
      {/* Adjust padding for mobile (p-8) and then for larger screens (p-20) */}
      <section className='p-8 mt-10 md:p-20 md:mt-20'>
        {/* Subtitle */}
        <p className='text-[#57479E] text-center text-sm md:text-base'>Key Benefits</p>
        {/* Heading */}
        {/* Adjust font size for mobile (text-xl) and then for larger screens (text-2xl) */}
        <h2 className='text-[#FAFAFA] font-semibold text-center text-xl pt-4 md:text-2xl'>How Recon Benefits Your Business</h2>

        {/* Benefits Grid */}
        {/* For mobile, use a single column (grid-cols-1) with reduced gap and max-width.
            For medium screens (md:), switch to two columns (grid-cols-2) and increase gap.
            Adjust max-w for different screen sizes. */}
        <div className='grid grid-cols-1 gap-8 mx-auto mt-10 max-w-sm sm:max-w-md md:grid-cols-2 md:gap-20 md:mt-20 md:max-w-3xl'>
          {/* Benefit Item 1 */}
          <div className='text-center md:text-left'> {/* Center text on mobile, left align on desktop */}
            <img className='w-[30px] mx-auto md:mx-0' src={benefit1} alt="Benefit 1" /> {/* Center image on mobile */}
            <h3 className='text-[#7878FF] pt-4 font-semibold text-lg md:text-xl'>Accurate Revenue Recognition</h3>
            <p className='text-[#F0F0F0] pt-2 text-sm max-w-xs mx-auto md:max-w-none md:w-full md:text-base'>
              Automate revenue recognition in compliance with accounting standards.
            </p>
          </div>

          {/* Benefit Item 2 */}
          <div className='text-center md:text-left'>
            <img className='w-[30px] mx-auto md:mx-0' src={benefit2} alt="Benefit 2" />
            <h3 className='text-[#7878FF] pt-4 font-semibold text-lg md:text-xl'>Eliminate Billing Errors</h3>
            <p className='text-[#F0F0F0] pt-2 text-sm max-w-xs mx-auto md:max-w-none md:w-full md:text-base'>
              Identify and resolve billing discrepancies quickly to maximize revenue.
            </p>
          </div>

          {/* Benefit Item 3 */}
          <div className='text-center md:text-left'>
            <img className='w-[30px] mx-auto md:mx-0' src={benefit3} alt="Benefit 3" />
            <h3 className='text-[#7878FF] pt-4 font-semibold text-lg md:text-xl'>Reduce Churn</h3>
            <p className='text-[#F0F0F0] pt-2 text-sm max-w-xs mx-auto md:max-w-none md:w-full md:text-base'>
              Proactively identify at-risk subscribers and take action to prevent cancellations.
            </p>
          </div>

          {/* Benefit Item 4 */}
          <div className='text-center md:text-left'>
            <img className='w-[30px] mx-auto md:mx-0' src={benefit4} alt="Benefit 4" />
            <h3 className='text-[#7878FF] pt-4 font-semibold text-lg md:text-xl'>Save Time and Resources</h3>
            <p className='text-[#F0F0F0] pt-2 text-sm max-w-xs mx-auto md:max-w-none md:w-full md:text-base'>
              Automate tedious reconciliation tasks and free up your finance team.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;