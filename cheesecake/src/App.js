import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min";
import HomePage from './Pages/HomePage';
import MenuPage from './Pages/MenuPage';
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter >
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<HomePage />} />
        <Route path="/menu" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/blog" element={<HomePage />} />
        <Route path="/menu2" element={<MenuPage />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
