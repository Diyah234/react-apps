import React from 'react'
import group1 from '../assets/group1.png';
import group2 from '../assets/group2.png';
import group3 from '../assets/group3.png';
import group4 from '../assets/group4.png';
import group5 from '../assets/group5.png';
import group6 from '../assets/group6.png';
import group7 from '../assets/group7.png';
import group8 from '../assets/group1.png'; // Note: This uses group1 again, consider if it's intentional
import earth from '../assets/earth.png'

const Companies = () => {
    const lists = [
        {
            title: '3Portals',
            img: group1
        },
        {
            title: '45 Degrees',
            img: group2
        },
        {
            title: 'Acme Corp',
            img: group3
        },
        {
            title: 'Alt+Shift',
            img: group4
        },
        {
            title: 'BuildingBlocks',
            img: group5
        },
        {
            title: 'Boltshift',
            img: group6
        },
        {
            title: 'Clandestine',
            img: group7
        },
        {
            title: 'Command+R',
            img: group8
        }
    ]
    return (
        // Adjust top margin and padding for mobile.
        // Earth image works well with bg-cover bg-center.
        <div className='relative mt-20 pb-10 bg-cover bg-center bg-no-repeat sm:mt-36 sm:pb-20' style={{ backgroundImage: `url(${earth})` }}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            {/* Content layer */}
            {/* Add horizontal padding for mobile content */}
            <div className='relative z-10 px-4 py-8 sm:px-6 md:px-8'>
                {/* Subtitle */}
                <p className='text-[#57479E] text-sm text-center sm:text-base'>Companies</p>
                {/* Heading */}
                {/* Adjust text size for mobile (text-xl) and increase for larger screens.
                    Add max-w for better readability on small screens. */}
                <h2 className='text-[#FAFAFA] text-xl text-center font-semibold pt-4 max-w-lg mx-auto sm:text-2xl sm:pt-6'>Trusted Globally by Growing Businesses</h2>

                {/* Companies Grid */}
                {/* For mobile: grid-cols-1 or grid-cols-2 is more appropriate.
                    Adjust gap, top margin, and max-width.
                    For larger screens: scale up to more columns. */}
                <div className='grid grid-cols-1 gap-8 mx-auto mt-10 max-w-sm
                                sm:grid-cols-2 sm:gap-12 sm:mt-16 sm:max-w-xl
                                md:grid-cols-3 md:gap-20 md:mt-20 md:max-w-3xl
                                lg:grid-cols-4 lg:gap-40 lg:mt-30 lg:max-w-5xl'>
                    {lists.map((list, index) => (
                        <div key={index} className='flex flex-row items-center justify-center sm:justify-start gap-3'> {/* Center on mobile, then align to start on sm+ */}
                            {/* Adjust image width for mobile, ensure it's responsive */}
                            <img src={list.img} alt={list.title} className='w-[20%] max-w-[40px] h-auto' /> {/* Adjust size */}
                            <p className='text-[#FAFAFA] text-sm sm:text-base'>{list.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Companies;