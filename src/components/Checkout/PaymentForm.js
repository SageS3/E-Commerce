import React, { useState } from 'react';
import './PaymentForm.css';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

function PaymentForm(activeStep, setActiveStep) {
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardHolderAddress, setCardHolderAddress] = useState('');
  const [cardHolderState, setCardHolderState] = useState('');
  const [cardHolderCity, setCardHolderCity] = useState('');
  const [cardHolderZip, setCardHolderZip] = useState('');

  // create a payment intent on the server
  // returns a client_secret of that payment intent

  // we need a reference to the card element we defined
  // we need a reference to the stripe.js object
  // create a payment method

  // confirm the payment
  // requires payment method id and client secret

  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: 'white',
        color: '#403F4C',
      },
      invalid: {
        color: '#E3655B',
        iconColor: '#E3655B',
      },
      complete: {},
    },

    hidePostalCode: true,
  };

  return (
    <div className="wrapper">
      <input
        type="text"
        value={cardHolderName}
        placeholder="Name on Card"
        onChange={(e) => setCardHolderName(e.target.value)}
      ></input>
      <input
        type="text"
        value={cardHolderAddress}
        placeholder="Address"
        onChange={(e) => setCardHolderAddress(e.target.value)}
      ></input>
      <input
        type="text"
        value={cardHolderCity}
        placeholder="City"
        onChange={(e) => setCardHolderCity(e.target.value)}
      ></input>
      <input
        type="text"
        value={cardHolderState}
        placeholder="State"
        onChange={(e) => setCardHolderState(e.target.value)}
      ></input>
      <input
        type="text"
        value={cardHolderZip}
        placeholder="Zip"
        onChange={(e) => setCardHolderZip(e.target.value)}
      ></input>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe }) => (
            <form>
              <CardElement options={cardElementOptions}>
                <div>
                  <button onClick={() => setActiveStep(activeStep - 1)}>
                    Back
                  </button>
                  <button disabled={!stripe}>pay</button>
                </div>
              </CardElement>
              <button type="submit">Pay</button>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
}

export default PaymentForm;
