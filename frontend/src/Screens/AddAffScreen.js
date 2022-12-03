import React,{useEffect,useState} from 'react';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from "../components/FormContainer";
import { Form, Button,Col } from "react-bootstrap";
import ImageUpload from "../components/ImageUpload";
import {createAff} from '../actions/affActions';

const AddAffScreen = ({history}) => {
    const dispatch = useDispatch()
    const [name,setName]=useState('');
    const [info,setInfo]=useState('');
    const [words,setWords]=useState('');
    
    const [image,setImage]=useState('');
    const [sequence,setSeq]=useState(0);
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const calUpload = useSelector((state) => state.calUpload);
  const { loading:uploadLoading,error:uploadError,success:uploadSuccess } = calUpload;
  const affCreate=useSelector((state)=>state.affCreate);
  const {success,error,loading}=affCreate;
  const setFileHandler=(image,label)=>{
   
    setImage(image);
}
  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
        if(success){
          history.push('/admin/dashboard')
        }
        else{
            window.scrollTo(0,0);
        }
    }else{
        history.push('/login')
    };
        
  },[history,userInfo,success])
  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const order={
      name,
      info,
      image,
      words,
      sequence
    }
    dispatch(createAff(order))
  }  
    return (
        <>

          <FormContainer>
            <h2>Add new Affiliate</h2>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={onSubmitHandler}>

              <Form.Group controlId='name'>
                <Form.Label>Affiliate name</Form.Label>
                <Form.Control type='text' value={name} onChange={(e)=>setName(e.target.value)} placeholder='full name' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='info'>
                <Form.Label>Affiliate info</Form.Label>
                <Form.Control type='text'  as='textarea' value={info} onChange={(e)=>setInfo(e.target.value)} placeholder='info' required></Form.Control>
              </Form.Group>
              <Form.Group controlId='words'>
                <Form.Label>Affiliate testimonial</Form.Label>
                <Form.Control type='text' value={words} as='textarea' onChange={(e)=>setWords(e.target.value)} placeholder='testimonial' required></Form.Control>
              </Form.Group>
             
         <Form.Group controlId='sequence'>
                <Form.Label>Affiliate sequence(should be unique)</Form.Label>
                <Form.Control type='number' value={sequence} onChange={(e)=>setSeq(e.target.value)} placeholder='affiliate sequence' required></Form.Control>
              </Form.Group>
              {uploadLoading?<Loader/>:(
          <Col md={10}>
          {uploadError && <Message variant="danger">{uploadError}</Message>}  
          <h3>upload image</h3>
          <ImageUpload setFileHandler={setFileHandler} label={'image'} />
          
          
        </Col>
      )}
          <Button type='submit'>Add Afffiliate</Button>
            </Form>
            </FormContainer>  
        </>
    )
}

export default AddAffScreen;