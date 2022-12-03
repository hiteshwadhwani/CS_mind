import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listInterns } from "../actions/internFormActions";
import {Table,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const InternFormListScreen = ({history}) => {
    const dispatch=useDispatch();
    const internFormList = useSelector((state) => state.internFormList);
  const { loading, error, interns } = internFormList;

  

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listInterns())
        }else{
            history.push('/login')
        }
        
    }, [dispatch,userInfo,history])

    return (
        <>
        {
            loading? <Loader/> : error ?<Message>{error}</Message>:(
                <Container className="mt-5">
              <h2 className="adminthings">Welcome to Intern Responses Dashboard, {userInfo.name} .</h2>
              <hr/>
              <br/>
           
             <Table striped bordered hover responsive className='table-sm mt-5'>
                 <thead>
                     <tr>
           
                        <td>Name</td>
                        <td>College</td>
                        <td>Date</td>
                        <td>Details</td>
                     </tr>
                     </thead>
                     <tbody>
                         {interns.map((intern)=>(
                             <tr>
                                 <td>{intern.user.name}</td>
                                 <td>{intern.college}</td>
                                 <td>{intern.createdAt.slice(0,10)}</td>
                                 <td><Link to={`/admin/internFormDetails/${intern._id}`}><button className="btn btn-info">details</button></Link></td>
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

export default InternFormListScreen
