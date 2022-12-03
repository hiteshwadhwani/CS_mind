import React from 'react';
import AimFormScreen from './AimFormScreen';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_live_51IPNFDLF5m6DVYN5wYKg3p9Nz3ReFC1GJkupUNJCCZ79tps9e9V4I9OvRG2vK5YppgKSwyoxSfU8hrpbWYchGFTL00WnQeFtOr');


const PaymentScreenWrapper4 = ({history,location}) => {
    return (
        <Elements stripe={stripePromise} >
          <AimFormScreen  history={history} location={location}/>
      </Elements>
    )
}

export default PaymentScreenWrapper4
