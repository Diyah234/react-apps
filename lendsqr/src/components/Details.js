import React from 'react';
import { BsArrowLeft } from "react-icons/bs";
import ReactStars from 'react-stars'
import './details.scss';
import avatar from '../images/avatar.png'

export const Details = ({ details, setDetails, selected, formatPhoneNumber }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating)
  }
  return (
    <div className={details ? "details" : null}>
      <div className='back'><div><BsArrowLeft size={'30px'} color='#545F7D' /></div><div className='text' onClick={() => setDetails(false)}>Back to Users</div></div>
      <div className='textFlex'>
        <div><h1>User Details</h1></div>
        <div>
          <button className='blacklist'>BLACKLIST USER</button>
          <button className='active'>ACTIVE USER</button>
        </div>
      </div>

      <div className='section1'>
        <div className='boxGrid'>
          <div className='boxflex'>
            <div className='avatar'><img src={avatar} /></div>
            <div><h4>{selected?.username}</h4><p>LSQFf587g90</p></div>
          </div>
          <div className='border'><p>User’s Tier</p> <ReactStars
            count={3}
            onChange={ratingChanged}
            size={24}
            color2={'#ffd700'} /></div>
          <div className='accountdetails'>
          <p className='price'>₦200,000.00</p>
          <p className='bank'>9912345678/Providus Bank</p>
          </div>
       </div>
      <div className='gridtext'>
        <div className='active'>General Details</div>
        <div>Documents</div>
        <div>Bank Details</div>
        <div>Loans</div>
        <div>Savings</div>
        <div>App and System</div>
      </div>
      </div> 

      <div className='info'>
        <div className='infobox'>
          <h4>Personal Information</h4>
          <div className='infogrid'>
            <div>
              <p className='head'>FULL NAME</p>
              <p className='text'>{selected?.username}</p>
            </div>
            <div>
              <p className='head'>PHONE NUMBER</p>
              <p className='text'>{formatPhoneNumber(selected?.phoneNo)}</p>
            </div>
            <div>
              <p className='head'>EMAIL ADDRESS</p>
              <p className='text'>{selected?.email}</p>
            </div>
            <div>
              <p className='head'>BVN</p>
              <p className='text'>{formatPhoneNumber(selected?.phoneNo)}</p>
            </div>
            <div>
              <p className='head'>GENDER</p>
              <p className='text'>FEMALE</p>
            </div>
            <div>
              <p className='head'>MARITAL STATUS</p>
              <p className='text'>Single</p>
            </div>
            <div>
              <p className='head'>CHILDREN</p>
              <p className='text'>None</p>
            </div>
            <div>
              <p className='head'>TYPE OF RESIDENCE</p>
              <p className='text'>Parent’s Apartment</p>
            </div>

          </div>
        </div>
        <div className='infobox'>
          <h4>Education and Employment</h4>
          <div className='infogrid2'>
            <div>
              <p className='head'>LEVEL OF EDUCATION</p>
              <p className='text'>B.Sc</p>
            </div>
            <div>
              <p className='head'>employment status</p>
              <p className='text'>Employed</p>
            </div>
            <div>
              <p className='head'>sector of employment</p>
              <p className='text'>FinTech</p>
            </div>
            <div>
              <p className='head'>Duration of employment</p>
              <p className='text'>2 years</p>
            </div>
            <div>
              <p className='head'>office email</p>
              <p className='text'>{selected?.email}</p>
            </div>
            <div>
              <p className='head'>Monthly income</p>
              <p className='text'>₦200,000.00- ₦400,000.00</p>
            </div>
            <div>
              <p className='head'>loan repayment</p>
              <p className='text'>40,000</p>
            </div>
          </div>
          
        </div>
        <div className='infobox'>
          <h4>Socials</h4>
          <div className='infogrid'>
            <div>
              <p className='head'>Twitter</p>
              <p className='text'>@{selected?.username}</p>
            </div>
            <div>
              <p className='head'>Facebook</p>
              <p className='text'>{selected?.username}</p>
            </div>
            <div>
              <p className='head'>Instagram</p>
              <p className='text'>@{selected?.username}</p>
            </div>

          </div>
        </div>
        <div className='infobox'>
          <h4>Guarantor</h4>
          <div className='infogrid'>
            <div>
              <p className='head'>full Name</p>
              <p className='text'>Debby Ogana</p>
            </div>
            <div>
              <p className='head'>Phone Number</p>
              <p className='text'>07060780922</p>
            </div>
            <div>
              <p className='head'>Email Address</p>
              <p className='text'>debby@gmail.com</p>
            </div>
            <div>
              <p className='head'>Relationship</p>
              <p className='text'>Sister</p>
            </div>
          </div>
        </div>
        <div className='infobox'>
          <div className='infogrid3'>
            <div>
              <p className='head'>full Name</p>
              <p className='text'>Debby Ogana</p>
            </div>
            <div>
              <p className='head'>Phone Number</p>
              <p className='text'>07060780922</p>
            </div>
            <div>
              <p className='head'>Email Address</p>
              <p className='text'>debby@gmail.com</p>
            </div>
            <div>
              <p className='head'>Relationship</p>
              <p className='text'>Sister</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
