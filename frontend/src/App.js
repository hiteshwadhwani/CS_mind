import React,{useEffect} from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./Screens/HomeScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";

import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ResetMailScreen from "./Screens/ResetMailScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import AimMainScreen from "./Screens/AimMainScreen";
import InnovationMainScreen from "./Screens/InnovationMainScreen";
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import Threecs from "./Screens/ThreecsScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import AimListScreen from "./Screens/AimListScreen";
import { AimUpdateScreen } from "./Screens/AimUpdateScreen";
import InnovListScreen from "./Screens/InnovationListScreen";
import { InnovUpdateScreen } from "./Screens/InnovationUpdateScreen";
import PaymentScreenWrapper from "./Screens/PaymentScreenWrapper";
import CounselListScreen from "./Screens/CounselListScreen";
import { CounselUpdateScreen } from "./Screens/CounselUpdateScreen";
import SirProfileScreen from "./Screens/SirProfileScreen";
import PaymentScreenWrapper2 from "./Screens/PaymentScreenWrapper2";
import CommitmentListScreen from "./Screens/CommitmentListScreen";
import { CommitmentUpdateScreen } from "./Screens/CommitmentUpdateScreen";
import CalDashboardScreen from './Screens/CalDashboardScreen';
import CalDetailsScreen from "./Screens/CalDetailsScreen";
import ReaderDashboardScreen from "./Screens/ReaderDashboardScreen";
import ReaderDetailsScreen from "./Screens/ReaderDetailsScreen";
import UserCommitmentScreen from "./Screens/UserCommitmentScreen";
import Contact from "./Screens/ContactScreen";
import Associates from "./Screens/AssociatesScreen";
import PaymentScreenWrapper3 from "./Screens/PaymentScreenWrapper3";
import Interns from "./Screens/InternScreen";
import Affiliates from "./Screens/AffiliatesScreen";
import Asso from "./Screens/AssoScreen";
import Inno from "./Screens/InnoScreen";
import Acad from "./Screens/AcadScreen";
import Privacy from "./Screens/Privacy";
import PaymentScreenWrapper4 from "./Screens/PaymentScreenWrapper4";
import CounsellingMainScreen from "./Screens/CounsellingMainScreen";
import SharpenMainScreen from "./Screens/SharpenMainScreen";
import PaymentScreenWrapper5 from './Screens/PaymentScreenWrapper5';
import SharpenListScreen from "./Screens/SharpenListScreen";
import { SharpenUpdateScreen } from "./Screens/SharpenUpdateScreen";
import {useDispatch} from 'react-redux';
import {getContentDetails} from './actions/contentActions.js';
import HomeContentUpdateScreen from "./Screens/HomeContentUpdateScreen";
import AdminDashBoard from "./Screens/AdminDashBoard";
import AddInternScreen from "./Screens/AddInternScreen";
import InternListScreen from "./Screens/InternListScreen";
import InternUpdateScreen from "./Screens/InternUpdateScreen";
import AddFacultyScreen from "./Screens/AddFacultyScreen";
import FacultyListScreen from './Screens/FacultyListScreen';
import FacultyUpdateScreen from "./Screens/FacultyUpdateScreen";
import InternFormScreen from "./Screens/InternFormScreen";
import InternFormListScreen from "./Screens/InternFormListScreen";
import InternFormDetailsScreen from "./Screens/InternFormDetailsScreen";
import AimNoFormScreen from "./Screens/aimNoFormScreen";
import FinanceScreen from "./Screens/FinanceScreen";
import AddAffScreen from "./Screens/AddAffScreen";
import AffListScreen from "./Screens/AffListScreen";
import AffUpdateScreen from "./Screens/AffUpdateScreen";



function App() {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getContentDetails())
    
  }, [])
  return (
    <Router>
      <Header />
      <main className="py-3">
        
          <Route exact path="/"  component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/associates' component={Associates} />
          <Route exact path='/asso' component={Asso} />
          <Route exact path='/inno' component={Inno} />
          <Route exact path='/acad' component={Acad}/>
          <Route exact path='/privacy' component={Privacy}/>
          <Route exact path='/interns' component={Interns}/>
          <Route exact path='/affiliates' component={Affiliates}/>
          <Route exact path="/register" component={RegisterScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Route exact path="/resetmail" component={ResetMailScreen} />
          <Route exact path='/sirprofile' component={SirProfileScreen}/>
          <Route exact path='/user/commitment/:id' component={UserCommitmentScreen}/>
          <Route
            exact
            path="/resetpassword/:token"
            component={ResetPasswordScreen}
          />
          <Route exact path="/innovation" component={InnovationMainScreen} />
          <Route
            exact
            path="/innovation/form/:projectname"
            component={PaymentScreenWrapper3}
          />
          <Route exact path='/admin/innovationlist' component={InnovListScreen} />
          <Route exact path='/admin/dashboard' component={AdminDashBoard}/>
          <Route exact path='/admin/innovation/:id' component={InnovUpdateScreen} />
          <Route exact path='/admin/sharpenlist' component={SharpenListScreen} />
          <Route exact path="/aim/form" component={PaymentScreenWrapper4} />
          <Route exact path="/aim/noform" component={AimNoFormScreen} />
          <Route exact path="/aim" component={AimMainScreen} />
          <Route exact path='/admin/aimlist' component={AimListScreen} />
           <Route exact path='/admin/aim/:id' component={AimUpdateScreen} />
          <Route exact path='/admin/userlist' component={UserListScreen} />
          <Route exact path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route exact path='/threecs' component={Threecs} />
          <Route exact path='/counselling' component={CounsellingMainScreen} />
          <Route exact path='/signupfuture' component={SignUpScreen}/>
          <Route exact path='/sharpentheskills' component={SharpenMainScreen}/>
          <Route exact path='/sharpentheskills/payment' component={PaymentScreenWrapper5}/>
          <Route exact path='/admin/sharpentheskills/:id' component={SharpenUpdateScreen} />
         <Route exact path='/counselling/payment' component={PaymentScreenWrapper} />
         <Route exact path='/admin/counsellingList'  component={CounselListScreen}/>
         <Route exact path='/admin/counselling/:id'  component={CounselUpdateScreen}/>
         <Route exact path='/commitment/payment' component={PaymentScreenWrapper2} />
         <Route exact path='/admin/commitmentList'  component={CommitmentListScreen}/>
         <Route exact path='/admin/commitment/:id'  component={CommitmentUpdateScreen}/>
         
          <Route exact path='/cal/dashboard' component={CalDashboardScreen} />
          <Route exact path='/cal/commitment/:id' component={CalDetailsScreen} />
          <Route exact path='/reader/dashboard' component={ReaderDashboardScreen} />
          <Route exact path='/reader/commitment/:id' component={ReaderDetailsScreen} />        
          <Route exact path='/admin/homecontent' component={HomeContentUpdateScreen}/>
          <Route exact path='/admin/addintern' component={AddInternScreen}/>
          <Route exact path='/admin/updateintern/:id' component={InternUpdateScreen}/>
          <Route exact path='/admin/interns' component={InternListScreen}/>
          <Route exact path='/admin/addfaculty' component={AddFacultyScreen}/>
          <Route exact path='/admin/faculties' component={FacultyListScreen}/>
          <Route exact path='/admin/updatefaculty/:id' component={FacultyUpdateScreen}/>
          <Route exact path='/internForm' component={InternFormScreen}/>
          <Route exact path='/admin/internFormList' component={InternFormListScreen}/>
          <Route exact path='/admin/internFormDetails/:id' component={InternFormDetailsScreen}/>
          <Route exact path='/admin/finance' component={FinanceScreen} />
          <Route exact path='/admin/addAff' component={AddAffScreen}/>
          <Route exact path='/admin/affs' component={AffListScreen}/>
          <Route exact path='/admin/updateAff/:id' component={AffUpdateScreen}/>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
