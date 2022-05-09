import React, { useState, useEffect } from 'react';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {
  Main,
  Cart,
  Checkout,
  ContactModal,
  MobileSidebar,
} from './components';

export const PropContext = React.createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

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

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <PropContext.Provider
        value={{
          handleAddToCart: handleAddToCart,
          products: products,
          setIsOpen: setIsContactModalOpen,
          isSidebarOpen: isSidebarOpen,
          toggleSidebar: setIsSidebarOpen,
          cart: cart,
        }}
      >
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
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={setIsSidebarOpen}
                  cart={cart}
                />
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
                  isSidebarOpen={isSidebarOpen}
                  toggleSidebar={setIsSidebarOpen}
                />
              }
            />
            <Route
              exact
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              }
            />
          </Routes>

          {isContactModalOpen && (
            <ContactModal setOpen={setIsContactModalOpen} />
          )}
          {isSidebarOpen && (
            <MobileSidebar
              totalItems={cart.total_items}
              setIsOpen={setIsContactModalOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          )}
        </Router>
      </PropContext.Provider>
    </div>
  );
}

export default App;
