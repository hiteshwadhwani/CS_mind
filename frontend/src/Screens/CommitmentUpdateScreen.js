import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CAL_ASSIGNED_RESET,
  COMMITMENT_COMPLETE_RESET,
  READER_ASSIGNED_RESET,
} from "../reducers/commitmentConstants";
import {
  getCommitmentDetails,
  completeCommitment,
  assignCal,
  assignReader,
} from "../actions/commitmentActions";
import { listCals, listReaders } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Form,
  Table,
  Image,
  Container,
} from "react-bootstrap";
import { USER_CAL_RESET, USER_READER_RESET } from "../reducers/userConstants";

export const CommitmentUpdateScreen = ({ match, history }) => {
  const aimId = match.params.id;
  const dispatch = useDispatch();
  const [calId, setCalId] = useState("");
  const [readerId, setReaderId] = useState("");
  const [processing, setProcessing] = useState(false);

  const commitmentDetails = useSelector((state) => state.commitmentDetails);
  const { commitmentItems, loading, error } = commitmentDetails;

  const commitmentComplete = useSelector((state) => state.commitmentComplete);
  const {
    success,
    error: completeError,
    loading: commitmentLoading,
  } = commitmentComplete;

  const calAssigned = useSelector((state) => state.calAssigned);
  const {
    success: calSuccess,
    error: calAssignError,
    loading: calAssignLoading,
  } = calAssigned;

  const readerAssigned = useSelector((state) => state.readerAssigned);
  const {
    success: readerSuccess,
    error: readerAssignError,
    loading: readerAssignLoading,
  } = readerAssigned;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userCalList = useSelector((state) => state.userCalList);
  const { error: calError, loading: calLoading, calligraphers } = userCalList;

  const userReaderList = useSelector((state) => state.userReaderList);
  const {
    error: readerError,
    loading: readerLoading,
    readers,
  } = userReaderList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } 
  else if(userInfo.isAdmin || userInfo.isCommitmentAdmin){
    if (success || calSuccess || readerSuccess) {
      dispatch({ type: CAL_ASSIGNED_RESET });
      dispatch({ type: READER_ASSIGNED_RESET });
      dispatch({ type: COMMITMENT_COMPLETE_RESET });
      dispatch(getCommitmentDetails(aimId));
      dispatch(listReaders());
      dispatch(listCals());
    } else {
      dispatch({ type: USER_CAL_RESET });
      dispatch({ type: USER_READER_RESET });
      dispatch(getCommitmentDetails(aimId));
      dispatch(listReaders());
      dispatch(listCals());
    }
        
     }
     
      
  }, [dispatch, userInfo, history, success, aimId, readerSuccess, calSuccess]);

  const completeAimHandler = () => {
    //f
    dispatch(completeCommitment(commitmentItems));
  };
  const addReader = (e) => {
    e.preventDefault();
    const order = { id: commitmentItems._id, readerid: readerId };
    dispatch(assignReader(order));
  };
  const addCalligrapher = (e) => {
    e.preventDefault();
    const order = { id: commitmentItems._id, calid: calId };
    dispatch(assignCal(order));
  };
  return (
    <Container>
      {calLoading || (readerLoading && <Loader />)}
      {readerError && <Message variant="danger">{readerError}</Message>}
      {calError && <Message variant="danger">{calError}</Message>}
      {commitmentLoading && <Loader />}
      {completeError && <Message variant="danger">{completeError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="align-items-center">
          <Col md={12}>
            <h3 className="adminthings">Commitment Details</h3>
            <hr/>
          </Col>
          <Col md={12}>
            {commitmentItems.isCompleted ? (
              ""
            ) : (
              <Button
                className="my-3"
                onClick={completeAimHandler}
                disabled={loading || commitmentLoading}
              >
                <i className="fas fa-tick"></i> Mark as Complete
              </Button>
            )}
          </Col>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{commitmentItems.user.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>mobile: {commitmentItems.mobile}</ListGroup.Item>
              <ListGroup.Item>
                email: {commitmentItems.user.email}
              </ListGroup.Item>
              <ListGroup.Item>About {commitmentItems.aboutYou}</ListGroup.Item>

              <ListGroup.Item>
                aspirations: {commitmentItems.aspirations}
              </ListGroup.Item>
              <ListGroup.Item>
                filled at: {commitmentItems.createdAt.substring(0, 10)}
              </ListGroup.Item>
              <ListGroup.Item>
                Calligrapher :{" "}
                {commitmentItems.calligrapher ? (
                  <span> {commitmentItems.calligrapher.name}</span>
                ) : (
                  "none"
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Reader :{" "}
                {commitmentItems.reader ? (
                  <span> {commitmentItems.reader.name}</span>
                ) : (
                  "none"
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Completed :{" "}
                {commitmentItems.isCompleted ? (
                  <i className="fas fa-times" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                image1 :{" "}
                {commitmentItems.images[0] ? (
                  <Image
                    src={commitmentItems.images[0]}
                  />
                ) : (
                  "no image"
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                image2 :{" "}
                {commitmentItems.images[1] ? (
                  <Image
                    src={commitmentItems.images[1]}
                  />
                ) : (
                  "no image"
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                image3 :{" "}
                {commitmentItems.images[2] ? (
                  <Image
                    src={commitmentItems.images[2]}
                  />
                ) : (
                  "no image"
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                image4 :{" "}
                {commitmentItems.images[3] ? (
                  <Image
                    src={commitmentItems.images[3]}
                  />
                ) : (
                  "no image"
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                image5 :{" "}
                {commitmentItems.images[4] ? (
                  <Image
                    src={commitmentItems.images[4]}
                  />
                ) : (
                  "no image"
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            {calligraphers && calligraphers.length > 0 ? (
              calAssignLoading ? (
                <Loader />
              ) : (
                <FormContainer>
                  {calAssignError && (
                    <Message variant="danger">{calAssignError}</Message>
                  )}
                  <Form onSubmit={addCalligrapher}>
                    <Form.Group controlId="calligrapher">
                      <Form.Label>
                        <strong>Select calligrapher</strong>
                      </Form.Label>
                      <Form.Control
                        as="input"
                        type="text"
                        onChange={(e) => setCalId(e.target.value)}
                        placeholder="paste id"
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </Form>
                </FormContainer>
              )
            ) : (
              ""
            )}
          </Col>
          <Col md={4}>
            {readers && readers.length > 0 ? (
              readerAssignLoading ? (
                <Loader />
              ) : (
                <FormContainer>
                  {readerAssignError && (
                    <Message variant="danger">{readerAssignError}</Message>
                  )}
                  <Form onSubmit={addReader}>
                    <Form.Group controlId="reader">
                      <Form.Label>
                        <strong>Select reader</strong>
                      </Form.Label>
                      <Form.Control
                        as="input"
                        type="text"
                        value={readerId}
                        placeholder="paste reader id only"
                        onChange={(e) => setReaderId(e.target.value)}
                        required
                      ></Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary">
                      Update
                    </Button>
                  </Form>
                </FormContainer>
              )
            ) : (
              ""
            )}
          </Col>
          <Col md={12}>
            <h3>Feedback</h3>
            {commitmentItems.comments.map((comment) => (
              <>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>{comment.name}</strong>
                    <p>{comment.createdAt.substring(0, 10)}</p>
                    <p>{comment.comment}</p>
                  </ListGroup.Item>
                </ListGroup>
                <hr />
              </>
            ))}
          </Col>

          {calligraphers && calligraphers.length > 0 ? (
            <Col md={9}>
              <h3>Calligraphers List</h3>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                  </tr>
                </thead>
                <tbody>
                  {calligraphers.map((cal) => (
                    <tr key={cal._id}>
                      <td>{cal._id}</td>
                      <td>{cal.name}</td>
                      <td>{cal.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          ) : (
            <h3>No Calligraphers</h3>
          )}

          {readers && readers.length > 0 ? (
            <Col md={9}>
              <h3>Readers List</h3>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                  </tr>
                </thead>
                <tbody>
                  {readers.map((cal) => (
                    <tr key={cal._id}>
                      <td>{cal._id}</td>
                      <td>{cal.name}</td>
                      <td>{cal.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          ) : (
            <h3>No Readers</h3>
          )}
        </Row>
      )}
    </Container>
  );
};
