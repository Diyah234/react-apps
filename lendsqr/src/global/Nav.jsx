import React from 'react';
import logo from '../images/logo.svg';
import profile from '../images/profile.png';
import { CiSearch } from "react-icons/ci";
// import { Link } from 'react-router-dom';
import { BsBell } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import './global.scss'

export const Nav = () => {
  return (
    <div className='nav'>
        
        <div className='grid1'>
            <div><img src={logo} /></div>
            <div className='inp'><div className='inputbox'><input type="text" placeholder='Search for anything' /></div><div className='search'><CiSearch color='white' /></div></div>
        </div>
        <div className='grid2'>
        <a href="">Docs</a>
            <BsBell size={'25px'} color='#213F7D'/>
            <div className='grid3'>
            <img src={profile} className='profile' />
            <p>Adedeji</p>
            <IoMdArrowDropdown color='#213F7D' className='arrow' />
            </div>
        </div>
    </div>
  )
}
