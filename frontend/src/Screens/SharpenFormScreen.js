import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { registerSharpen } from "../actions/sharpenActions";
import FormContainer from "../components/FormContainer";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
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

const SharpenFormScreen = ({ location, history }) => {
  const [mobile, setMobile] = useState(null);
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [message, setMessage] = useState("");
  const [experience, setExperience] = useState("");
  const [aboutYou, setAbout] = useState("");
  const [intended, setIntended] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [cardError, setcardError] = useState(null);
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    name: "",
  });
  const amountType = "sharp";
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const sharpenRegister = useSelector((state) => state.sharpenRegister);
  const { loading, error: sharpenError, successMessage } = sharpenRegister;
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
      window.scrollTo(0, 0);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setName("Product Development");
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
        qualification,
        experience,
        intended,
        aboutYou,
        name: "Product Development",
        price: contentItems.sharpPrice,
      };
      console.log(order);
      dispatch(registerSharpen(order));
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
      ) : sharpenError ? (
        <Message variant="danger">{sharpenError}</Message>
      ) : !succeeded && !successMessage ? (
        <FormContainer>
          <h3>Register and Pay for the Program</h3>

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
            <Form.Group controlId="qualifications">
              <Form.Label>qualification</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="your highest qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="experience">
              <Form.Label>experience</Form.Label>
              <Form.Control
                required
                type="text"
                as="textarea"
                placeholder="write here.."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="interested">
              <Form.Label>Interested in Venture/Product Development</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="yes/no"
                value={intended}
                onChange={(e) => setIntended(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="about you">
              <Form.Label>Brief about yourself</Form.Label>
              <Form.Control
                required
                type="text"
                as="textarea"
                placeholder="write here..."
                value={aboutYou}
                onChange={(e) => setAbout(e.target.value)}
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

            <p style={{ marginTop: "10px" }}>
              Total: Rs.{contentItems.sharpPrice}
            </p>
            <Button
              type="submit"
              variant="primary"
              disabled={processing || !stripe}
            >
              {processing ? "proceesing" : "register and pay"}
            </Button>
          </Form>
          <p className="text-justify mt-2">
            Disclaimer : The participants registered for the program have to
            attend the sessions as per schedule declared .Sessions can be
            rescheduled for unforseen incidences common to all. Participants are
            free to interact with us for ther inquisitiveness and encouraged to
            work with us for their endeavours.Study material is the sole. CSMIND
            IPR. Cancellation from the program is admissible one week before the
            commencement of the program . 50 percent refund of fee will be
            processed seperately .Changing of sessions could be endorsed in
            extreme situations ,and will be the decision of the team.
          </p>
        </FormContainer>
      ) : (
        <Container style={{ marginTop: "20px" }}>
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

export default SharpenFormScreen;
