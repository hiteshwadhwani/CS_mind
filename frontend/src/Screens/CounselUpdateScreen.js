import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COUNSEL_COMPLETE_RESET } from "../reducers/counselConstants";
import { getCounselDetails, completeCounsel } from "../actions/counselActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Row, Col, ListGroup, Container } from "react-bootstrap";

export const CounselUpdateScreen = ({ match, history }) => {
  const aimId = match.params.id;
  const dispatch = useDispatch();

  const counselDetails = useSelector((state) => state.counselDetails);
  const { counselItems, loading, error } = counselDetails;

  const counselComplete = useSelector((state) => state.counselComplete);
  const {
    success,
    error: completeError,
    loading: aimLoading,
  } = counselComplete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin || userInfo.isCounselor) {
        if (success) {
          dispatch({ type: COUNSEL_COMPLETE_RESET });
          dispatch(getCounselDetails(aimId));
        } else {
          dispatch(getCounselDetails(aimId));
        }
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, success]);

  const completeAimHandler = () => {
    //f
    dispatch(completeCounsel(counselItems));
  };
  return (
    <Container style={{ marginTop: "20px" }}>
      {aimLoading && <Loader />}
      {completeError && <Message variant="danger">{completeError}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="align-items-center">
          <Col md={12}>
            <h3 className="adminthings">Counselling Details</h3>
            <hr/>
          </Col>
          <Col md={12}>
            {counselItems.isCompleted ? (
              ""
            ) : (
              <Button
                className="my-3"
                onClick={completeAimHandler}
                disabled={loading || aimLoading}
              >
                <i className="fas fa-tick"></i> Mark as Complete
              </Button>
            )}
          </Col>
          <Col>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{counselItems.user.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>mobile: {counselItems.mobile}</ListGroup.Item>
              <ListGroup.Item>email: {counselItems.user.email}</ListGroup.Item>
              <ListGroup.Item>About {counselItems.aboutYou}</ListGroup.Item>

              <ListGroup.Item>issues: {counselItems.issues}</ListGroup.Item>
              <ListGroup.Item>
                filled at: {counselItems.createdAt.substring(0, 10)}
              </ListGroup.Item>

              <ListGroup.Item>
                Completed :{" "}
                {counselItems.isCompleted ? (
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
