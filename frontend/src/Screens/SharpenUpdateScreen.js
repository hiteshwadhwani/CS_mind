import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHARPEN_COMPLETE_RESET } from "../reducers/sharpenConstants";
import { getSharpenDetails, completeSharpen } from "../actions/sharpenActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Row, Col, ListGroup, Container } from "react-bootstrap";

export const SharpenUpdateScreen = ({ match, history }) => {
  const aimId = match.params.id;
  const dispatch = useDispatch();

  const sharpenDetails = useSelector((state) => state.sharpenDetails);
  const { sharpenItems, loading, error } = sharpenDetails;

  const sharpenComplete = useSelector((state) => state.sharpenComplete);
  const {
    success,
    error: completeError,
    loading: sharpenLoading,
  } = sharpenComplete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin || userInfo.isTrainer) {
        if (success) {
          dispatch({ type: SHARPEN_COMPLETE_RESET });
          dispatch(getSharpenDetails(aimId));
        } else {
          dispatch(getSharpenDetails(aimId));
          window.scrollTo(0, 0);
        }
      
      }
      
    }else{
      history.push('/login');
    }    
  }, [dispatch, userInfo, history, success]);

  const completeSharpenHandler = () => {
    //f
    dispatch(completeSharpen(sharpenItems));
  };
  return (
    <Container>
      {sharpenLoading && <Loader />}
      {completeError && <Message variant="danger">{completeError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="align-items-center">
          <Col md={12}>
            <h3 className="adminthings">Shapren The Skills Details</h3>
            <hr/>
          </Col>
          <Col md={12}>
            {sharpenItems.isCompleted ? (
              ""
            ) : (
              <Button
                className="my-3"
                onClick={completeSharpenHandler}
                disabled={loading || sharpenLoading}
              >
                <i className="fas fa-tick"></i> Mark as Complete
              </Button>
            )}
          </Col>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{sharpenItems.user.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>mobile: {sharpenItems.mobile}</ListGroup.Item>
              <ListGroup.Item>email: {sharpenItems.user.email}</ListGroup.Item>
              <ListGroup.Item>
                experience {sharpenItems.experience}
              </ListGroup.Item>
              <ListGroup.Item>
                Interested in development: {sharpenItems.intended}
              </ListGroup.Item>

              <ListGroup.Item>brief: {sharpenItems.aboutYou}</ListGroup.Item>
              <ListGroup.Item>
                filled at: {sharpenItems.createdAt.substring(0, 10)}
              </ListGroup.Item>

              <ListGroup.Item>
                Completed :{" "}
                {sharpenItems.isCompleted ? (
                  <i className="fas fa-times" style={{ color: "green" }}></i>
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }}></i>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </Container>
  );
};
