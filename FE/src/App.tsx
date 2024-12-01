import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes';
import { axiosInstance } from './api/axios';
import { stripePublicKey } from './lib/variables';

type Props = {};

const stripePromise = loadStripe(stripePublicKey);

export const App = (props: Props) => {
  const [clientSecret, setClientSecret] = React.useState<StripeElementsOptions | undefined>(undefined);

  React.useEffect(() => {
    axiosInstance.post('payment/create-payment-intent').then((res) => setClientSecret(res.data.data.client_secret));
  }, []);

  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={clientSecret}>
          <RouterProvider router={router} />
        </Elements>
      )}
    </div>
  );
};
