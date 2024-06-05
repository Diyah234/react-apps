import Sidebar from './global/Sidebar';
import PersonalInfo from './components/PersonalInfo';
import AddOns from './components/AddOns';
import Plans from './components/Plans';
import Summary from './components/Summary';
import Thanks from './components/Thanks';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import {ContextProvider} from './global/Context';
import { useState } from 'react';

function App() {
  const [price, setPrice] = useState('')
  return (
    <div className="App">
      <ContextProvider value={{price, setPrice}}>
      <BrowserRouter>
      <div className='container'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='content'>
            <Routes>
              <Route path="/" element={<PersonalInfo />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/add-ons" element={<AddOns />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/thanks" element={<Thanks />} />
            </Routes>     
        </div>
      </div>
      </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
