import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import logo from '../images/LOGO OF CHEESECAKE.png';
import demo from '../images/Vector.png';
import cake from '../images/Main Image (Home).png'
import Contact from './Contact';
import { Link as ScrollLink } from 'react-scroll';
import About from './About';
import Menu from './Menu';

function Home() {
  return (
    <section className='home' id='Home'>
      <nav class="navbar navbar-expand-lg myNav">
        <div class="container-fluid myContainer">
          <img src={logo} />
          <button class="navbar-toggler myToggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse lists" id="navbarNav">
            <ul class="navbar-nav items">
              <li class="nav-item actives">
              <ScrollLink to="/" smooth={true} duration={500} class="nav-link" aria-current="page">Home</ScrollLink>
              </li>
              <li class="nav-item">
              <ScrollLink to="about" smooth={true} duration={500} class="nav-link" aria-current="page">About Us</ScrollLink>
              </li>
              <li class="nav-item">
              <ScrollLink to="menu" smooth={true} duration={500} class="nav-link" aria-current="page">Menu</ScrollLink>
              </li>
              <li class="nav-item">
                <ScrollLink to="contact" smooth={true} duration={500} class="nav-link" aria-current="page">Contact</ScrollLink>
              </li>
            </ul>
          </div>
          <div>
            <button className='signup'>Sign up</button>

          </div>
        </div>
      </nav>
      <div className='home-text'>
        <div className='home-title'>
          <h1>Bite The World of Cheesecake Wonders</h1>
          <p>We always make our customer happy by providing
            as many choices as possible </p>
          <div>
            <button className='button'>Get Started</button>
            <button className='demo'><img src={demo} />Watch Demo</button>
          </div>
        </div>
        <div className='cake'><img src={cake}/></div>
      </div>
    </section>
  )
}

export default Home