import './Main.css';
import { ProductCard } from './index.js';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Navbar from '../components/Navbar';

function Main({ cart }) {
  const loadingAnimation = () => {
    return (
      <div className="loading-animation">
        <div className="loading_dot dot_one"></div>
        <div className="loading_dot dot_two"></div>
        <div className="loading_dot dot_three"></div>
      </div>
    );
  };

  const isEmpty = !cart.line_items;

  if (isEmpty) return loadingAnimation();

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
  );
}

export default Main;
