import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { AddressForm, PaymentForm } from '../index.js';
import { Link, useNavigate } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

function Checkout({ cart, onCaptureCheckout, order }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const navigate = useNavigate();
  const selectedStep = () => <div className="selected-step"></div>;

  const loadingAnimation = () => (
    <div className="loading-animation">
      <div className="loading_dot dot_one"></div>
      <div className="loading_dot dot_two"></div>
      <div className="loading_dot dot_three"></div>
    </div>
  );

  const Confirmation = () =>
    order.customer ? (
      <div className="confirmation-wrapper">
        <p>Your order ref: {order.customer_reference}</p>
        <p>{`Thank you for your purchase ${order.customer.firstName}!`}</p>
        <Link to="/">
          <button type="button">Return Home</button>
        </Link>
      </div>
    ) : (
      loadingAnimation()
    );

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        navigate('/');
      }
    };
    generateToken();
  }, [cart]);

  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        activeStep={activeStep}
        nextStep={nextStep}
        shippingData={shippingData}
        setShippingData={setShippingData}
        checkoutToken={checkoutToken}
      />
    ) : (
      activeStep === 1 && (
        <PaymentForm
          cart={cart}
          activeStep={activeStep}
          setStep={setActiveStep}
          backStep={backStep}
          checkoutToken={checkoutToken}
          onCaptureCheckout={onCaptureCheckout}
          nextStep={nextStep}
          shippingData={shippingData}
        />
      )
    );

  const backButton = () => {
    return (
      <div className="back-button-container">
        <Link to="/cart">
          <ArrowBackIosIcon sx={{ color: 'rgb(119,200,170)' }} />
          <button className="back-button" onClick={() => backStep()}>
            Back
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="checkout-page">
      {activeStep < 2 && backButton()}
      <section className="steps">
        <p>Shipping</p>
        <p>Payment</p>
        <p>Confirmation</p>
      </section>
      <div className="stepper">
        {activeStep === 0 ? (
          selectedStep()
        ) : (
          <div className="step step-one"></div>
        )}
        <div className="step-divider"></div>
        {activeStep === 1 ? (
          selectedStep()
        ) : (
          <div className="step step-two"></div>
        )}
        <div className="step-divider"></div>
        {activeStep === 2 ? (
          selectedStep()
        ) : (
          <div className="step step-three"></div>
        )}
      </div>

      <div className="checkout-main">
        {activeStep === 2 ? <Confirmation /> : checkoutToken && <Form />}
        {!checkoutToken && loadingAnimation()}
      </div>
      <div className="checkout-footer"></div>
    </div>
  );
}

export default Checkout;
