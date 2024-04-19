import React from 'react';
import contactImg from "../images/contact-image.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

function Contact() {
  return (
   <section className='contact' id='Contact'>
    <div className="contact-page row">
        <div className="contact-text col-lg-6 col-sm-12">
            <h2>Contact Us</h2>
            <p className='contact-word'>Need to get in touch with us? Either fill out the form with your inquiry or find the department!</p>
            <img src={contactImg}/>
            <div className="icons">
            <FontAwesomeIcon icon={faFacebook} size = "xl"style={{color: "#ff9900",}} className='fontawesome'/>
            <FontAwesomeIcon icon={faInstagram} size="xl" style={{color: "#edffef",}} className='fontawesome'/>
            <FontAwesomeIcon icon={faTwitter} size="xl" style={{color: "#edffef",}} className='fontawesome'/>
            <FontAwesomeIcon icon={faYoutube} size="xl" style={{color: "#edffef",}} className='fontawesome' />
            <p className='copyright'>Copyright &copy; 2024 Dscode | All rights reserved</p>
            </div>
        </div>
        <div className="form col-lg-6 col-sm-12">
                <form>
                    <input type="text" placeholder='Name' /><br/>
                    <input type="email" placeholder='Email'/><br />
                    <textarea cols="30" rows="5" placeholder='Your Message...'></textarea>
                    <button type="submit">Contact us now</button>
                </form>
            </div>
    </div>
   </section>
  )
}

export default Contact