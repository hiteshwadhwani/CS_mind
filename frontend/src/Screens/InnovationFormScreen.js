import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { registerInnovation } from "../actions/innovationActions";
import FormContainer from "../components/FormContainer";
import { Form, Button,Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import Message from "../components/Message";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { INNOVATION_REGISTER_RESET } from "../reducers/innovationConstants";

const options = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const InnovationScreen = ({ location, history,projectname }) => {
  
  const [heading,setHeading]=useState('');
  const [mobile, setMobile] = useState(null);
  const [professionDetails, setProfessionDetails] = useState("");
  const [message, setMessage] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [meta,setMetadata]=useState(null)
  const [processing, setProcessing] = useState(false);
  const [cardError, setcardError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const amountType=projectname
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const innovationRegister = useSelector((state) => state.innovationRegister);
  const { innoverror, innovloading, successMessage } = innovationRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const contentDetails = useSelector((state) => state.contentDetails);
  const {contentItems } = contentDetails;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  let price;
  if(projectname==='TeamQ'){
    price=contentItems.teamqPrice
  }else if(projectname==='Diam'){
    price=contentItems.diamPrice
  }else{
    price=contentItems.resPrice
  }
  
  

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch({type:INNOVATION_REGISTER_RESET})
    setBillingDetails({
      ...billingDetails,
      name: userInfo.name,
      email: userInfo.email,
    });
    window.scrollTo(0,0)
    setHeading(projectname)
  }, [history, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('')
    if (!mobile || mobile.length !== 10) {
      setMessage("mobile number should consist 10 digita");
      return;
    } else if (!stripe || !elements) {
      return;
    } else if (cardError) {
      elements.getElement("card").focus();
      return;
    }
    if (cardComplete) {
      setProcessing(true);
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data: clientSecret } = await axios.post(
        "/api/payment_intents",
        {
          amountType,
          receipt_email: userInfo.email,
        },
        config
      );

      const payload = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      });

      if (payload.error) {
        setError(payload.error.message);
        setProcessing(false);
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: payload.paymentMethod.id,
        }
      );
      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }
      setMetadata(paymentIntent);
      const order = {
        paymentid: paymentIntent.id,
        status: paymentIntent.status,
        receipt_email: paymentIntent.receipt_email,
        mobile,
        professionDetails,skills,projectname:heading,
        price
      };
      dispatch(registerInnovation(order));
      console.log(paymentIntent);
      console.log("successfully paid");
      setMessage('')  
      setSucceeded(true);
    } catch (err) {
      setError(err.message);
      setProcessing(false);
      return;
    }
  };
  return (
    <>
    {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="primary">{message}</Message>}
      {innovloading?<Loader />:innoverror ? <Message variant="danger">{error}</Message>:
       !succeeded && !successMessage ?(
    <FormContainer>
      <h3>Register for CSMIND {heading} Venture</h3>
      {successMessage && <Message variant="success">{successMessage}</Message>}
      {message && <Message variant="danger">{message}</Message>}
      {innoverror && <Message variant="danger">{error}</Message>}
      
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="mobile">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="10 digit mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="professionDetails">
          <Form.Label>brief details about your profession</Form.Label>
          <Form.Control
            type="text"
            placeholder="write here.."
            value={professionDetails}
            as="textarea"
            required
            onChange={(e) => setProfessionDetails(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="skills">
          <Form.Label>Skills and Technologies</Form.Label>
          <Form.Control
            required
            type="text"
            as="textarea"
            placeholder="write here.."
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Label>Card details</Form.Label>
            <CardElement
              className="sr-input sr-card-element"
              options={options}
              onChange={(e) => {
                setcardError(e.error);
                setCardComplete(e.complete);
              }}
            />
            <p style={{ marginTop: "10px" }}>Total: Rs.{price}</p>
            <Button
              type="submit"
              variant="primary"
              disabled={processing || !stripe}
            >
              {processing?'proceesing':'Register and pay now'}
            </Button>
      </Form>
    </FormContainer>
    ):(
      <Container style={{marginTop:"10px"}}>
        <div className="sr-field-success message">
          <h2 style={{textAlign:"center"}}>Your  payment succeeded</h2>
          <div style={{textAlign:"center"}}>
          <span style={{margin:"auto"}}>
          <i class="fa fa-check-circle" aria-hidden="true" style={{fontSize:"100px",color:"green"}}></i>
          </span>
          </div>
          <h3>{successMessage+',go to your profile to check the registration'}</h3>
          

          
        </div>
        </Container>
    )}
    </>
  );
};

export default InnovationScreen;
