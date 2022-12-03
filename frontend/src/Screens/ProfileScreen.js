import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { Form, Button, Row, Col, Table, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../reducers/userConstants";
import { listMyAims } from "../actions/aimActions";
import { listMyInnovations } from "../actions/innovationActions";
import { listMyCounsels } from "../actions/counselActions";
import { listMyCommitments } from "../actions/commitmentActions";
import { AIM_LIST_MY_RESET } from "../reducers/aimConstants";
import {LinkContainer } from 'react-router-bootstrap';
import {listMySharpens} from '../actions/sharpenActions.js';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const aimListMy = useSelector((state) => state.aimListMy);
  const { loading: loadingAims, error: errorAims, aimItems } = aimListMy;

  const innovationListMy = useSelector((state) => state.innovationListMy);
  const {
    loading: loadingInnovations,
    error: errorInnovations,
    innovationItems,
  } = innovationListMy;

  const sharpenListMy=useSelector((state)=>state.sharpenListMy);
  const {
    loading:sharpenLoading,
    error:sharpenError,
    sharpenItems
  }= sharpenListMy;
  
  const counselListMy = useSelector((state) => state.counselListMy);
  const {
    loading: loadingCounsels,
    error: errorCounsels,
    counselItems,
  } = counselListMy;

  const commitmentListMy = useSelector((state) => state.commitmentListMy);
  const {
    loading: loadingCommitments,
    error: errorCommitments,
    commitmentItems,
  } = commitmentListMy;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyInnovations());
        dispatch(listMyAims());
        dispatch(listMyCounsels());
        dispatch(listMyCommitments());
        dispatch(listMySharpens());
      } else {
        setName(user.name);
        setEmail(user.email);
        setAddress(user.address);
        setProfession(user.profession);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          name,
          email,
          password,
          address,
          profession,
        })
      );
    }
  };
  return (
    <Container className="mt-4">
      <h2 className="adminthings ">Welcome to Your Dashboard, {userInfo && userInfo.name}.</h2>
            <hr/>
    <Row>
      <Col md={3}>
        <h2 className="adminthings">User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}

        {success && <Message variant="success">Profile Updated</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : user.googleId ? (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Enter Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="profession">
              <Form.Label>Select your profession</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              >
                <option>professional</option>
                <option>student</option>
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Enter Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="profession">
              <Form.Label>Select your profession</Form.Label>
              <Form.Control
                as="select"
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
              >
                <option>professional</option>
                <option>student</option>
              </Form.Control>
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
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </Col>
      
      <Col md={9}>
        
        <Row>
          
          {loadingAims ? (
            <Loader />
          ) : errorAims ? (
            <Message variant="danger">{errorAims}</Message>
          ) : aimItems.length===0 ?'':(
            <>
            <h2 className="adminthings">University Consulting History</h2>
          <hr/>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                </tr>
              </thead>
              <tbody>
                {aimItems.map((aim) => (
                  <tr key={aim._id}>
                    <td>{aim._id}</td>
                    <td>{aim.createdAt.substring(0, 10)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          )}
        </Row>
        
        
        <Row>
        
          <>
          
          {loadingInnovations ? (
            <Loader />
          ) : errorInnovations ? (
            <Message variant="danger">{errorInnovations}</Message>
          ) : innovationItems.length===0 ? '':(
            <>
            <h2 className="adminthings">Technology Innovation History</h2>
          <hr/>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>PROJECT NAME</th>
                </tr>
              </thead>
              <tbody>
                {innovationItems.map((aim) => (
                  <tr key={aim._id}>
                    <td>{aim._id}</td>
                    <td>{aim.createdAt.substring(0, 10)}</td>
                    <td>{aim.projectname}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          )}
          </>
        
        
          <>
          
          {loadingCounsels ? (
            <Loader />
          ) : errorCounsels ? (
            <Message variant="danger">{errorCounsels}</Message>
          ) : counselItems.length===0?'':(
            <>
            <h2 className="adminthings">Counselling/Mentoring History</h2>
          <hr/>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {counselItems.map((aim) => (
                  <tr key={aim._id}>
                    <td>{aim._id}</td>
                    <td>{aim.createdAt.substring(0, 10)}</td>
                    <td>Rs. {aim.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          )}
          </>
        
        
          <>
          
          {loadingCommitments ? (
            <Loader />
          ) : errorCommitments ? (
            <Message variant="danger">{errorCommitments}</Message>
          ) : commitmentItems.length===0?'':(
            <>
            <h2 className="adminthings">Signature and Beyond History</h2>
          <hr/>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>CALLIGRAPHER COMPLETED</th>
                  <th>READER COMPLETED</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {commitmentItems.map((aim) => (
                  <tr key={aim._id}>
                    <td>{aim._id}</td>
                    <td>{aim.createdAt.substring(0, 10)}</td>
                    <td>Rs. {aim.price}</td>
                    <td>
                      {aim.isCompletedByCal ? (
                        <i
                          className="fas fa-times"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {aim.isCompletedByReader ? (
                        <i
                          className="fas fa-times"
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                      <td>{!aim.isCompletedByReader ?'not completed yet!': (
                        <LinkContainer to={`/user/commitment/${aim._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                      )}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          )}
          </>
        
        
          <>
         
          {sharpenLoading ? (
            <Loader />
          ) : sharpenError ? (
            <Message variant="danger">{errorCounsels}</Message>
          ) : sharpenItems.length===0?'':(
            <>
            <h2 className="adminthings">SHARPEN THE SKILLS History</h2>
            <hr/>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                </tr>
              </thead>
              <tbody>
               {sharpenItems.map((aim) => (
                  <tr key={aim._id}>
                    <td>{aim._id}</td>
                    <td>{aim.createdAt.substring(0, 10)}</td>
                    <td>Rs. {aim.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            </>
          )}
          </>
        
        </Row>
      </Col>
    </Row>
    </Container>
  );
};

export default ProfileScreen;
