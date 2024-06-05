import React, { useContext } from 'react';
import './Summary.scss';
import { Link } from 'react-router-dom';
import { Context } from '../global/Context';

function Summary() {
  const { activeLink,activeStep, setActiveStep, addOnsDetails, selectedPlan, billingPeriod, plansDetails, setBillingPeriod } = useContext(Context);

  const total = activeLink.reduce((sum, key) => sum + (!billingPeriod ? parseInt(addOnsDetails[key].priceMonthly.slice(2)) : parseInt(addOnsDetails[key].price.slice(2))), !billingPeriod ? parseInt(plansDetails[selectedPlan].price.monthly.slice(1)) : parseInt(plansDetails[selectedPlan].price.yearly.slice(1)));

  return (
    <section className='summary'>
      <h1>Finishing up</h1>
      <p className='text'>Double-check everything looks OK before confirming</p>
      <div className='summarybox'>
        <div className='plan'>
          <div>
            <h3>{selectedPlan} ({!billingPeriod ? "Monthly" : "Yearly"})</h3>
            <Link to="" className='change' onClick={() => setBillingPeriod(!billingPeriod)}>Change</Link>
          </div>
          <div className='planprice'>{!billingPeriod ? plansDetails[selectedPlan].price.monthly : plansDetails[selectedPlan].price.yearly}</div>
        </div>
        <div className='addons'>
          {activeLink.map((key) => (
            <div key={key} className='plans'>
              <div className='addonstext'>{addOnsDetails[key].title}</div>
              <div className='addprice'>{!billingPeriod ? addOnsDetails[key].priceMonthly : addOnsDetails[key].price}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='total'>
        <p className='per'>Total (per {!billingPeriod ? "month" : "year"})</p>
        <h3>+${total}{!billingPeriod ? "/mo" : "/yr"}</h3>
      </div>
      <div className='flexUnder'>
        <Link to="/add-ons" className='back' onClick={()=> setActiveStep('3')}>Go back</Link>
        <Link to='/thanks' onClick={()=> setActiveStep('4')}><button>Confirm</button></Link>
      </div>
    </section>
  );
}

export default Summary;
