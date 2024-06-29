import React from 'react';
import './user.scss';
import icon1 from '../images/icon1.png'
import icon2 from '../images/icon2.png'
import icon3 from '../images/icon3.png'
import icon4 from '../images/icon4.png'
import { Table } from './Table';

function User({details, setDetails, setSelected, selected, formatPhoneNumber}) {
  return (
    <div className='user'>
      <h1>Users</h1>
      <div className='usergrid'>
        <div className='box'>
          <img src={icon1} />
          <h4>USERS</h4>
          <p>2,453</p>
        </div>
        <div className='box'>
          <img src={icon2} />
          <h4>ACTIVE USERS</h4>
          <p>2,453</p>
        </div>
        <div className='box'>
          <img src={icon3}/>
          <h4>USERS WITH LOANS</h4>
          <p>12,453</p>
        </div>
        <div className='box'>
          <img src={icon4}/>
          <h4>USERS WITH SAVINGS</h4>
          <p>102,453</p>
        </div>
      </div>
      <Table setDetails={setDetails} selected={selected} setSelected={setSelected} formatPhoneNumber={formatPhoneNumber}/>
    </div>
  )
}

export default User