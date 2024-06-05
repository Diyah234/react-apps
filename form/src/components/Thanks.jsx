import React from 'react';
import thank from '../images/thank-you.svg'
import './Summary.scss'

function Thanks() {
  return (
    <section className='thanks'>
        <img src={thank} />
        <h1>Thank you!</h1>
        <p className='thankstext'>Thanks for confirming your subscription! We hope you have fun using our platform. If you 
            ever need support, please feel free to email us at support@loremgaming.com.
        </p>
    </section>
  )
}

export default Thanks