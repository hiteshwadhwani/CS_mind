import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button,Container } from "react-bootstrap";
import {updateAff,getAffDetails} from '../actions/affActions';
import ImageUpload from "../components/ImageUpload";
import { storage } from "../firebase/index";
import {API_URL} from '../url';
const AffUpdateScreen = ({history,match}) => {
    const defaultImage='media/avatar.jpg';
    const internid=match.params.id;
    const dispatch = useDispatch()
    const [name,setName]=useState('');
    const [info,setInfo]=useState('');
    const [words,setWords]=useState('');
    const [sequence,setSeq]=useState(0);
    const [image,setImage]=useState('');

    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const affUpdate=useSelector((state) => state.affUpdate)
  const {success}=affUpdate;

  const affDetails=useSelector((state) => state.affDetails)
  const {loading,error,aff}=affDetails;

  const setFileHandler=(image,label)=>{
   
    setImage(image);
}

  const onRemoveHandler=async (image)=>{
    var deleteRef=storage.refFromURL(image)
    deleteRef.delete().then(()=>{
      alert("image removed successfuly")
      setImage(defaultImage);
      // const order={
      //   _id:intern._id,
      //   name,
      //   project,
      //   college,
      //   degree,
      //   sequence,
      //   image
      // }
      // dispatch(updateIntern(order))
    }).catch((error)=>{
      alert('image could not be removed')
    })
    
      
  }

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
        if(success){
          history.push('/admin/affs')
        }
        else if(!aff.name){
           dispatch(getAffDetails(internid)); 
        }else{
          setInfo(aff.info)
          setWords(aff.words)
          setName(aff.name)
          setSeq(aff.sequence)
          setImage(aff.image)

        }
    }else{
        history.push('/login')
    };
        
  },[history,userInfo,success,aff])

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const order={
      _id:aff._id,
      name,
      info,
      words,
      sequence,
      image
    }
    dispatch(updateAff(order))
  }

    return (
      <Container style={{marginTop:"25px"}}>
        <h3 className="adminthings">Affiliate update </h3>
        {image ==='media/avatar.jpg' ? <img  src={`${API_URL}media/avatar.jpg`}  alt="innovation"/>:<img src={image}/>}
        
        {image ==='media/avatar.jpg' ?<ImageUpload setFileHandler={setFileHandler} label={'image'}/>:<button  style={{marginTop:"20px"}}className="btn btn-dark " onClick={()=>onRemoveHandler(image)}>remove</button>}
        
      <hr/>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group>
        <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"

                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Info</Form.Label>
              <Form.Control
                type="text"
                as='textarea'
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              ></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Words</Form.Label>
              <Form.Control
                type="text"
                as='textarea'
                value={words}
                onChange={(e) => setWords(e.target.value)}
              ></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Sequence</Form.Label>
              <Form.Control
                type="text"
                
                value={sequence}
                onChange={(e) => setSeq(e.target.value)}
              ></Form.Control>
        </Form.Group>
        <Button type="submit">update affiliate</Button>
      </Form>
      </Container>
    )
}

export default AffUpdateScreen
