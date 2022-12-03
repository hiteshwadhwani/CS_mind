import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AIM_COMPLETE_RESET } from "../reducers/aimConstants";
import { getAimDetails,completeAim } from "../actions/aimActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Row, Col,ListGroup, Container } from "react-bootstrap";

export const AimUpdateScreen = ({ match, history }) => {
  const aimId = match.params.id;
  const dispatch = useDispatch();

  const aimDetails = useSelector((state) => state.aimDetails);
  const { aimItems, loading, error } = aimDetails;

  const aimComplete = useSelector((state) => state.aimComplete);
  const { success, error: completeError,loading:aimLoading } = aimComplete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
        history.push("/login");
      
    } else if(success){
        dispatch({type:AIM_COMPLETE_RESET})
        dispatch(getAimDetails(aimId));

    }else{
                dispatch(getAimDetails(aimId))
                window.scrollTo(0,0);
    }
  }, [dispatch, userInfo, history,success]);

  const completeAimHandler = () => {
    //f
    dispatch(completeAim(aimItems))
  };
  return (
    <Container>
      
      {aimLoading && <Loader/>}
      {completeError  && <Message variant="danger">{completeError}</Message>}
      {loading ? <Loader />:error?<Message variant="danger">{error}</Message>:(
          <Row className="align-items-center">
          <Col md={12}>
            <h3 className="adminthings">Aim Details</h3>
            <hr/>
          </Col>
          <Col md={12} >
            {aimItems.isCompleted?'':(
              <Button className="my-3" onClick={completeAimHandler}  disabled={loading || aimLoading}>
                <i className="fas fa-tick"></i> Mark as Complete
              </Button>)
            }
          </Col>
          <Col>
          <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{aimItems.user.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    mobile: {aimItems.mobile}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    email: {aimItems.user.email}
                  </ListGroup.Item>  
                  <ListGroup.Item>College {aimItems.college}</ListGroup.Item>
                  <ListGroup.Item>
                    positon: {aimItems.position}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    enquiry: {aimItems.enquiry}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    filled at: {aimItems.createdAt.substring(0,10)}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    Completed  :{" "}  
                    {aimItems.isCompleted?<i className='fas fa-times' style={{ color: 'green' }}></i>:
                    <i className='fas fa-times' style={{ color: 'red' }}></i>}
                  </ListGroup.Item>
                </ListGroup>
          </Col>
              
        </Row>
      )}
      
    </Container>
  );
};
