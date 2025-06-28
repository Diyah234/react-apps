import React from 'react';
import Image from 'next/image';

export const Box = ({ mode, filters, clickBox, setClickBox, selectedCountry, setSelectedCountry }) => {
  function showbox(data) {
    
    if (!clickBox || selectedCountry !== data) {
        setClickBox(true);
        setSelectedCountry(data);
      } else {
        setClickBox(false);
        setSelectedCountry(null);
      }
    
  }

  return (
    <div className='grid grid-cols-4 gap-14 mt-10 hover:cursor-pointer'>
      {filters.map((data, index) => (
        <div 
          key={index} 
          className={`bg-inputdark rounded-md shadow-lg ${mode ? "bg-inputlight" : "bg-inputdark"}`} 
          onClick={() => showbox(data)}
        >
          <Image src={data.flags.png} className='rounded-t-md' alt='' width={300} height={160} />
          <div className='p-4'>
            <h3 className={`font-bold pb-2 ${mode ? "text-black" : "text-white"}`}>{data.name}</h3>
            <p className='text-sm pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Population:</span> <span className='text-gray-400'>{Number(data.population).toLocaleString()}</span></p>
            <p className='text-sm pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Region:</span> <span className='text-gray-400'>{data.region}</span></p>
            <p className='text-sm pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Capital:</span> <span className='text-gray-400'>{data.capital}</span></p>
          </div>
        </div>
      ))}
    </div>
  );
}
