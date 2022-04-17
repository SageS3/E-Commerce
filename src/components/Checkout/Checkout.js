import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { AddressForm, PaymentForm } from '../index.js';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

function Checkout({ cart, onCaptureCheckout, order, error }) {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  const selectedStep = () => (
    <div className="selected-step">{steps[activeStep]}</div>
  );

  const Confirmation = () =>
    order.customer ? (
      <div>
        <h1>{`Your Order Token: `}</h1>
        <h1>{`Thank you for your purchase ${shippingData.firstName}!`}</h1>
        <Link to="/">
          <button type="button">Return Home</button>
        </Link>
      </div>
    ) : (
      <div className="loading_animation">
        <div className="loading_dot dot_one"></div>
        <div className="loading_dot dot_two"></div>
        <div className="loading_dot dot_three"></div>
      </div>
    );

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  const steps = ['Address', 'Payment', 'confirmation'];
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
    if (activeStep === 0) {
      return (
        <Link to="/cart">
          <button className="checkoutFormBackButton" type="button">
            Back
          </button>
        </Link>
      );
    }
    return (
      <button className="checkoutFormBackButton" onClick={() => backStep()}>
        Back
      </button>
    );
  };

  return (
    <div className="checkout-page">
      {backButton()}
      <div className="stepper">
        {activeStep === 0 ? (
          selectedStep()
        ) : (
          <div className="step step-one">{steps[0]}</div>
        )}
        <div className="step-divider"></div>
        {activeStep === 1 ? (
          selectedStep()
        ) : (
          <div className="step step-two">{steps[1]}</div>
        )}
      </div>

      <div className="checkout-main">
        {activeStep === 2 ? <Confirmation /> : checkoutToken && <Form />}
      </div>
      <div className="checkout-footer"></div>
    </div>
  );
}

export default Checkout;
