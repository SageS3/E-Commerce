import React from 'react';
import './MobileSidebar.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function MobileSidebar({ totalItems, setIsOpen, setIsSidebarOpen }) {
  const itemCountBadge = () => {
    return <div className="item-count">{totalItems}</div>;
  };
  return ReactDOM.createPortal(
    <div className="dark-out">
      <div className="mobile-sidebar-wrapper">
        <Link to="/">
          <button type="button" onClick={() => setIsSidebarOpen(false)}>
            Home
          </button>
        </Link>
        <button type="button" onClick={() => setIsOpen(true)}>
          Contact
        </button>
        <button type="button">About</button>
        <Link to="/cart">
          <button type="button" onClick={() => setIsSidebarOpen(false)}>
            <ShoppingCartIcon />
            {totalItems > 0 && itemCountBadge()}
          </button>
        </Link>
      </div>
    </div>,
    document.getElementById('sidebar-portal')
  );
}

export default MobileSidebar;
