import React, {useState} from 'react';
import { Nav } from './Nav';
import { Sidebar } from './Sidebar';
import User from '../components/User';
import { Details } from '../components/Details';

function Dashboard({setDashboard, dashboard}) {

  const [details, setDetails] = useState(false)
  const [selected, setSelected] = useState(null)
  const formatPhoneNumber = (phoneNumber) => {
    return '080' + phoneNumber.replace(/-/g, '');
  };
  return (
    
    <div className={dashboard ? "dashboard" : null}>
        <div><Nav /></div>
        <div className='flex'>
            <Sidebar/>
            {details ? <Details details={details} setDetails={setDetails} selected={selected} formatPhoneNumber={formatPhoneNumber}/> : <User details={details} setDetails={setDetails} selected={selected} setSelected={setSelected} formatPhoneNumber={formatPhoneNumber}/> }
            
        </div>
    </div>
  )
}

export default Dashboard