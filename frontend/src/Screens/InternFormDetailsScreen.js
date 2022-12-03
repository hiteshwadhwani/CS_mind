import React,{useEffect} from 'react';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup,Container,Row,Col } from "react-bootstrap";
import {getInternDetails} from '../actions/internFormActions';

const InternFormDetailsScreen = ({match,history}) => {
    const internid=match.params.id;
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;



  const internFormDetails=useSelector((state) => state.internFormDetails)
  const {loading,error,internItems}=internFormDetails;

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
        
              window.scrollTo(0,0);  
           dispatch(getInternDetails(internid)); 
        
    }else{
        history.push('/login')
    };
        
  },[history,userInfo])
    return (
        <Container>
      
        {loading ? <Loader />:error?<Message variant="danger">{error}</Message>:(
            <Row className="align-items-center">
            <Col md={12}>
              <h3 className="adminthings">Intern Application Details</h3>
              <hr/>
            </Col>
            <Col>
            <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <h3>{internItems.user.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      mobile: {internItems.mobile}
                    </ListGroup.Item>
                    <ListGroup.Item>
                     address: {internItems.address}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      email: {internItems.user.email}
                    </ListGroup.Item>  
                    <ListGroup.Item>College: {internItems.college}</ListGroup.Item>
                    <ListGroup.Item>
                      Degree: {internItems.degree}
                    </ListGroup.Item>
  
                    <ListGroup.Item>
                      branch: {internItems.branch}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      filled at: {internItems.createdAt.substring(0,10)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Year/Sem: {internItems.year}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      skills: {internItems.skills}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      project: {internItems.project}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      intent: {internItems.intent}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      HOD: {internItems.hod}
                    </ListGroup.Item>
  
                    
                  </ListGroup>
            </Col>
                
          </Row>
        )}
        
      </Container>
    )
}

export default InternFormDetailsScreen
