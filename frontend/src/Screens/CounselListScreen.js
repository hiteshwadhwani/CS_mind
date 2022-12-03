import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCounsels } from "../actions/counselActions";

const CounselListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const counselList = useSelector((state) => state.counselList);
  const { loading, error, counsels } = counselList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      if (userInfo.isAdmin || userInfo.isCounselor) {
        dispatch(listCounsels());
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  return (
    <Container style={{ marginTop: "10px" }}>
      <h1 className="adminthings">Orders</h1>
      <hr/>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>EMAIL</th>
              <th>PAYMENT ID</th>
              <th>COMPLETED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {counsels.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.user.email}</td>
                <td>{order.paymentResult.id}</td>

                <td>
                  {order.isCompleted ? (
                    <i className="fas fa-times" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/admin/counselling/${order._id}`}>
                    <Button variant="light" className="btn-sm">
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
  );
};

export default CounselListScreen;