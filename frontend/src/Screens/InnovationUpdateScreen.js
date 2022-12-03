import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { INNOVATION_COMPLETE_RESET } from "../reducers/innovationConstants";
import { getInnovationDetails,completeInnovation } from "../actions/innovationActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Button, Row, Col,ListGroup, Container } from "react-bootstrap";

export const InnovUpdateScreen = ({ match, history }) => {
  const innovId = match.params.id;
  const dispatch = useDispatch();

  const innovationDetails = useSelector((state) => state.innovationDetails);
  const { innovationItems, loading, error } = innovationDetails;

  const innovationComplete = useSelector((state) => state.innovationComplete);
  const { success, error: completeError,loading:aimLoading } = innovationComplete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
        history.push("/login");
      
    } else if(success){
        dispatch({type:INNOVATION_COMPLETE_RESET})
        dispatch(getInnovationDetails(innovId));
    }else{
        dispatch(getInnovationDetails(innovId));
    }
  }, [dispatch, userInfo, history,success]);

  const completeInnovHandler = () => {
    //f
    dispatch(completeInnovation(innovationItems))
  };
  return (
    <Container>
      
      {aimLoading && <Loader/>}
      {completeError  && <Message variant="danger">{completeError}</Message>}
      {loading ? <Loader />:error?<Message variant="danger">{error}</Message>:(
          <Row className="align-items-center">
          <Col md={12}>
            <h3 className="adminthings">Innovation Details</h3>
            <hr/>
          </Col>
          <Col md={12} >
            {innovationItems.isCompleted?'':(
              <Button className="my-3" onClick={completeInnovHandler}  disabled={loading || aimLoading}>
                <i className="fas fa-tick"></i> Mark as Complete
              </Button>)
            }
          </Col>
          <Col>
          <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{innovationItems.user.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    project name : {innovationItems.projectname}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    mobile: {innovationItems.mobile}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    email: {innovationItems.user.email}
                  </ListGroup.Item>  
                  
                  <ListGroup.Item>
                    filled at: {innovationItems.createdAt.substring(0,10)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    skills : {innovationItems.skills}
                  </ListGroup.Item>
                  <ListGroup.Item>
                     professional details: {innovationItems.professionalDetails}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Completed  :{" "}  
                    {innovationItems.isCompleted?<i className='fas fa-times' style={{ color: 'green' }}></i>:
                    <i className='fas fa-times' style={{ color: 'red' }}></i>}
                  </ListGroup.Item>
                </ListGroup>
          </Col>
              
        </Row>
      )}
      
    </Container>
  );
};
