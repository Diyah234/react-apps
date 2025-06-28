import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import Data from '@/app/Data';

export const Mini = ({ clickBox, setClickBox, mode, selectedCountry }) => {
  const createCountryNameMap = (data) => {
    const countryNameMap = {};
    data.forEach(country => {
      countryNameMap[country.alpha3Code] = country.name;
    });
    return countryNameMap;
  };
  const countryNameMap = createCountryNameMap(Data);

  return (
    <div className={`overflow-hidden ${clickBox ? 'block bg-background-dark p-12 px-14 pb-52' : 'hidden'} ${mode ? "bg-background-light" : "bg-background-dark"}`}>
      <div 
        onClick={() => setClickBox(false)} 
        className={`hover:cursor-pointer flex flex-row items-center gap-x-1 ${mode ? "bg-inputlight text-gray-600" : "bg-inputdark text-white"} rounded-md p-1 px-5 w-28  shadow-md text-sm`}
      >
        <BsArrowLeft color={`${mode ? 'gray' : 'white'}`} />Back
      </div>
      {selectedCountry && (
        <div className='flex flex-row gap-20 pt-16'>
          <div className='w-5/12'><img src={selectedCountry.flags.png} className='w-full' /></div>
          <div className='mt-7'>
          <h3 className={`text-xl pb-4 font-bold ${mode ? 'text-black' : 'text-white'}`}>{selectedCountry.name}</h3>
          <div className='flex flex-row gap-20 text-sm'>
            <div>
              <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Native Name: </span><span className='text-gray-400'>{selectedCountry.nativeName}</span></p>
              <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Population: </span><span className='text-gray-400'>{Number(selectedCountry.population).toLocaleString()}</span></p>
              <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Region: </span><span className='text-gray-400'>{selectedCountry.region}</span></p>
              <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Sub Region: </span><span className='text-gray-400'>{selectedCountry.subregion}</span></p>
              <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Capital: </span><span className='text-gray-400'>{selectedCountry.capital}</span></p>
            </div>
            <div>
            <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Top Level Domain: </span><span className='text-gray-400'>{selectedCountry.topLevelDomain}</span></p>
            <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Currencies: </span><span className='text-gray-400'>{selectedCountry.currencies.map(currency => currency.name).join(", ")}</span></p>
            <p className='pb-1'><span className={`${mode ? "text-black" : "text-white"}`}>Languages: </span><span className='text-gray-400'>{selectedCountry.languages.map(language => language.name).join(", ")}</span></p>
            </div>
          </div>
          <p className='pb-1 flex flex-row gap-2 mt-8 text-sm'><span className={`${mode ? "text-black" : "text-white"}`}>Border Countries: </span>
          <span className='text-gray-400 grid grid-cols-4 gap-4 text-center'>
          {selectedCountry.borders && selectedCountry.borders.length > 0 ? (
  selectedCountry.borders.map((border, index) => (
    <div 
      key={index} 
      className={`p-1 rounded-md w-22 text-sm shadow-md ${mode ? "bg-inputlight border-1" : "bg-inputdark"} text-gray-400`}
    >
      {countryNameMap[border] || border}
    </div>
  ))
) : (
  <span className='text-gray-400'>None</span>
)}

          </span>
          </p>
          </div>
        </div>
      )}
    </div>
  );
};
