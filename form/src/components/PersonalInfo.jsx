import React ,{useContext, useState, useEffect}from 'react'
import './PersonalInfo.scss';
import { Link } from 'react-router-dom';
import { Context } from '../global/Context';

function PersonalInfo() {
  const { activeStep, setActiveStep } = useContext(Context);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Load saved data from sessionStorage when the component mounts
  useEffect(() => {
    const savedName = sessionStorage.getItem('name');
    const savedEmail = sessionStorage.getItem('email');
    const savedPhone = sessionStorage.getItem('phone');

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  // Save data to sessionStorage whenever input values change
  useEffect(() => {
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('phone', phone);
  }, [name, email, phone]);

  return (
    <section className='personalinfo'>
    <h1>Personal info</h1>
    <p className='text'>Please provide your name, email address, and phone number</p>
    <form>
      <label>Name <br/> <input type='text' placeholder='e.g. Stephen King' value={name}
            onChange={(e) => setName(e.target.value)}/></label>
      <label>Email Address <br/> <input type='email' placeholder='e.g. stephenking@lorem.com' value={email}
            onChange={(e) => setEmail(e.target.value)}/></label>
      <label>Phone Number <br/> <input type='text' placeholder='e.g. 1 234 567 890' value={phone}
            onChange={(e) => setPhone(e.target.value)}/></label>
      <div className='nextdiv'><Link to="/plans" onClick={() => setActiveStep('2')} ><button>Next Step</button></Link></div>
    </form>
  
    </section>
    
  )
}

export default PersonalInfo