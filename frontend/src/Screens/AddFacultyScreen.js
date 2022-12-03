import React,{useEffect,useState} from 'react';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer";
import { Form, Button,Col } from "react-bootstrap";
import ImageUpload from "../components/ImageUpload";
import {createFaculty} from '../actions/facultyActions';

const AddFacultyScreen = ({history}) => {
    const dispatch = useDispatch()
    const [name,setName]=useState('');
    const [college,setCollege]=useState('');
    const [position,setPos]=useState('');
    const [project,setProject]=useState('');
    const [image,setImage]=useState('');
    const [sequence,setSeq]=useState(0);
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const calUpload = useSelector((state) => state.calUpload);
  const { loading:uploadLoading,error:uploadError,success:uploadSuccess } = calUpload;
  const facultyCreate=useSelector((state)=>state.facultyCreate);
  const {success,error,loading}=facultyCreate;
  const setFileHandler=(image,label)=>{
   
    setImage(image);
}
  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
        if(success){
          history.push('/admin/dashboard')
        }
        else{

        }
    }else{
        history.push('/login')
    };
        
  },[history,userInfo,success])
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const order={
      name,
      project,
      college,
      image,
      position,
      sequence
    }
    dispatch(createFaculty(order))
  }  
    return (
        <>

          <FormContainer>
            <h2>Add new Faculty/Adviser</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={onSubmitHandler}>

              <Form.Group controlId='name'>
                <Form.Label>Faculty name</Form.Label>
                <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='faculty full name' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='project'>
                <Form.Label>Faculty project</Form.Label>
                <Form.Control type='text'  value={project} onChange={(e)=>setProject(e.target.value)} placeholder='faculty project name' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='position'>
                <Form.Label>Faculty position</Form.Label>
                <Form.Control type='text' value={position} onChange={(e)=>setPos(e.target.value)} placeholder='faculty position' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='college'>
                <Form.Label>Faculty institution</Form.Label>
                <Form.Control type='text' value={college} onChange={(e)=>setCollege(e.target.value)} placeholder='faculty institution' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='sequence'>
                <Form.Label>Faculty sequence</Form.Label>
                <Form.Control type='number' value={sequence} onChange={(e)=>setSeq(e.target.value)} placeholder='intern sequence' required></Form.Control>
              </Form.Group>
              {uploadLoading?<Loader/>:(
          <Col md={10}>
          {uploadError && <Message variant="danger">{uploadError}</Message>}  
          <h3>upload image</h3>
          <ImageUpload setFileHandler={setFileHandler} label={'image'} />
          
          
        </Col>
      )}
          <Button type='submit'>Add Faculty</Button>
            </Form>
            </FormContainer>  
        </>
    )
}

export default AddFacultyScreen;