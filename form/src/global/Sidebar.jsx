import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import desktopImage from '../images/sidebar-desktop.svg';
import mobileImage from '../images/sidebar-mobile.svg';
import { Context } from './Context';

function Sidebar() {
  const { activeStep, setActiveStep } = useContext(Context);
  const mobile = window.matchMedia('(max-width: 475px)');
  const backgroundImage = mobile.matches ? mobileImage : desktopImage;

  return (
    <section style={{ backgroundImage: `url(${backgroundImage})` }} className='sideBar'>
      <div className='sideFlex'>
        <div className={`${activeStep === '1' ? "activelink" : "number"}`}>1</div>
        <div className='sideText'>
          <p className='step'>STEP 1</p>
          <Link to="/" className='link' onClick={() => setActiveStep('1')}><h4>YOUR INFO</h4></Link>
        </div>
      </div>
      <div className='sideFlex'>
        <div className={`${activeStep === '2' ? "activelink" : "number"}`}>2</div>
        <div className='sideText'>
          <p className='step'>STEP 2</p>
          <Link to="/plans" className='link' onClick={() => setActiveStep('2')}><h4>SELECT PLAN</h4></Link>
        </div>
      </div>
      <div className='sideFlex'>
        <div className={`${activeStep === '3' ? "activelink" : "number"}`}>3</div>
        <div className='sideText'>
          <p className='step'>STEP 3</p>
          <Link to="/add-ons" className='link' onClick={() => setActiveStep('3')}><h4>ADD-ONS</h4></Link>
        </div>
      </div>
      <div className='sideFlex'>
        <div className={`${activeStep === '4' ? "activelink" : "number"}`}>4</div>
        <div className='sideText'>
          <p className='step'>STEP 4</p>
          <Link to="/summary" className='link' onClick={() => setActiveStep('4')}><h4>SUMMARY</h4></Link>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
