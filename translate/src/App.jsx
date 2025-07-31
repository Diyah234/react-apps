
import { useState } from 'react'
import heroImg from './resources/hero_img.jpg'
import heroImgSm from './resources/hero_img-sm.jpg'
import {Grid,Box} from '@mui/material'
import './App.css'
import Container from './components/Container'
import useMediaQuery from '@mui/material/useMediaQuery';
function App() {

const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <div className='overflow-hidden'>
      <Grid container spacing={0} className="w-full max-w-full overflow-hidden">
        <Grid size={12} className="w-full max-w-full">
          <Box><img src={matches ? heroImgSm : heroImg} alt="" srcset="" className="w-full max-w-full h-80"/></Box>
        </Grid>
        <Grid size={12}>
          <Box>
            <div className='bg-black w-full max-w-full lg:h-105 h-180 '></div>
          </Box>
        </Grid>
      </Grid>
      <Container/>
        </div>
    </>
  )
}

export default App
