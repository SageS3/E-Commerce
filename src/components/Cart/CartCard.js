import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './CartCard.css';

export default function CartCard({
  cart,
  removeFromCart,
  updateCart,
  products,
}) {
  const cartItems = cart.line_items;

  const addDescription = () => {
    cartItems.map((cartItem) => {
      products.forEach((product) => {
        if (cartItem.name === product.name) {
          cartItem.description = product.description.slice(3, -4);
        }
      });
    });
  };

  addDescription();

  // card slide animation...
  // The slide animation will slide horizontally starting
  // with the card overflow hidden within the .cart-list-container.
  // Every other item will slide in from the opposite side.
  // the animation

  const cardWrapper = document.querySelector('item-card');

  return (
    <div className="cart-list-container">
      {cartItems.map((item) => (
        <div className="item-card" key={item.id}>
          <div className="img-wrapper">
            <img className="cart-product-img" src={item.image.url}></img>
          </div>
          <div className="item-details-wrapper">
            <section>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </section>
            <button
              className="delete-item-button"
              onClick={() => removeFromCart(item.id)}
            >
              <CloseIcon />
            </button>

            <section>
              <div className="quantity-adjustment">
                <button onClick={() => updateCart(item.id, item.quantity - 1)}>
                  <RemoveIcon />
                </button>
                <p className="quantity">{`${item.quantity}`}</p>
                <button onClick={() => updateCart(item.id, item.quantity + 1)}>
                  <AddIcon />
                </button>
              </div>
              <h3>{`$${parseInt(item.price.formatted) * item.quantity}`}</h3>
            </section>
          </div>
        </div>
      ))}
    </div>
  );
}
