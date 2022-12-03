import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listInterns,deleteIntern } from "../actions/internActions";
import {Table,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { INTERN_UPDATE_RESET } from '../reducers/internConstants';

const InternListScreen = ({history}) => {
    const dispatch=useDispatch();
    const internList = useSelector((state) => state.internList);
  const { loading, error, interns } = internList;

  const internDelete = useSelector((state) => state.internDelete);
  const { success} = internDelete;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            window.scrollTo(0,0)
            dispatch(listInterns())
            dispatch({type:INTERN_UPDATE_RESET})
        }else{
            history.push('/login')
        }
        
    }, [dispatch,userInfo,history,success])

    const deleteHandler=(id)=>{
        dispatch(deleteIntern(id))
    }
    return (
        <>
        {
            loading? <Loader/> : error ?<Message>{error}</Message>:(
                <Container className="mt-5">
              <h2 className="adminthings">Welcome to Intern Dashboard, {userInfo.name} .</h2>
              <hr/>
              <br/>
             <Link to='/admin/addintern'> <button className='btn btn-primary'>Add Intern</button></Link>
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
                         {interns.map((intern)=>(
                             <tr>
                                 <td>{intern.sequence}</td>
                                 <td>{intern.name}</td>
                                 <td>{intern.college}</td>
                                 <td><button onClick={()=>deleteHandler(intern._id)} className='btn btn-danger'>delete</button></td>
                                 <td><Link to={`/admin/updateintern/${intern._id}`}><button className='btn btn-primary'>update</button></Link></td>
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

export default InternListScreen
