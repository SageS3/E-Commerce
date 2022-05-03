import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Navbar({ totalItems, setIsOpen }) {
  const itemCountBadge = () => {
    return <div className="item-count">{totalItems}</div>;
  };

  const MobileSidebar = () => {
    return ReactDOM.createPortal(
      <div className="dark-out">
        <div className="mobile-sidebar-wrapper">
          <Link to="/">
            <button type="button">Home</button>
          </Link>
          <button type="button" onClick={() => setIsOpen(true)}>
            Contact
          </button>
          <button type="button">About</button>
          <Link to="/cart">
            <button type="button">
              <ShoppingCartIcon />
              {totalItems > 0 && itemCountBadge()}
            </button>
          </Link>
        </div>
      </div>,
      document.getElementById('sidebar-portal')
    );
  };

  return (
    <div className="navbar">
      <div type="button" className="hamburger-menu">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <nav className="navbar-wrapper">
        <Link to="/">
          <button type="button">Home</button>
        </Link>
        <button type="button" onClick={() => setIsOpen(true)}>
          Contact
        </button>
        <button type="button">About</button>
        <Link to="/cart">
          <button type="button">
            <ShoppingCartIcon />
            {totalItems > 0 && itemCountBadge()}
          </button>
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
