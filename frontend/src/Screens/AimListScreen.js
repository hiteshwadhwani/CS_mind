import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listAims } from '../actions/aimActions'
import { AIM_LIST_MY_RESET } from '../reducers/aimConstants'

const AimListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const aimList = useSelector((state) => state.aimList)
  const { loading, error, aims } = aimList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      if(userInfo.isAdmin || userInfo.isAcademic){
        dispatch({type:AIM_LIST_MY_RESET})
      dispatch(listAims())
      window.scrollTo(0,0);
      }
      
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <Container style={{marginTop:"30px"}}>
      <h1 className="adminthings">Orders</h1>
      <hr/>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>COMPLETED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {aims.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>

                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.paymentResult.id}</td>
                <td>{order.price}</td>
                <td>
                  {order.isCompleted ? (
                     <i className='fas fa-times' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                
                <td>
                  <LinkContainer to={`/admin/aim/${order._id}`}>
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
    </Container>
  )
}

export default AimListScreen