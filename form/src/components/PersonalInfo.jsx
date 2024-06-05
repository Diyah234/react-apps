import React ,{useContext}from 'react'
import './PersonalInfo.scss';
import { Link } from 'react-router-dom';
import { Context } from '../global/Context';

function PersonalInfo() {
  const { activeStep, setActiveStep } = useContext(Context);
  return (
    <section className='personalinfo'>
    <h1>Personal info</h1>
    <p className='text'>Please provide your name, email address, and phone number</p>
    <form>
      <label>Name <br/> <input type='text' placeholder='e.g. Stephen King'/></label>
      <label>Email Address <br/> <input type='email' placeholder='e.g. stephenking@lorem.com'/></label>
      <label>Phone Number <br/> <input type='text' placeholder='e.g. 1 234 567 890'/></label>
      <div className='nextdiv'><Link to="/plans" onClick={() => setActiveStep('2')} ><button>Next Step</button></Link></div>
    </form>
  
    </section>
    
  )
}

export default PersonalInfo