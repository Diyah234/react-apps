import React from 'react';
import { Link } from "react-router-dom";
import stars from '../images/STARS.png';
import blueberry from '../images/Blueberry Cheesecake Image.png'
import Biscoff from '../images/Biscoff cheesecake image.png'
import Chocolate from '../images/Chocolate cheesecake image.png'

import Menu2 from '../Pages/MenuPage';

function Menu(props) {
  return (
    <section className={props.class} id='Menu'>
        <h1>{props.title}</h1>
        <div className="row menu-ctn">
            <div className="col-lg-4 menu-box col-sm-12">
                <div className='menu-img'><img src={blueberry} className='blueberry'/></div>
                <h3>Blueberry Cheesecake</h3>
                <p>Blueberry love, cheesecake delight!</p>
                <div className='menu-text'><div><span className='dollar'>$</span><span className='price'>9.00</span></div><div><img src={stars}/></div></div>
            </div>
            <div className="col-lg-4 menu-box col-sm-12">
            <div className="menu-img"><img src={Biscoff} className='biscoff'/></div>
                <h3>Biscoff Cheesecake</h3>
                <p>Biscoff adores cheesecake magic</p>
                <div className='menu-text'><div><span className='dollar'>$</span><span className='price'>9.00</span></div><div><img src={stars}/></div></div>
            </div>
            <div className="col-lg-4 menu-box col-sm-12">
            <div className="menu-img"><img src={Chocolate} className='chocolate'/></div>
                <h3>Chocolate Cheesecake</h3>
                <p>Cherish Chocolate, relish cheesecake magic!</p>
                <div className='menu-text'><div><span className='dollar'>$</span><span className='price'>9.00</span></div><div><img src={stars}/></div></div>
            </div>
        </div>
        <div className='view'><span><Link to="./menu2" target='_blank' className='link'>{props.link}</Link></span><img src={props.img}/></div>
    </section>
  )
}

export default Menu