import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommitmentDetails,selectByReader } from "../actions/commitmentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { Image, Row, Col, ListGroup, Button, Form, Container } from "react-bootstrap";
import FormContainer from "../components/FormContainer";


const ReaderDetailsScreen = ({ match, history }) => {
  const commitmentId = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [comment,setComment]=useState('');
  const [images, setImage] = useState([]);
  
  const [disabled, setDisabled] = useState(false);
 
  const commitmentDetails = useSelector((state) => state.commitmentDetails);
  const { commitmentItems, loading, error } = commitmentDetails;

  const readerSelect = useSelector((state) => state.readerSelect);
  const { loading:selectLoading,error:selectError,success } = readerSelect;

  const commentAdd = useSelector((state) => state.commentAdd);
  const { loading:commentLoading,error:commentError,successMessage } = commentAdd;
  useEffect(() => {
    if (userInfo && userInfo.isCal) {
      if(success){
        dispatch(getCommitmentDetails(commitmentId));
        
      }else{
        dispatch(getCommitmentDetails(commitmentId))
      }
      
    }else{
      history.push("/login");
    } 
  }, [history, userInfo, commitmentId,success,successMessage]);
  const submithandler=(e)=>{
      e.preventDefault()
      console.log(images)
      const order={
        images:images,
        readerid:userInfo._id,
        id:commitmentId
      }
      if(images.length<3){
        window.alert('select atleast 3 images')
      }else{
        dispatch(selectByReader(order))
        
      }
  }

  const addCommentHandler = (e)=>{
    e.preventDefault();
    const order={
      comment:comment,
      id:commitmentId
    }
    dispatch(addComment(order))
  }
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : !commitmentItems.isCompletedByCal ? (
        <Message variant="primary">
          Task is not completed by Calligrapher yet!
        </Message>
      ) : (
        <>
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
            <ListGroup.Item>
              Completed :{" "}
              {commitmentItems.isCompletedByReader ? (
                <i className="fas fa-times" style={{ color: "green" }}></i>
              ) : (
                <i className="fas fa-times" style={{ color: "red" }}></i>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              image1 :{" "}
              {commitmentItems.images[0] ? (
                <Image
                style={{height:"auto",maxWidth:"450px"}}
                  src={commitmentItems.images[0]}
                />
              ) : (
                "no image"
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              image2 :{" "}
              {commitmentItems.images[1] ? (
                <Image
                style={{height:"auto",maxWidth:"450px"}}
                  src={commitmentItems.images[1]}
                />
              ) : (
                "no image"
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              image3 :{" "}
              {commitmentItems.images[2] ? (
                <Image
                style={{height:"auto",maxWidth:"450px"}}
                  src={commitmentItems.images[2]}
                />
              ) : (
                "no image"
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              image4 :{" "}
              {commitmentItems.images[3] ? (
                <Image
                style={{height:"auto",maxWidth:"450px"}}
                  src={commitmentItems.images[3]}
                />
              ) : (
                "no image"
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              image5 :{" "}
              {commitmentItems.images[4] ? (
                <Image
                style={{height:"auto",maxWidth:"450px"}}
                  src={commitmentItems.images[4]}
                />
              ) : (
                "no image"
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={12}>
          <h3>Feedback</h3>
          {
            commitmentItems.comments.map((comment)=>
             (<><ListGroup variant='flush'>
                <ListGroup.Item>
          <strong>{comment.name}</strong>
          <p>{comment.createdAt.substring(0,10)}</p>
          <p>{comment.comment}</p>
                </ListGroup.Item>
             </ListGroup>
             <hr/></>) 
            )
          }
          <Form onSubmit={addCommentHandler}>
          <Form.Group>
            <Form.Label>enter the feedback</Form.Label>
            <Form.Control type='text' as='textarea' value={comment} onChange={(e)=>setComment(e.target.value)}
            >
              
            </Form.Control>
            <Button type='submit' className="btn btn-primary mt-2" >add comment</Button>  
            </Form.Group>
            </Form>
        </Col>
        </>

        
      )}
      {loading ? (
        ""
      ) : error ? (
        ""
      ) :commitmentItems.isCompletedByReader?'': selectLoading?<Loader/>:(
        <FormContainer>
          {selectError&&<Message variant=''>{selectError}</Message>}
          <Form onSubmit={submithandler}>
            <h3>Pick images</h3>
            <Form.Group>
              <Form.Label>
                select best 3 signatures:
                <Form.Check
                  label="image1"
                  
                  disabled={disabled}
                  onChange={(e) => {
                                setImage([...images,commitmentItems.images[0]]);
                  }}
                />
                <Form.Check label="image2"  disabled={disabled} onChange={(e) => {
                    setImage([...images,commitmentItems.images[1]]);
                  }}/>
                <Form.Check label="image3"  disabled={disabled} onChange={(e) => {
                    setImage([...images,commitmentItems.images[2]]);
                  }}/>
                <Form.Check label="image4"  disabled={disabled} onChange={(e) => {
                    setImage([...images,commitmentItems.images[3]]);
                  }}/>
                <Form.Check label="image5"  disabled={disabled} onChange={(e) => {
                    setImage([...images,commitmentItems.images[4]]);
                  }}/>
              </Form.Label>
            </Form.Group>
            <Button type="submit" disabled={disabled}>submit</Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default ReaderDetailsScreen;
