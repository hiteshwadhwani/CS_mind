import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listFaculities,deleteFaculty } from "../actions/facultyActions";
import {Table,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FACULTY_UPDATE_RESET } from '../reducers/facultyConstants';

const FacultyListScreen = ({history}) => {
    const dispatch=useDispatch();
    const facultyList = useSelector((state) => state.facultyList);
  const { loading, error, faculties } = facultyList;

  const facultyDelete = useSelector((state) => state.facultyDelete);
  const { success} = facultyDelete;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            window.scrollTo(0,0);
            dispatch(listFaculities())
            dispatch({type:FACULTY_UPDATE_RESET})
        }else{
            history.push('/login')
        }
        
    }, [dispatch,userInfo,history,success])

    const deleteHandler=(id)=>{
        dispatch(deleteFaculty(id))
    }
    return (
        <>
        {
            loading? <Loader/> : error ?<Message>{error}</Message>:(
                <Container className="mt-5">
              <h2 className="adminthings">Welcome to Faculty/Advisers Dashboard, {userInfo.name} .</h2>
              <hr/>
              <br/>
             <Link to='/admin/addfaculty'> <button className='btn btn-primary'>Add Faculty/Adviser</button></Link>
             <Table striped bordered hover responsive className='table-sm mt-5'>
                 <thead>
                     <tr>
                        <td>Sequence</td>
                        <td>Name</td>
                        <td>College</td>
                        <td>Delete</td>
                        <td>Update</td>
                     </tr>
                     </thead>
                     <tbody>
                         {faculties.map((intern)=>(
                             <tr>
                                 <td>{intern.sequence}</td>
                                 <td>{intern.name}</td>
                                 <td>{intern.college}</td>
                                 <td><button onClick={()=>deleteHandler(intern._id)} className='btn btn-danger'>delete</button></td>
                                 <td><Link to={`/admin/updatefaculty/${intern._id}`}><button className='btn btn-primary'>update</button></Link></td>
                             </tr>
                         ))}
                     </tbody>
             </Table>
        </Container>    
            )
        }
        
        </>
    )
}

export default FacultyListScreen
