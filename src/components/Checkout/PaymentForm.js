import React from 'react';
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

function PaymentForm({
  checkoutToken,
  onCaptureCheckout,
  shippingData,
  nextStep,
}) {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'primary',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.state,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fullfillment: { shipping_method: 'Domestic' },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        backgroundColor: 'white',
        color: '#403F4C',
        fontSize: '25px',
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
    <div className="paymentFormWrapper">
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement options={cardElementOptions} />
              <button type="submit" disabled={!stripe}>
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </button>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
}

export default PaymentForm;
