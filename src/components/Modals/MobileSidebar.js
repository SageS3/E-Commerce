import React from 'react';
import './MobileSidebar.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function MobileSidebar({ totalItems, setIsOpen }) {
  const itemCountBadge = () => {
    return <div className="item-count">{totalItems}</div>;
  };
  return ReactDOM.createPortal(
    <div className="dark-out">
      <div className="mobile-sidebar-wrapper">
        <Router>
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
        </Router>
      </div>
    </div>,
    document.getElementById('sidebar-portal')
  );
}

export default MobileSidebar;
