import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { registerAim } from "../actions/aimActions";
import FormContainer from "../components/FormContainer";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import {Link} from 'react-router-dom';

const AimNoFormScreen = ({ location, history }) => {
    const [mobile, setMobile] = useState(null);
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [college, setCollege] = useState("");
  const [enquiry, setEnquiry] = useState("");
  const [succeeded, setSucceeded] = useState(false);


  const dispatch = useDispatch();
  const aimRegister = useSelector((state) => state.aimRegister);
  const { loading, error, successMessage } = aimRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const contentDetails = useSelector((state) => state.contentDetails);
  const { contentItems } = contentDetails;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");

    }else {
      window.scrollTo(0, 0);
    }
  }, [history, userInfo, redirect,successMessage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!mobile || mobile.length !== 10) {
      setMessage("Mobile number should consist 10 digits");
      return;
    } 
      const order = {
        paymentid: 'none',
        status: 'no payment',
        receipt_email: userInfo.email,
        mobile,
        enquiry,
        position,
        college,
        price:0
      };
      dispatch(registerAim(order));
      
    
    
  };
  
    return (
        <>
          <FormContainer>
           {loading && <Loader/>} 
           {message && <Message variant='info'>{message}</Message>}  
          {error && <Message variant="danger">{error}</Message>}
      {successMessage && <Message variant="danger">{successMessage}</Message>}   
          <h3>Register for University Consulting</h3>
           <Link to='/aim/form'><button className='btn btn-primary'>Payment Page</button></Link>     
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
            


            <Button
              type="submit"
              variant="primary"
              
            >
              register
            </Button>
          </Form>
        </FormContainer>  
        </>
    )
}

export default AimNoFormScreen
