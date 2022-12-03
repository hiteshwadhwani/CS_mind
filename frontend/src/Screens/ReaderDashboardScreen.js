import React,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {getReaderOrders} from '../actions/commitmentActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import {LinkContainer} from 'react-router-bootstrap'
import {Row,Col,Table,Button, Container} from 'react-bootstrap';

const ReaderDashboardScreen = ({history}) => {
    const dispatch=useDispatch()  

  const readerOrders=useSelector((state)=>state.readerOrders)
  const {readerOrders:readerItems,loading,error}=readerOrders;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(()=>{
    if(userInfo && userInfo.isReader){
      dispatch(getReaderOrders(userInfo._id))
        
    }else{
      history.push('/login')
    }
},[history,userInfo])
    return (
      <Container>
        <Row>
      <Col md={10}>
        <h3 className="adminthings">My tasks</h3>
        <hr/>
            {loading ? <Loader/> : error?<Message variant='danger'>{error}</Message>:(
                <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>COMPLETED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {readerItems.map((reader) => (
                    <tr key={reader._id}>
                     
                      <td>{reader.user && reader.user.name}</td>
                      <td>{reader.createdAt.substring(0, 10)}</td>
                      <td>
                        {reader.isCompletedByReader ? (
                           <i className='fas fa-times' style={{ color: 'green' }}></i>
                        ) : (
                          <i className='fas fa-times' style={{ color: 'red' }}></i>
                        )}
                      </td>
                      
                      <td>
                        <LinkContainer to={`/reader/commitment/${reader._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
      </Col>
  </Row>
  </Container>
    )
}

export default ReaderDashboardScreen
