import './App.css'
import Landing from './components/Landing'
import Benefits from './components/Benefits'
import Features from './components/Features'
import Companies from './components/Companies'
import Pricing from './components/Pricing';
import Faq from './components/Faq'
import Card from './components/views/Card'
import Footer from './components/views/Footer'
function App() {


  return (
    <>
    <div className='bg-black'>
    <Landing />
    <Benefits />
    <Features />
    <Companies />
    <Pricing />
    <Faq />
    <Card />
    <Footer />
     </div>
    </>
  )
}

export default App
