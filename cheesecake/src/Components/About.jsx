import React from 'react';
import aboutImage from '../images/About Us Image.png'

function About() {
    return (
        <section className='about' id='About'>
            <div className='about-text'>
                <div className='about-image'>
                    <img src={aboutImage} />
                </div>
                <div>
                    <h2>We Love Cheesecake</h2>
                    <p className='about-big'>Discover Our Cheesecake Story</p>
                    <p className='about-small'>At Cheesecake Love, quality is our cornerstone. Each cheesecake is crafted with the finest ingredients, meticulous attention to detail, and a dash of creativity. </p>
                    <p className='about-small'>We believe in delivering not just desserts but moments of sheer indulgence.</p>
                    <button className='button'>Read More</button>
                </div>
            </div>
        </section>
    )
}

export default About