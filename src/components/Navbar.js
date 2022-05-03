import './Navbar.css';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar({ totalItems, setIsOpen, toggleSidebar }) {
  const itemCountBadge = () => {
    return <div className="item-count">{totalItems}</div>;
  };

  return (
    <div className="navbar">
      <div
        type="button"
        className="hamburger-menu"
        onClick={() => toggleSidebar(true)}
      >
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
