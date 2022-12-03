import React from 'react'
import InnovationFormm from './InnovationFormScreen';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_live_51IPNFDLF5m6DVYN5wYKg3p9Nz3ReFC1GJkupUNJCCZ79tps9e9V4I9OvRG2vK5YppgKSwyoxSfU8hrpbWYchGFTL00WnQeFtOr');

      

const PaymentScreenWrapper3 = ({history,location,match}) => {
    const projectname=match.params.projectname
    return (
        <Elements stripe={stripePromise} >
          <InnovationFormm  history={history} location={location} projectname={projectname}/>
      </Elements>
    )
}

export default PaymentScreenWrapper3
