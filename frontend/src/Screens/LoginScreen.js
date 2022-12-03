import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { login, getGoogleUserInfo } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

const LoginScreen = ({ match, location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  console.log(history);
  useEffect(() => {
    if (userInfo && userInfo.googleId) {
      history.push(redirect);
    } else if (userInfo) {
      history.goBack();
    }
  }, [history, userInfo, redirect]);
  useEffect(() => {
    if (!userInfo) {
      dispatch(getGoogleUserInfo());
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line
  }, []);

  const signInWithGoogleHandler = (e) => {
    e.preventDefault();
    window.location.href = `/api/auth/google?redirect=${redirect}`;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <FormContainer>
      <h2>Sign In</h2>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" style={{ marginRight: "5px" }}>
          Sign In
        </Button>

        <Button
          type="button"
          variant="danger"
          onClick={signInWithGoogleHandler}
        >
          <i className="fab fa-google left"> Sign In With Google</i>
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link
            to={redirect ? `/resetmail?redirect=${redirect}` : "/resetmail"}
          >
            Forgot password
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
