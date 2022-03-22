import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { Main, Cart, Checkout, ContactModal } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Main
                handleAddToCart={handleAddToCart}
                products={products}
                setIsOpen={setIsContactModalOpen}
                cart={cart}
              ></Main> // container composition
            }
          />

          <Route
            exact
            path="/cart"
            element={
              <Cart
                updateCart={handleUpdateCart}
                emptyCart={handleEmptyCart}
                removeFromCart={handleRemoveFromCart}
                cart={cart}
                products={products}
                setIsOpen={setIsContactModalOpen}
              />
            }
          />
          <Route exact path="/checkout" element={<Checkout></Checkout>} />
        </Routes>
      </Router>
      {isContactModalOpen && (
        <ContactModal setOpen={setIsContactModalOpen}></ContactModal>
      )}
      {isPreviewModalOpen && (
        <PreviewModal
          setOpen={setIsPreviewModalOpen}
          products={products}
        ></PreviewModal>
      )}
    </div>
  );
}

export default App;
