import React, { useRef, useState } from 'react';
import logo from '../images/logo.svg';
import signpic from '../images/signpic.png';
import { useFormik } from 'formik';
import './login.scss';

function Login({setDashboard}) {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        onSubmit: values => {
          console.log(JSON.stringify(values, null, 2));
          setDashboard(true)
        },
      });
      const inputRef = useRef()
      const handlePassword =()=>{
        var x = inputRef.current
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      }
  return (
    <div className='login'>
        <div className='loginpic'>
            <div className='logo'><img src={logo} /></div>
            <div><img src={signpic} /></div>
        </div>
        <div className='loginInputs'>
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>
            <form onSubmit={formik.handleSubmit}>
               <div className='inputbox'><input type='email'  id="email"
         name="email" placeholder='Email' onChange={formik.handleChange}
         value={formik.values.email} required/></div>
                <div className='inputbox'><input type='password' id="password"
         name="password" placeholder='password' onChange={formik.handleChange}
         value={formik.values.password} ref={inputRef} required/><span onClick={handlePassword}>SHOW</span></div>
         <p className='forgot'>FORGOT PASSWORD?</p>
         <button type='submit'>LOG IN</button>
         </form>
        </div>
    </div>
  )
}

export default Login