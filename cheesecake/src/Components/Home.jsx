import React, { useState } from 'react';
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

  const [activeLink, setActiveLink] = useState("Home");
  const handleSetActiveLink = (link) => {
    setActiveLink(link); // Update active link state when a link is clicked
  };

  return (
    <section className='home' id='Home'>
      <nav className="navbar navbar-expand-lg myNav">
        <div className="container-fluid myContainer">
          <img src={logo} alt="Cheesecake Logo" />
          <button className="navbar-toggler myToggle" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse lists" id="navbarNav">
            <ul className="navbar-nav items">
              <li className={`nav-item ${activeLink === 'Home' ? 'actives' : ''}`}>
                <ScrollLink
                  to="Home"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleSetActiveLink('Home')}
                >
                  Home
                </ScrollLink>
              </li>
              <li className={`nav-item ${activeLink === 'About' ? 'actives' : ''}`}>
                <ScrollLink
                  to="About"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleSetActiveLink('About')}
                >
                  About Us
                </ScrollLink>
              </li>
              <li className={`nav-item ${activeLink === 'Menu' ? 'actives' : ''}`}>
                <ScrollLink
                  to="Menu"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleSetActiveLink('Menu')}
                >
                  Menu
                </ScrollLink>
              </li>
              <li className={`nav-item ${activeLink === 'Contact' ? 'actives' : ''}`}>
                <ScrollLink
                  to="Contact"
                  smooth={true}
                  duration={500}
                  className="nav-link"
                  aria-current="page"
                  onClick={() => handleSetActiveLink('Contact')}
                >
                  Contact
                </ScrollLink>
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