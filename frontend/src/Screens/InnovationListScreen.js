import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listInnovations } from '../actions/innovationActions'

const InnovListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const innovationList = useSelector((state) => state.innovationList)
  const { loading, error, innovations } = innovationList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo ) {
      if(userInfo.isAdmin || userInfo.isTechAdmin){
        dispatch(listInnovations())
      }
      
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])


  return (
    <Container className='mt-4'>
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
              <th>Venture</th>
              <th>DATE</th>
              <th>COMPLETED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {innovations.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
            <td>{order.projectname}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isCompleted ? (
                     <i className='fas fa-times' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                
                <td>
                  <LinkContainer to={`/admin/innovation/${order._id}`}>
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

export default InnovListScreen