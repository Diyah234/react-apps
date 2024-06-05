import React, { useContext } from 'react';
import './Plans.scss';
import { Link } from 'react-router-dom';
import arcade from '../images/icon-arcade.svg';
import advanced from '../images/icon-advanced.svg';
import pro from '../images/icon-pro.svg';
import { Context } from '../global/Context';

function Plans() {
  const { selectedPlan, setSelectedPlan, billingPeriod, setBillingPeriod, plansDetails, setActiveStep } = useContext(Context);

  const changeStyles = () => {
    setBillingPeriod(!billingPeriod);
  };

  const handleSetActiveLink = (link) => {
    setSelectedPlan(link);
  };

  return (
    <section className='planselect'>
      <h1>Select your plan</h1>
      <p className='text'>You have the option of monthly or yearly billing.</p>
      <div className='flexBox'>
        {Object.keys(plansDetails).map((plan) => (
          <div key={plan} className={`box ${selectedPlan === plan ? 'active' : ''}`} onClick={() => handleSetActiveLink(plan)}>
            <img src={plan === 'Arcade' ? arcade : plan === 'Advanced' ? advanced : pro} alt={`${plan} icon`} />
            <h3>{plan}</h3>
            <p className='time'>{billingPeriod ? plansDetails[plan].price.yearly : plansDetails[plan].price.monthly}</p>
            {billingPeriod && <p className='free'>2 months free</p>}
          </div>
        ))}
      </div>
      <div className='flexText'>
        <div className='monthly'>Monthly</div>
        <div className='toggle'>
          <div className='indicator' style={{ left: billingPeriod ? '23px' : '2px' }} onClick={changeStyles}></div>
        </div>
        <div className='yearly'>Yearly</div>
      </div>
      <div className='flexUnder'>
        <Link to="/" className='back' onClick={() => setActiveStep('1')}>Go back</Link>
        <Link to="/add-ons" onClick={() => setActiveStep('3')}><button>Next Step</button></Link>
      </div>
    </section>
  );
}

export default Plans;
