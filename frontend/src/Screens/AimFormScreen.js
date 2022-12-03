import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { registerAim } from "../actions/aimActions";
import FormContainer from "../components/FormContainer";
import { Form, Button ,Container} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { AIM_REGISTER_RESET } from "../reducers/aimConstants";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

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

const AimFormScreen = ({ location, history }) => {
  const [mobile, setMobile] = useState(null);
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [college, setCollege] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [cardError, setcardError] = useState(null);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const amountType = "university";
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const aimRegister = useSelector((state) => state.aimRegister);
  const { loading, error: aimError, successMessage } = aimRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const contentDetails = useSelector((state) => state.contentDetails);
  const { contentItems } = contentDetails;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setBillingDetails({
        ...billingDetails,
        name: userInfo.name,
        email: userInfo.email,
      });
      dispatch({type:AIM_REGISTER_RESET})
      window.scrollTo(0, 0);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.length !== 10) {
      setMessage("Mobile number should consist 10 digits");
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

      const order = {
        paymentid: paymentIntent.id,
        status: paymentIntent.status,
        receipt_email: paymentIntent.receipt_email,
        mobile,
        enquiry,
        position,
        college,
        price:contentItems.uniPrice
      };
      dispatch(registerAim(order));
      console.log(paymentIntent);
      console.log("successfully paid");
      setMessage("");
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
      {message && <Message variant="danger">{message}</Message>}
      {loading ? (
        <Loader />
      ) : aimError ? (
        <Message variant="danger">{aimError}</Message>
      ) : !succeeded && !successMessage ? (
        <FormContainer>
          <h3>Register and Pay for University Consulting</h3>

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
            <Form.Group controlId="position">
              <Form.Label>position</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="position at institute"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="enquiry">
              <Form.Label>your enquiry</Form.Label>
              <Form.Control
                required
                type="text"
                as="textarea"
                placeholder="write here.."
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="college">
              <Form.Label>college/university</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="college/university"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Label>Card details (credit card or debit card)</Form.Label>
            <CardElement
              className="sr-input sr-card-element"
              options={options}
              onChange={(e) => {
                setcardError(e.error);
                setCardComplete(e.complete);
              }}
            />

            <p style={{ marginTop: "10px" }}>Total: Rs.{contentItems.uniPrice}</p>
            <Button
              type="submit"
              variant="primary"
              disabled={processing || !stripe}
            >
              {processing ? "proceesing" : "register and pay"}
            </Button>
          </Form>
        </FormContainer>
      ) : (
        <Container style={{marginTop:"30px"}}>
          <div className="sr-field-success message">
            <h2 style={{ textAlign: "center" }}>Your payment succeeded</h2>
            <div style={{ textAlign: "center" }}>
              <span style={{ margin: "auto" }}>
                <i
                  class="fa fa-check-circle"
                  aria-hidden="true"
                  style={{ fontSize: "100px", color: "green" }}
                ></i>
              </span>
            </div>
            <h3>
              {successMessage + ",go to your profile to check the registration"}
            </h3>
          </div>
        </Container>
      )}
    </>
  );
};

export default AimFormScreen;
