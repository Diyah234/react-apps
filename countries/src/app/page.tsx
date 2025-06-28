"use client"
import Nav from './component/page'
import Data from './Data';
import { Box } from './component/box/page';
import { Mini } from './component/smallbox/page';
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { use, useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState(false);
  const [showbox, setShowbox] = useState(false);
  const [filters, setFilter] = useState(Data);
  const [searchItem, setSearchItem] = useState('');
  const [clickBox, setClickBox] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState([]);

  function handleMode() {
    setMode(!mode);
  }

  const filterbox = () => {
    setShowbox(!showbox);
  }

  function handleFilter(region) {
    const filteredData = Data.filter(item => item.region === region);
    setFilter(filteredData);
    setShowbox(false);
  }

  const handleSearch = (e) => {
    const searchData = e.target.value;
    setSearchItem(searchData);

    const filteredItems = Data.filter((data) =>
      data.name.toLowerCase().includes(searchData.toLowerCase())
    );
    setFilter(filteredItems);
  }

  return (
    <main>
      <Nav handlemode={handleMode} mode={mode} />
      {clickBox ? (
        <Mini 
          clickBox={clickBox} 
          setClickBox={setClickBox} 
          mode={mode} 
          selectedCountry={selectedCountry} 
        />
      ) : (
        <div className={`p-10 px-14 ${mode ? "bg-background-light" : "bg-background-dark"}`}>
          <div className='flex flex-row justify-between'>
            <div className={`flex flex-row p-2 w-80 pl-4 rounded-md items-center ${mode ? "bg-inputlight" : "bg-inputdark"}`}>
              <IoIosSearch color={`${mode ? "gray" : "white"}`} size={"18px"} />
              <input 
                type="text" 
                name="search" 
                placeholder='Search for a country...' 
                onChange={handleSearch} 
                className={`ml-1 px-2 placeholder:text-sm bg-inherit border-none outline-none ${mode ? "text-black" : "text-white"}`} 
              />
            </div>
            <div 
              className={`flex flex-row justify-between items-center text-sm p-2 px-3 rounded-sm w-44 hover:cursor-pointer ${mode ? "bg-inputlight text-black" : "bg-inputdark text-slate-300"}`} 
              onClick={filterbox}
            >
              Filter by Region <IoIosArrowDown color={`${mode ? "gray" : "white"}`} />
            </div>
          </div>
          <div className={`${showbox ? "block" : "hidden"}`}>
            <div className={`absolute top-40 p-4 w-44 right-14 rounded-sm text-sm ${mode ? "bg-white" : "bg-inputdark text-white"}`}>
              <p className='pb-2 hover:cursor-pointer' onClick={() => handleFilter("Africa")}>Africa</p>
              <p className='pb-2 hover:cursor-pointer' onClick={() => handleFilter("Americas")}>America</p>
              <p className='pb-2 hover:cursor-pointer' onClick={() => handleFilter("Asia")}>Asia</p>
              <p className='pb-2 hover:cursor-pointer' onClick={() => handleFilter("Europe")}>Europe</p>
              <p className='pb-2 hover:cursor-pointer' onClick={() => handleFilter("Oceania")}>Oceania</p>
            </div>
          </div>
          <Box 
            mode={mode} 
            filters={filters} 
            clickBox={clickBox} 
            setClickBox={setClickBox} 
            setSelectedCountry={setSelectedCountry} 
            selectedCountry={selectedCountry} 
          />
        </div>
      )}
    </main>
  );
}
