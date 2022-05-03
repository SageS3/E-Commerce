import React from 'react';
import './Navbar.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
      <div className="hamburger-menu">
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
