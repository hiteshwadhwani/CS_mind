import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCalOrders } from "../actions/commitmentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, Table, Button, Container } from "react-bootstrap";

const CalDashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const calOrders = useSelector((state) => state.calOrders);
  const { calOrders: calItems, loading, error } = calOrders;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isCal) {
      window.scrollTo(0, 0);
      dispatch(getCalOrders(userInfo._id));
    } else {
      history.push("/login");
    }
  }, [history, userInfo]);
  return (
    <>
      <Container>
        <Row>
          <Col md={10}>
            <h3 className="adminthings">My tasks</h3>
            <hr/>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>COMPLETED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {calItems.map((cal) => (
                    <tr key={cal._id}>
                      <td>{cal.user && cal.user.name}</td>
                      <td>{cal.createdAt.substring(0, 10)}</td>
                      <td>
                        {cal.isCompletedByCal ? (
                          <i
                            className="fas fa-times"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>

                      <td>
                        <LinkContainer to={`/cal/commitment/${cal._id}`}>
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
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CalDashboardScreen;
