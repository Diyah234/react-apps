import React , { useState, useContext }from 'react';
import { Context } from '../global/Context';
import './AddOns.scss';
import { Link } from 'react-router-dom';

function AddOns() {

  const { activeLink, setActiveLink, addOnsDetails, setActiveStep, activeStep } = useContext(Context);
  const handleSetActiveLink = (link) => {
    setActiveLink(activeLink.includes(link) ? activeLink.filter(item => item !== link) : [...activeLink, link]); // Update active link state when a link is clicked
  };

  const [noChecked, setNoChecked] = useState(false)
  const emptyChecked = () =>{
    if (activeLink.length === 0) {
      setNoChecked(true)
      console.log('hey')
    
      
    }
  
  
  }
  const handleNextStep = () => {
    emptyChecked();
    if (activeLink.length> 0) {
      setActiveStep('4');
    }
    
  };

  return (
    <section className='addons'>
      <h1>Pick add-ons</h1>
      <p className='text'>Add-ons help enhance your gaming experience.</p>
      {noChecked && <p className='message'>Please select add-ons.</p>}
      <div className='addflex'>
      {Object.keys(addOnsDetails).map((key) => (
          <div key={key} className={`addbox ${activeLink.includes(key) ? 'active' : ''}`} onClick={() => handleSetActiveLink(key)}>
            <div className='flexcheck'>
              <input type='checkbox' checked={activeLink.includes(key)} onChange={() => handleSetActiveLink(key)} />
              <span className='custom-checkbox'></span>
              <div>
                <h4>{addOnsDetails[key].title}</h4>
              </div>
            </div>
            <div className='price'>{addOnsDetails[key].price}</div>
          </div>
        ))}
      </div>
      <div className='flexUnder'>
        <Link to="/plans" className='back' onClick={()=> setActiveStep('2')}>Go back</Link>
        <Link to={activeLink.length > 0 ? '/summary' : ''} onClick={handleNextStep}><button>Next Step</button></Link>
      </div>
    </section>
  )
}

export default AddOns