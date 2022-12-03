import React,{useEffect,useState} from 'react';
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button,Container } from "react-bootstrap";
import {updateFaculty,getFacultyDetails} from '../actions/facultyActions';
import ImageUpload from "../components/ImageUpload";
import { storage } from "../firebase/index";
import {API_URL} from '../url';
const FacultyUpdateScreen = ({history,match}) => {
  const defaultImage='media/avatar.jpg';
    const internid=match.params.id;
    const dispatch = useDispatch()
    const [name,setName]=useState('');
    const [college,setCollege]=useState('');
    const [position,setPos]=useState('');
    const [project,setProject]=useState('');
    const [sequence,setSeq]=useState(0);
    const [image,setImage]=useState('');
    const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;

  const facultyUpdate=useSelector((state) => state.facultyUpdate)
  const {success}=facultyUpdate;

  const facultyDetails=useSelector((state) => state.facultyDetails)
  const {loading,error,faculty}=facultyDetails;

  const setFileHandler=(image,label)=>{
   
    setImage(image);
}
const onRemoveHandler=async (image)=>{
  var deleteRef=storage.refFromURL(image)
  deleteRef.delete().then(()=>{
    alert("image removed successfuly")
    setImage(defaultImage);
  }).catch((error)=>{
    alert('image could not be removed')
  })
  
    
}

  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
        if(success){
          history.push('/admin/faculties')
        }
        else if(!faculty.name){
           dispatch(getFacultyDetails(internid)); 
        }else{
          setCollege(faculty.college)
          setPos(faculty.position)
          setName(faculty.name)
          setProject(faculty.project)
          setSeq(faculty.sequence)
          setImage(faculty.image)
           
        }
    }else{
        history.push('/login')
    };
        
  },[history,userInfo,success,faculty])

  const onSubmitHandler=(e)=>{
    e.preventDefault();
    const order={
      _id:faculty._id,
      name,
      project,
      college,
      position,
      sequence,
      image
    }
    dispatch(updateFaculty(order))
  }

    return (
      <Container style={{marginTop:"25px"}}>
        <h3 className="adminthings">Faculty/Adviser update </h3>
      <hr/>
      {image ==='media/avatar.jpg' ? <img  src={`${API_URL}media/avatar.jpg`}  alt="innovation"/>:<img src={image}/>}
        
        {image ==='media/avatar.jpg' ?<ImageUpload setFileHandler={setFileHandler} label={'image'}/>:<button  style={{marginTop:"20px"}}className="btn btn-dark " onClick={()=>onRemoveHandler(image)}>remove</button>}
       
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
        <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                
                value={position}
                onChange={(e) => setPos(e.target.value)}
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
        <Button type="submit">update faculty</Button>
      </Form>
      </Container>
    )
}

export default FacultyUpdateScreen
