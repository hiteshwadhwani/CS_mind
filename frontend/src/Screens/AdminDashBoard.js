import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';



const AdminDashBoard = ({history}) => {
    


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin;
  useEffect(()=>{
    if(userInfo && userInfo.isAdmin){
            window.scrollTo(0,0)
            console.log('admin dash')
    }else{
        history.push('/login')
    };
        
  },[history,userInfo])
    return (
        <div className="container mt-5" style={{ 
            backgroundImage: `url("https://cdn1.vectorstock.com/i/1000x1000/94/65/admin-icon-on-white-background-simple-element-vector-28229465.jpg")` 
          }} >
            <h2 className="adminthings">Welcome to Admin Dashboard</h2>
            <hr/>
            <div className="row">
                    <div className="col-12 mt-4" >
                    
                    <Link to='/admin/userlist'>
                        <button className="btn btn-primary">Users</button>
                    </Link>
                    </div>
                    <div className="col-12 mt-4" >
                    
                    <Link to='/admin/aimlist'>
                        <button className="btn btn-success">University Consulting</button>
                    </Link>
                    </div>
                    <div className="col-12 mt-4" >
                    
                    <Link to='/admin/innovationlist'>
                        <button className="btn btn-warning">Technology Innovation</button>
                    </Link>
                    
                    </div>
                    <div className="col-12 mt-4" >
                    
                    <Link to="/admin/counsellinglist">
                        <button className="btn btn-info">Mentoring</button>
                    </Link>
                    
                    </div>
                    <div className="col-12 mt-4" >
                    
                    <Link to="/admin/commitmentlist">
                        <button className="btn btn-dark">Signature Beyond</button>
                    </Link>
                    
                    </div>
                    <div className="col-12 mt-4" >
                    
                    <Link to="/admin/sharpenlist">
                        <button className="btn btn-success">Training</button>
                    </Link>
                    
                    </div>
                    <div className="col-12 mt-4" >
                    
                    <Link to="/admin/homecontent">
                        <button className="btn btn-warning">Home Content</button>
                    </Link>
                    
                    
                    </div>
                    <div className="col-12 mt-4">
                    <Link to="/admin/interns">
                        <button className="btn btn-dark">Interns</button>
                    </Link>
                    </div>
                    <div className="col-12 mt-4">
                    <Link to="/admin/faculties">
                        <button className="btn btn-primary">Advisers</button>
                    </Link>
                    </div>
                    <div className="col-12 mt-4">
                    <Link to="/admin/affs">
                        <button className="btn btn-danger">Affiliates</button>
                    </Link>
                    </div>
                    <div className="col-12 mt-4">
                    <Link to="/admin/internFormList">
                        <button className="btn btn-success">Intern Applications</button>
                    </Link>
                    </div>
                    <div className="col-12 mt-4">
                    <Link to="/admin/finance">
                        <button className="btn btn-dark">Finances</button>
                    </Link>
                    </div>
            </div>
        </div>
    )
}

export default AdminDashBoard
