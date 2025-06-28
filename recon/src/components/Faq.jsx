import React from 'react';
import stars from '../assets/stars.png';

const Faq = () => {
    const faq = [
        { title: 'Who is Recon for?' },
        { title: 'What billing and payment platforms do you integrate with?' },
        { title: 'How do the integrations work?' },
        { title: 'Do you offer a free trial?' },
        { title: 'Where is the data stored?' }
    ];

    return (
        // Adjust padding for mobile and ensure background covers
        <div className='relative mt-16 pt-10 pb-10 bg-cover bg-center bg-no-repeat sm:mt-20 sm:pt-20 sm:pb-20' style={{ backgroundImage: `url(${stars})` }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Content layer */}
            <div className='relative z-10 px-4 sm:px-6 md:px-8 lg:px-0'> {/* Add horizontal padding */}
                {/* Subtitle */}
                <p className='text-[#57479E] text-sm text-center sm:text-base'>FAQs</p>
                {/* Heading */}
                {/* Adjust text size for mobile and use max-w for readability */}
                <h2 className='text-[#FAFAFA] text-xl text-center font-semibold pt-4 max-w-sm mx-auto sm:text-2xl sm:pt-6'>
                    Frequently Asked Questions
                </h2>

                {/* FAQ Items Container */}
                {/* Adjust gap and max-width for mobile, center items */}
                <div className='flex flex-col gap-4 mt-8 mx-auto max-w-lg sm:gap-6 sm:mt-10 md:max-w-3xl lg:max-w-4xl'>
                    {faq.map((item, index) => (
                        <div
                            key={index}
                            // Adjust padding for mobile, make it full width within its max-w container
                            className='flex flex-row items-center justify-between bg-[#151515] p-3 px-5 w-full rounded-lg
                                       sm:p-4 sm:px-7'
                        >
                            <p className='text-[#FAFAFA] font-semibold text-sm sm:text-base'>{item.title}</p>
                            <p className='text-[#FAFAFA] text-3xl sm:text-4xl'>+</p> {/* Adjust size for responsiveness */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Faq;