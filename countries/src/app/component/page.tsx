"use client";
import React, { useState } from 'react';
import { IoMoonSharp } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";

const Nav = ({ handlemode , mode }) => {
  
  return (
    <div className={`flex flex-row justify-between shadow-xl p-6 px-14 ${mode ? "bg-inputlight" : "bg-inputdark"}`}>
      <div className={` ${mode ? "text-black" : "text-white"} font-bold`}><h1>Where in the world?</h1></div>
      <div className='flex flex-row items-center'>
      {mode ? <IoMoonOutline />  :<IoMoonSharp color='white'/>}
        <p className={`pl-2 text-sm hover:cursor-pointer ${mode ? "text-black" : "text-white"}` }onClick={()=>handlemode()}>Dark Mode</p>
      </div>
    </div>
  )
}

export default Nav