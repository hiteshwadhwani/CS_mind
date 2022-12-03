import React,{useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAffs,deleteAff } from "../actions/affActions";
import {Table,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { AFF_UPDATE_RESET } from '../reducers/affConstants';

const AffListScreen = ({history}) => {
    const dispatch=useDispatch();
    const affList = useSelector((state) => state.affList);
  const { loading, error, affs } = affList;

  const affDelete = useSelector((state) => state.affDelete);
  const { success} = affDelete;

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            window.scrollTo(0,0)
            dispatch(listAffs())
            dispatch({type:AFF_UPDATE_RESET})
        }else{
            history.push('/login')
        }
        
    }, [dispatch,userInfo,history,success])

    const deleteHandler=(id)=>{
        dispatch(deleteAff(id))
    }
    return (
        <>
        {
            loading? <Loader/> : error ?<Message>{error}</Message>:(
                <Container className="mt-5">
              <h2 className="adminthings">Welcome to Affiliates Dashboard, {userInfo.name} .</h2>
              <hr/>
              <br/>
             <Link to='/admin/addAff'> <button className='btn btn-primary'>Add Affiliate</button></Link>
             <Table striped bordered hover responsive className='table-sm mt-5'>
                 <thead>
                     <tr>
                        <td>Sequence</td>
                        <td>Name</td>
                        <td>Delete</td>
                        <td>Update</td>
                     </tr>
                     </thead>
                     <tbody>
                         {affs.map((intern)=>(
                             <tr>
                                 <td>{intern.sequence}</td>
                                 <td>{intern.name}</td>
                                 <td><button onClick={()=>deleteHandler(intern._id)} className='btn btn-danger'>delete</button></td>
                                 <td><Link to={`/admin/updateAff/${intern._id}`}><button className='btn btn-primary'>update</button></Link></td>
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

export default AffListScreen
