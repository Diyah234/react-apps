
import { useEffect, useState } from 'react';
import './App.scss';
import headerDesktop from '../images/bg-header-desktop.svg'
import headerMobile from '../images/bg-header-mobile.svg'
import close from '../images/icon-remove.svg'
import Container from './container';
import data from '../data';



function App() {
  //const [mode, setMode] = useState(false)
  // const mobile = window.matchMedia('(max-width: 475px)');
  //  let modeMobile;
  //  if (mobile.matches) {
  //   modeMobile = `url(${headerMobile})`;
  //  }else{
  //   modeMobile = `url(${headerDesktop})`;
  //  }
  const [showBox, setShowBox] = useState(false)
  const [selectedItems , setSelectedItems] = useState([])
  const [filter, setFilter] = useState(data)

  

  useEffect(() => {
    // Update filtered data when selectedItems change
    const newData = data.filter(item =>
      selectedItems.every(key =>
        item.role === key ||
        item.level === key ||
        item.languages.includes(key) ||
        item.tools.includes(key)
      )
    );
    setFilter(newData);
  }, [selectedItems]);

  function show(e) {
    const text = e.target.textContent.trim();

    if (!selectedItems.includes(text)) {
      setSelectedItems(prev => [...prev, text]);
      setShowBox(true);
    }
  }
  function hide(){
    setShowBox(false)
  }
  function del(index) {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
   if (updatedItems.length === 0) {
    setShowBox(false)
   }
   
    
  }
  return (
    <div className="App">
      <div className='bg'><img src={window.innerWidth > 1024 ? headerDesktop : headerMobile}/></div>
      <main>
        <div className={showBox ? 'show' : 'hide'}>
          <div className='features'>{selectedItems && selectedItems.map((item, index) =><div key={index}>
           <span className='details'>{item}</span>
          <span className='close' onClick={  () => del(index)}><img src={close} /></span> </div>)} </div>
          <div><p onClick={hide}>Clear</p></div></div>
 
 
      {filter.map((item, index) => {
        let containerClass ="box";
        if (index < 2) {
          containerClass ="box border";
        }

        return (
 
          <section>
          <Container
          key= {index}
      image = {item.logo}
      company = {item.company}
      new = 'NEW!'
      featured = "FEATURED"
      role = {item.role}
      level = {item.level}
      position = {item.position}
      postedAt = {item.postedAt}
      contract = {item.contract}
      location = {item.location}
      languages = {item.languages}
      show = {show}
       box = {containerClass}
      />
       </section>
        )
      })}
      
     
      </main>
    </div>
  );
}

export default App;
