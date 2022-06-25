import React, { useContext } from 'react';
import { Navbar } from '../index.js';
import './Cart.css';
import { Link } from 'react-router-dom';
import CartCard from './CartCard';
import { PropContext } from '../../App.js';

function Cart() {
  const cartProps = useContext(PropContext);
  const { cart, products, updateCart, emptyCart, removeFromCart } = cartProps;
  const cartItems = cart.line_items;
  const isEmpty = !cartItems;

  if (isEmpty) {
    return (
      <div className="loading-animation">
        <div className="loading_dot dot_one"></div>
        <div className="loading_dot dot_two"></div>
        <div className="loading_dot dot_three"></div>
      </div>
    );
  }

  const cartItemsSum = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.quantity; // calculation includes the item and the quantity
    });
    return sum;
  };

  const isPlural = (itemAmount) => {
    if (itemAmount() > 1) {
      return 'items';
    }
    return 'item';
  };

  const confirmCheckout = () => {
    return (
      <div className="confirm-checkout-wrapper">
        <section>
          <h2 className="total-price">
            {`Subtotal: ${cart.subtotal.formatted_with_symbol} `}
          </h2>
        </section>
        <Link to="/checkout">
          <button className="checkout-button">Checkout</button>
        </Link>
        <button onClick={emptyCart} className="empty-cart-button">
          Empty Cart
        </button>
      </div>
    );
  };

  const emptyCartMessage = () => {
    return (
      <div className="empty-cart-message">
        <h1>Add Items To Your Cart!</h1>
      </div>
    );
  };

  const populatedCart = () => (
    <section className="cart-header-display">
      <p>User's cart</p>
      <p>{`${cartItemsSum()} \u0020 ${isPlural(cartItemsSum)}`}</p>
    </section>
  );

  const cartList = () => (
    <div className="cart-item-list">
      {cartItems.length > 0 && (
        <CartCard
          cart={cart}
          updateCart={updateCart}
          removeFromCart={removeFromCart}
          products={products}
        ></CartCard>
      )}
      {cartItems.length > 0 && confirmCheckout()}
    </div>
  );

  return (
    <div className="cart-page">
      <Navbar />
      {cartItems.length > 0 && populatedCart()}
      {cartItems.length === 0 && emptyCartMessage()}
      {cartItems.length > 0 && cartList()}
    </div>
  );
}

export default Cart;
