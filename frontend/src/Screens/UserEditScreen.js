import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../reducers/userConstants";

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [profession, setProfession] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCal,setIsCal]=useState(false);
  const [isReader,setIsReader]=useState(false);
  const [isTrainer,setIsTrainer]=useState(false);
  const [isCommitmentAdmin,setCommitmentAdmin]=useState(false);
  const [isCounselor,setCounselor]=useState(false);
  const [isTechAdmin,setTechAdmin]=useState(false);
  const [isAcademic,setAcademic]=useState(false);
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setAddress(user.address);
        setProfession(user.profession);
        setIsCal(user.isCal)
        setIsReader(user.isReader);
        setCommitmentAdmin(user.isCommitmentAdmin);
        setIsTrainer(user.isTrainer);
        setAcademic(user.isAcademic);
        setCounselor(user.isCounselor);
        setTechAdmin(user.isTechAdmin);
      }
    }
  }, [dispatch, history, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin,address,profession,isCal,isReader,isCommitmentAdmin,isTrainer,isTechAdmin,isCounselor,isAcademic }));
  };

  return (
    <Container>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1 className="adminthings">Edit User</h1>
        <hr/>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
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
            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="iscommitadmin">
              <Form.Check
                type="checkbox"
                label="Is Commitment Admin"
                checked={isCommitmentAdmin}
                onChange={(e) => setCommitmentAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            
            <Form.Group controlId="iscal">
              <Form.Check
                type="checkbox"
                label="Is Calligrpher"
                checked={isCal}
                onChange={(e) => setIsCal(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="isreader">
              <Form.Check
                type="checkbox"
                label="Is Reader"
                checked={isReader}
                onChange={(e) => setIsReader(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="istrainer">
              <Form.Check
                type="checkbox"
                label="Is Trainer"
                checked={isTrainer}
                onChange={(e) => setIsTrainer(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="isAcademic">
              <Form.Check
                type="checkbox"
                label="Is Academic Admin"
                checked={isAcademic}
                onChange={(e) => setAcademic(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="isTechAdmin">
              <Form.Check
                type="checkbox"
                label="Is Tech Innovation Admin"
                checked={isTechAdmin}
                onChange={(e) => setTechAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group controlId="isCounselor">
              <Form.Check
                type="checkbox"
                label="Is Counsel Admin"
                checked={isCounselor}
                onChange={(e) => setCounselor(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default UserEditScreen;