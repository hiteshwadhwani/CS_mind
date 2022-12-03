import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommitmentDetails } from "../actions/commitmentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Image, Row, Col, ListGroup, Button, Form } from "react-bootstrap";

const UserCommitmentScreen = ({ match, history }) => {
  const commitmentId = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const commitmentDetails = useSelector((state) => state.commitmentDetails);
  const { commitmentItems, loading, error } = commitmentDetails;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }else{
      dispatch(getCommitmentDetails(commitmentId))
    }
  }, [history, userInfo, commitmentId]);
  return (<>
     {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) 
       : (
        <Col md={12}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{commitmentItems.user.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>email: {commitmentItems.user.email}</ListGroup.Item>
            <ListGroup.Item>About: {commitmentItems.aboutYou}</ListGroup.Item>

            <ListGroup.Item>
              Family Background: {commitmentItems.family}
            </ListGroup.Item>
            <ListGroup.Item>
              Variations: {commitmentItems.variations}
            </ListGroup.Item>
            <ListGroup.Item>
              Birth Details: {commitmentItems.dobtimeplace}
            </ListGroup.Item>
            <ListGroup.Item>
              aspirations: {commitmentItems.aspirations}
            </ListGroup.Item>
            <ListGroup.Item>
              filled at: {commitmentItems.createdAt.substring(0, 10)}
            </ListGroup.Item>
            <ListGroup.Item>
              Calligrapher :{" "}
              {commitmentItems.calligrapher ? (
                <span> {commitmentItems.calligrapher.name}</span>
              ) : (
                "none"
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              Reader :{" "}
              {commitmentItems.reader ? (
                <span> {commitmentItems.reader.name}</span>
              ) : (
                "none"
              )}
            </ListGroup.Item>
            
           
              
              {commitmentItems.images[0] && (
                   <ListGroup.Item>
                      image :{" "} 
                      <Image
                  src={`https://csmindmock.herokuapp.com${commitmentItems.images[0]}`}
                /> 
                   </ListGroup.Item>
               ) }
               {commitmentItems.images[1] && (
                   <ListGroup.Item>
                      image :{" "} 
                      <Image
                  src={`https://csmindmock.herokuapp.com${commitmentItems.images[0]}`}
                /> 
                   </ListGroup.Item>
               ) }
               {commitmentItems.images[2] && (
                   <ListGroup.Item>
                      image :{" "} 
                      <Image
                  src={`https://csmindmock.herokuapp.com${commitmentItems.images[0]}`}
                /> 
                   </ListGroup.Item>
               ) }
               {commitmentItems.images[3] && (
                   <ListGroup.Item>
                      image :{" "} 
                      <Image
                  src={`https://csmindmock.herokuapp.com${commitmentItems.images[0]}`}
                /> 
                   </ListGroup.Item>
               ) }
            {commitmentItems.images[4] && (
                   <ListGroup.Item>
                      image :{" "} 
                      <Image
                  src={`https://csmindmock.herokuapp.com${commitmentItems.images[0]}`}
                /> 
                   </ListGroup.Item>
               ) }
            
          </ListGroup>
        </Col>)}
  </>);
};

export default UserCommitmentScreen;
