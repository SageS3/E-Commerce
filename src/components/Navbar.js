import React, { useEffect } from 'react';
import './Navbar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Navbar({ totalItems, setIsOpen }) {
  const itemCountBadge = () => {
    return <div className="item-count">{totalItems}</div>;
  };

  const MobileSidebar = () => (
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
  );

  const MobileNav = () => (
    <div className="mobile-nav-wrapper">
      <button className="hamburger-nav"></button>
    </div>
  );

  const DesktopNav = () => (
    <div className="navbar">
      <nav className="navbar-wrapper">
        <button type="button" className="hamburger-menu">
          <div></div>
          <div></div>
          <div></div>
        </button>
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

  return <>{DesktopNav()}</>;
}

export default Navbar;
