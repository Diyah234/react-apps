import React from 'react'
import dashboard from '../assets/dashboard.png'
import spline from '../assets/spline.jpg'
import dashboard2 from '../assets/dashboard2.png'

const Features = () => {
    const features = [
        {
            title: 'Churn Management',
            text: 'Identify at-risk subscribers and automate retention workflows.'
        },
        {
            title: 'Reporting & Analytics',
            text: 'Insights into subscription metrics, like MRR, ARR and others.'
        },
        {
            title: 'Integration with Stripe',
            text: 'Integrations with Stripe to handle payments.'
        }
    ]
    return (
        // Relative positioning for the background and overlay
        // Adjust mt and mb for mobile, and then for larger screens
        <div className='relative mt-20 mb-10 bg-cover bg-center bg-no-repeat sm:mt-40 sm:mb-20' style={{ backgroundImage: `url(${spline})` }}>
            {/* Dark overlay to dim the background */}
            {/* z-0 and z-10 for content ensures overlay is behind content */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Content layer */}
            {/* Adjust pb for mobile */}
            <div className="relative z-10 py-10 px-4 sm:pb-20 sm:px-6 md:px-8 lg:px-0"> {/* Added horizontal padding */}
                {/* Subtitle */}
                <p className='text-[#57479E] text-sm text-center sm:text-base'>Features Overview</p>
                {/* Heading */}
                {/* Adjust text size for mobile (text-xl) and increase for larger screens (text-2xl) */}
                <h2 className='text-[#FAFAFA] text-xl text-center font-semibold pt-4 max-w-lg mx-auto sm:text-2xl sm:pt-6'>Powerful Features for Subscription Management</h2>

                {/* Top two feature cards (Automated Reconciliation & Revenue Recognition) */}
                {/* For mobile: single column, smaller gap, adjusted max-width, reduced mt */}
                {/* For larger screens: two columns, wider gap, larger max-width, original mt */}
                <div className='grid grid-cols-1 gap-6 mx-auto mt-10 max-w-md sm:max-w-xl md:grid-cols-2 md:gap-8 lg:gap-10 md:mt-20 lg:max-w-5xl'>
                    {/* Automated Reconciliation Card */}
                    {/* Adjusted height to auto for flexibility */}
                    <div className='bg-white/10 rounded-xl p-6 shadow-md border border-white/10 h-auto flex flex-col'>
                        <h3 className='text-[#FAFAFF] font-semibold text-lg pb-2 sm:text-xl'>Automated Reconciliation</h3>
                        <p className='text-[#FAFAFF] text-sm w-full sm:w-10/12'>Seamlessly integrate with your billing and payment systems to automate reconciliation.</p>
                        <p className='text-[#57479E] font-semibold pt-4 text-sm sm:text-base'>Read more</p>
                        {/* Image: For mobile, center the image and adjust width. No ml-20. */}
                        {/* flex-grow-1 ensures content pushes image down if needed, mt-4 to separate from text */}
                        <img src={dashboard} alt="Automated Reconciliation Dashboard" className='w-full mt-6 mx-auto rounded-lg object-contain' />
                    </div>

                    {/* Revenue Recognition Card */}
                    <div className='bg-white/10 rounded-xl p-6 shadow-md border border-white/10 h-auto flex flex-col'>
                        <h3 className='text-[#FAFAFF] font-semibold text-lg pb-2 sm:text-xl'>Revenue Recognition</h3>
                        <p className='text-[#FAFAFF] text-sm w-full sm:w-10/12'>Seamlessly integrate with your billing and payment systems to automate reconciliation.</p>
                        <p className='text-[#57479E] font-semibold pt-4 text-sm sm:text-base'>Read more</p>
                        <img src={dashboard} alt="Revenue Recognition Dashboard" className='w-full mt-6 mx-auto rounded-lg object-contain' />
                    </div>
                </div>

                {/* Bottom three feature cards (Churn, Reporting, Integration) */}
                {/* For mobile: single column, smaller gap, adjusted max-width, reduced mt */}
                {/* For larger screens: three columns, wider gap, larger max-width, original mt */}
                <div className='grid grid-cols-1 mx-auto gap-6 mt-8 max-w-md sm:max-w-xl md:grid-cols-3 md:gap-8 lg:gap-10 md:mt-10 lg:max-w-5xl'>
                    {
                        features.map((feature, index) => (
                            <div key={index} className='bg-white/10 rounded-xl p-6 shadow-md border border-white/10 w-full'> {/* w-full ensures it fills grid column */}
                                <h3 className='text-[#FAFAFF] font-semibold pb-2 text-base sm:text-lg'>{feature.title}</h3>
                                <p className='text-[#FAFAFF] text-sm sm:text-base'>{feature.text}</p>
                                <img src={dashboard2} alt={`${feature.title} Dashboard`} className='w-full mt-6 rounded-ee-lg rounded-ss-lg object-cover' />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Features