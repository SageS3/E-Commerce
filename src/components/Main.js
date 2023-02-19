import React from 'react'
import './Main.css'
import { ProductCard } from './index.js'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import Navbar from '../components/Navbar'

function Main() {
  return (
    <div className="home-page">
      <Navbar />
      <div className="product-grid">
        <ProductCard />
      </div>
      <div className="footer">
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
      </div>
    </div>
  )
}

export default Main
