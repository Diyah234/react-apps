import React from 'react'
import Home from '../Components/Home';
import About from '../Components/About';
import Menu from '../Components/Menu';
import Blog from '../Components/Blog';
import Contact from '../Components/Contact';
import arrow from '../images/Green Arrow BTN.png'

function HomePage() {
  return (
    <div>
        <Home />
        <About />
        <Menu 
        class = "menu"
        title = "Our Menu"
        link = "View more"
        img = {arrow}/>
        <Blog />
        <Contact />
    </div>
  )
}

export default HomePage