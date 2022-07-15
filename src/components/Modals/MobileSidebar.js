import React from 'react';
import './MobileSidebar.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { animated, useSpring } from '@react-spring/web';

function MobileSidebar({
  totalItems,
  setIsOpen,
  setIsSidebarOpen,
  isSidebarOpen,
}) {
  const slideSidebar = useSpring({
    config: { duration: 300 },
    from: {
      left: '-30%',
    },
    to: {
      left: '25%',
    },
  });

  const animatedDarkOut = useSpring({
    delay: 2000,
    backgroundColor: isSidebarOpen
      ? 'rgba(0, 0, 0, 0.4)'
      : 'rgba(0, 0, 0, 0.0)',
  });

  const itemCountBadge = () => {
    return <div className="item-count">{totalItems}</div>;
  };
  return ReactDOM.createPortal(
    <animated.div className="dark-out" style={animatedDarkOut}>
      <animated.div className="mobile-sidebar-wrapper" style={slideSidebar}>
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
      </animated.div>
    </animated.div>,
    document.getElementById('sidebar-portal')
  );
}

export default MobileSidebar;
