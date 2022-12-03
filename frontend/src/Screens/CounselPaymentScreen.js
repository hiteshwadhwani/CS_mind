import React, { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { Form, Button, Container } from "react-bootstrap";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { registerCounsel } from "../actions/counselActions";
import Message from "../components/Message";
import axios from "axios";
import Loader from "../components/Loader";


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

const CounselPaymentScreen = ({ redirect, history }) => {
  const [mobile, setMobile] = useState(null);
  const [aboutYou, setAboutYou] = useState("");
  const [issues, setIssues] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [cardError, setcardError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const amountType = "counsel";
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const counselRegister = useSelector((state) => state.counselRegister);
  const { error: counselError, loading, successMessage } = counselRegister;
  const contentDetails = useSelector((state) => state.contentDetails);
  const { contentItems } = contentDetails;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setBillingDetails({
        ...billingDetails,
        name: userInfo.name,
        email: userInfo.email,
      });
      window.scrollTo(0,0)
    }
  }, [history, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');
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
        console.log(payload.error.message);
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
        console.log(error.message);
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
        aboutYou,
        issues,
        price:contentItems.counselPrice
      };
      dispatch(registerCounsel(order));
      console.log(paymentIntent);
      console.log("successfully paid");
      setMessage('')  
      setSucceeded(true);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setProcessing(false);
      return;

    }
  };
  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {message && <Message variant="primary">{message}</Message>}
      {loading ? (
        <Loader />
      ) : counselError ? (
        <Message variant="danger"> {counselError}</Message>
      ) : !succeeded && !successMessage ? (
        <FormContainer>
          <h3>Book a session now</h3>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="mobile">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                type="number"
                placeholder="10 digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="aboutYou">
              <Form.Label>Brief about you</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="write here.."
                value={aboutYou}
                onChange={(e) => setAboutYou(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="issues">
              <Form.Label>General issues </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder="write here.."
                value={issues}
                onChange={(e) => setIssues(e.target.value)}
                required
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
            <p style={{ marginTop: "10px" }}>Total: Rs.{contentItems.counselPrice}</p>
            <Button
              type="submit"
              variant="primary"
              disabled={processing || !stripe}
            >
              {processing?'proceesing':'Book and pay now'}
            </Button>
          </Form>
        </FormContainer>
      ) : (
        <Container style={{marginTop:"30px"}}>
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

export default CounselPaymentScreen;
