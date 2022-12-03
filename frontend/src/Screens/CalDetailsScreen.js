import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCommitmentDetails,uploadByCal ,addComment} from "../actions/commitmentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";



import {
  Image,
  Row,
  Col,
  ListGroup,
  Button, Container, Form
} from "react-bootstrap";


import ImageUpload from "../components/ImageUpload";

const CalDetailsScreen = ({ match, history }) => {
  const commitmentId = match.params.id;
  
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [comment,setComment]=useState('');
  

  
  const setFileHandler=(image,label)=>{
   
    if(label==='image1'){
      setImage1(image)
      console.log(label)
    }
    else if(label==='image2'){
      setImage2(image)
      console.log(label)
    }
    else if(label==='image3'){
      setImage3(image)
      console.log(label)
    }
    else if(label==='image4'){
      setImage4(image)
      console.log(label)
    }
    else if(label==='image5'){
      setImage5(image)
      console.log(label)
    }
}
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const calUpload = useSelector((state) => state.calUpload);
  const { loading:uploadLoading,error:uploadError,success } = calUpload;
  
  const commentAdd = useSelector((state) => state.commentAdd);
  const { loading:commentLoading,error:commentError,successMessage } = commentAdd;
  const commitmentDetails = useSelector((state) => state.commitmentDetails);
  const { commitmentItems, loading, error } = commitmentDetails;
  useEffect(() => {
    if (userInfo || userInfo.isCal) {
      if(success){
        dispatch(getCommitmentDetails(commitmentId))
      } 
      else {
        window.scrollTo(0,0);
        dispatch(getCommitmentDetails(commitmentId));
      }
      
    }else{
      history.push("/login");
    }
   
  }, [history, userInfo, commitmentId,success,successMessage]);
  

  const submitImageHandler=(e)=>{

    const order = {
      image1,image2,image3,image4,image5,id:commitmentId,calid:userInfo._id
    }
    
    if(image1 && image2 && image3 && image4 && image5){
      dispatch(uploadByCal(order))
    }else{
      window.alert('upload 5 images')
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
    <Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
              {commitmentItems.isCompletedByCal ? (
                <i className="fas fa-times" style={{ color: "green" }}></i>
              ) : (
                <i className="fas fa-times" style={{ color: "red" }}></i>
              )}
            </ListGroup.Item>
            <ListGroup.Item>image1 :{" "}
              {commitmentItems.images[0] ? <Image  style={{height:"auto",maxWidth:"450px"}} src={commitmentItems.images[0]}/>:'no image'}
            </ListGroup.Item>
            <ListGroup.Item>image2 :{" "}
              {commitmentItems.images[1] ? <Image  style={{height:"auto",maxWidth:"450px"}} src={commitmentItems.images[1]}/>:'no image'}
            </ListGroup.Item>
            <ListGroup.Item>image3 :{" "}
              {commitmentItems.images[2] ? <Image  style={{height:"auto",maxWidth:"450px"}} src={commitmentItems.images[2]}/>:'no image'}
            </ListGroup.Item>
            <ListGroup.Item>image4 :{" "}
              {commitmentItems.images[3] ? <Image style={{height:"auto",maxWidth:"450px"}}  src={commitmentItems.images[3]}/>:'no image'}
            </ListGroup.Item>
            <ListGroup.Item>image5 :{" "}
              {commitmentItems.images[4] ? <Image  style={{height:"auto",maxWidth:"450px"}} src={commitmentItems.images[4]}/>:'no image'}
            </ListGroup.Item>
              
              
                
              
              
            
          </ListGroup>
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
        </Col>
      )}
      {loading ? '':error?'':uploadLoading?<Loader/>:(
          <Col md={10}>
          {uploadError && <Message variant="danger">{uploadError}</Message>}  
          <h3>upload images of signature</h3>
          <ImageUpload setFileHandler={setFileHandler} label={'image1'} />
          <ImageUpload setFileHandler={setFileHandler} label={'image2'} />
          <ImageUpload setFileHandler={setFileHandler} label={'image3'} />
          <ImageUpload setFileHandler={setFileHandler} label={'image4'} />
          <ImageUpload setFileHandler={setFileHandler} label={'image5'} />
         
          <Button type='button'
          onClick={submitImageHandler} >
            submit images
          </Button>
          
        </Col>
      )}
      
    </Row>
    </Container>
  );
};

export default CalDetailsScreen;
