import React from 'react';
import './Main.css';
import { ProductCard } from './index.js';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Navbar from '../components/Navbar';

function Main({ handleAddToCart, products, setIsOpen, cart }) {
  const isEmpty = !cart.line_items;
  if (isEmpty) {
    return (
      <div className="main-loading-page">
        <div className="loading_dot dot_one"></div>
        <div className="loading_dot dot_two"></div>
        <div className="loading_dot dot_three"></div>
      </div>
    );
  }
  return (
    <div className="home-page">
      <Navbar totalItems={cart.total_items} setIsOpen={setIsOpen}></Navbar>
      <div className="product-grid">
        <ProductCard
          products={products}
          addToCart={handleAddToCart}
        ></ProductCard>
      </div>
      <div className="footer">
        <InstagramIcon />
        <FacebookIcon />
        <TwitterIcon />
      </div>
    </div>
  );
}

export default Main;
