import React,{useEffect,useState} from 'react';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";
import { Form, Button,Col } from "react-bootstrap";
import ImageUpload from "../components/ImageUpload";
import {createIntern} from '../actions/internActions';

const AddInternScreen = ({history}) => {
    const dispatch = useDispatch()
    const [name,setName]=useState('');
    const [college,setCollege]=useState('');
    const [degree,setDegree]=useState('');
    const [project,setProject]=useState('');
    const [image,setImage]=useState('');
    const [sequence,setSeq]=useState(0);
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const calUpload = useSelector((state) => state.calUpload);
  const { loading:uploadLoading,error:uploadError,success:uploadSuccess } = calUpload;
  const internCreate=useSelector((state)=>state.internCreate);
  const {success,error,loading}=internCreate;
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
      degree,
      sequence
    }
    dispatch(createIntern(order))
  }  
    return (
        <>

          <FormContainer>
            <h2>Add new intern</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={onSubmitHandler}>

              <Form.Group controlId='name'>
                <Form.Label>Intern name</Form.Label>
                <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='intern full name' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='project'>
                <Form.Label>Intern project</Form.Label>
                <Form.Control type='text'  value={project} onChange={(e)=>setProject(e.target.value)} placeholder='intern project name' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='degree'>
                <Form.Label>Intern qualification</Form.Label>
                <Form.Control type='text' value={degree} onChange={(e)=>setDegree(e.target.value)} placeholder='intern qualification' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='college'>
                <Form.Label>Intern institution</Form.Label>
                <Form.Control type='text' value={college} onChange={(e)=>setCollege(e.target.value)} placeholder='intern institution' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='sequence'>
                <Form.Label>Intern sequence</Form.Label>
                <Form.Control type='number' value={sequence} onChange={(e)=>setSeq(e.target.value)} placeholder='intern institution' required></Form.Control>
              </Form.Group>
              {uploadLoading?<Loader/>:(
          <Col md={10}>
          {uploadError && <Message variant="danger">{uploadError}</Message>}  
          <h3>upload image</h3>
          <ImageUpload setFileHandler={setFileHandler} label={'image'} />
          
          
        </Col>
      )}
          <Button type='submit'>Add Intern</Button>
            </Form>
            </FormContainer>  
        </>
    )
}

export default AddInternScreen;