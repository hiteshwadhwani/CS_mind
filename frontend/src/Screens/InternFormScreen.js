import React, { useState, useEffect } from "react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { Form, Button, Col } from "react-bootstrap";
import { registerInternForm } from "../actions/internFormActions";

const InternFormScreen = ({ history }) => {

    const dispatch=useDispatch();
  const [college, setCollege] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [branch, setBranch] = useState("");
  const [degree, setDegree] = useState("");
  const [year, setYear] = useState("");
  const [hod, setHod] = useState("");
  const [intent, setIntent] = useState("");
  const [skills, setSkills] = useState("");
  const [project, setProject] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const internFormRegister = useSelector((state) => state.internFormRegister);
  const { successMessage, error, loading } = internFormRegister;

  useEffect(() => {
    if (userInfo) {
      window.scrollTo(0, 0);
    } else {
      history.push("/login");
    }
  }, [history, userInfo, successMessage]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const order = {
      project,
      college,
      degree,
      year,
      hod,
      intent,
      skills,
      address,
      mobile,
      branch,
    };
    dispatch(registerInternForm(order));
  };
  return (
    <>
      <FormContainer>
        <h2>Add new intern</h2>
        {successMessage && (
          <Message variant="success">{successMessage}</Message>
        )}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={onSubmitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Addresss</Form.Label>
            <Form.Control
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="your address"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="project">
            <Form.Label>Describe Any Project your work on</Form.Label>
            <Form.Control
              type="text"
              value={project}
              as='textarea'
              onChange={(e) => setProject(e.target.value)}
              placeholder="lessons learned, tech used , results achieved"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="degree">
            <Form.Label>Degree Pursuing</Form.Label>
            <Form.Control
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="qualification"
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="branch">
            <Form.Label>Branch</Form.Label>
            <Form.Control
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="branch"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="college">
            <Form.Label>College/Institution</Form.Label>
            <Form.Control
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="your institution/college"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="mobile">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="mobile number"
              required
            ></Form.Control>

          </Form.Group>

          <Form.Group controlId="year/semester">
            <Form.Label>Year/Semester</Form.Label>
            <Form.Control
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="current year and semester"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="hod">
            <Form.Label>Department H.O.D.</Form.Label>
            <Form.Control
              type="text"
              value={hod}
              onChange={(e) => setHod(e.target.value)}
              placeholder="your department"
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="intent">
            <Form.Label>Intent about the internship</Form.Label>
            <Form.Control
              type="text"
              as='textarea'
              value={intent}
              onChange={(e) => setIntent(e.target.value)}
              placeholder="your intents about this internship"
              required
            ></Form.Control>
            <Form.Group controlId="college">
            <Form.Label>Skill Set</Form.Label>
            <Form.Control
              type="text"
              as='textarea'
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="your skillset"
              required
            ></Form.Control>
          </Form.Group>
          </Form.Group>
          
          <Button type="submit">Submit</Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default InternFormScreen;
