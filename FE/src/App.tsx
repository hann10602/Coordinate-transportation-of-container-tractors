import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { router } from './routes';
import { axiosInstance } from './api/axios';

type Props = {};

const stripePromise = loadStripe(
  'pk_test_51P98jMHLqxvJe8t5gc6sODNJFZxo8cf3Jqh1k7YlSRwCiJCPqpEucoSRWEeY1TWV68BT7cRc0XD4mCxR23E0E5mA00C1YTUkwb'
);

export const App = (props: Props) => {
  const [clientSecret, setClientSecret] = React.useState<StripeElementsOptions | undefined>(undefined);

  React.useEffect(() => {
    // Fetch the clientSecret from your server
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
