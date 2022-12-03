import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listSharpens } from '../actions/sharpenActions'
import { SHARPEN_LIST_MY_RESET } from '../reducers/sharpenConstants'

const SharpenListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const sharpenList = useSelector((state) => state.sharpenList)
  const { loading, error, sharpens } = sharpenList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo ) {
      if(userInfo.isAdmin || userInfo.isTrainer)
      {
      dispatch({type:SHARPEN_LIST_MY_RESET})
      dispatch(listSharpens())
      window.scrollTo(0,0);
      }else{
        history.push('/login')  
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
              <th>NAMNE</th>
              <th>DATE</th>
              <th>COMPLETED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sharpens.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  {order.isCompleted ? (
                     <i className='fas fa-times' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                
                <td>
                  <LinkContainer to={`/admin/sharpentheskills/${order._id}`}>
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

export default SharpenListScreen