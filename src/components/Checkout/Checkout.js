import React, { useState } from 'react';
import './Checkout.css';
import { AddressForm, PaymentForm } from '../index.js';
import { Link } from 'react-router-dom';

function Checkout() {
  const steps = ['Address', 'Payment'];

  const [activeStep, setActiveStep] = useState(0);

  const selectedStep = () => (
    <div className="selected-step">{steps[activeStep]}</div>
  );

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm activeStep={activeStep} setStep={setActiveStep} />
    ) : (
      <PaymentForm activeStep={activeStep} setStep={setActiveStep} />
    );

  const Confirmation = () => <div>Confirmation</div>;

  return (
    <div className="checkout-page">
      <Link to="/cart">
        <button type="button">Back</button>
      </Link>
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
        {activeStep === steps.length ? <Confirmation /> : <Form />}
      </div>
      <div className="checkout-footer"></div>
    </div>
  );
}

export default Checkout;
