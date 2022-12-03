import React,{useEffect,useState} from 'react';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button,Container } from "react-bootstrap";
import {updateIntern,getInternDetails} from '../actions/internActions';
import ImageUpload from "../components/ImageUpload";
import { storage } from "../firebase/index";
import {API_URL} from '../url';
const InternUpdateScreen = ({history,match}) => {
    const defaultImage='media/avatar.jpg';
    const internid=match.params.id;
    const dispatch = useDispatch()
    const [name,setName]=useState('');
    const [college,setCollege]=useState('');
    const [degree,setDegree]=useState('');
    const [project,setProject]=useState('');
    const [sequence,setSeq]=useState(0);
    const [image,setImage]=useState('');

    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const internUpdate=useSelector((state) => state.internUpdate)
  const {success}=internUpdate;

  const internDetails=useSelector((state) => state.internDetails)
  const {loading,error,intern}=internDetails;

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
          history.push('/admin/interns')
        }
        else if(!intern.name){
           dispatch(getInternDetails(internid)); 
        }else{
          setCollege(intern.college)
          setDegree(intern.degree)
          setName(intern.name)
          setProject(intern.project)
          setSeq(intern.sequence)
          setImage(intern.image)

        }
    }else{
        history.push('/login')
    };
        
  },[history,userInfo,success,intern])

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const order={
      _id:intern._id,
      name,
      project,
      college,
      degree,
      sequence,
      image
    }
    dispatch(updateIntern(order))
  }

    return (
      <Container style={{marginTop:"25px"}}>
        <h3 className="adminthings">Intern update </h3>
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
        <Form.Label>College</Form.Label>
              <Form.Control
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              ></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Degree</Form.Label>
              <Form.Control
                type="text"
                
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              ></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Project</Form.Label>
              <Form.Control
                type="text"
                
                value={project}
                onChange={(e) => setProject(e.target.value)}
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
        <Button type="submit">update intern</Button>
      </Form>
      </Container>
    )
}

export default InternUpdateScreen
