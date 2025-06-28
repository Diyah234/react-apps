import React from 'react'

const Pricebox = () => {
    const box =[
        {
            h3: 'Starter',
            p1: 'Perfect for businesses just getting started with subscriptions.',
            price: '$99',
            list: [
                'Up to 500 subscriptions',
                'Automated Reconciliation',
                 'Basic Reporting' ,
                 'Email Support',

            ]
        },
        {
            h3: 'Growth',
            p1: 'Ideal for growing businesses with a moderate subscription volume.',
            price: '$299',
            list: [
                'Up to 2,500 subscriptions',
                'Automated Reconciliation ',
                'Advanced Reporting & Analytics', 
                'Churn Management Tools ',
                'API Access' ,
                'Priority Email Support'

            ]
        },
        {
            h3: 'Enterprise',
            p1: 'Designed for large businesses with high subscription volumes and complex needs.',
            price: '$599',
            listhead: 'Includes everything in Growth',
            list: [
                 'Unlimited Subscriptions', 
                 'Dedicated Account Manager',
                  'Custom Integrations',
                   '4/7 Priority Support'

            ]
        }
    ]
  return (
    <div className='grid grid-row-3 lg:grid-cols-3 gap-8 mx-auto mt-20 lg:max-w-6xl   '>
        {box.map((text,index)=> (
        <div key={index} className='p-8 px-10 bg-[#151515] rounded-xl w-10/12 mx-auto lg:w-[100%]'>
        <h3 className='text-white font-semibold text-lg pb-3'>{text.h3}</h3>
        <p className='text-[#D0D0D0] text-sm/6 pb-3'>{text.p1}</p>
        <h1 className='text-white font-bold text-4xl pb-3'>{text.price}</h1>
        <p className='text-white text-sm pb-5'>per month</p>
        <button className='text-white bg-[#57479E] p-3 mt-3 px-10 w-[100%] rounded-lg'>Choose Plan</button>
        <p className='text-white font-semibold text-sm mt-10'>{text.listhead}</p>
        {text.list.map((value, index)=>(
            <ul className='mt-4' key={index}>
                <li className='text-white list-disc text-sm'>{value}</li>
            </ul>
        ))}
        </div>
))}

    </div>
  )
}

export default Pricebox