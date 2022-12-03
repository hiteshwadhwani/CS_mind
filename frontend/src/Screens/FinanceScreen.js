import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {Table,Container, ListGroup} from 'react-bootstrap';
import {listAims} from '../actions/aimActions';
import {listInnovations} from '../actions/innovationActions';
import {listSharpens} from '../actions/sharpenActions';
import {listCounsels} from '../actions/counselActions';
import {listCommitments} from '../actions/commitmentActions';
import DatePicker from "react-datepicker";
import {format} from 'date-fns';
import { PieChart } from 'react-minimal-pie-chart';

import "react-datepicker/dist/react-datepicker.css";
const defaultLabelStyle = {
    fontSize: '2px',
    fontFamily: 'sans-serif',
    textColor:'white'
  };


const FinanceScreen = ({history}) => {
    const dispatch=useDispatch();
    const userLogin = useSelector((state) => state.userLogin)
    const [date1, onChange1] = useState(new Date());
    const [date2, onChange2] = useState(new Date());
    const [aimFin,setAimFin]=useState(0);
    const [innovFin,setInnovFin]=useState(0);
    const [counselFin,setCounselFin]=useState(0);
    const [sharpenFin,setSharpenFin]=useState(0);
    const [commitmentFin,setCommitmentFin]=useState(0);
    const innovationList = useSelector((state) => state.innovationList)
    const { loading:loadingInnov, error:errorInnov, innovations } = innovationList
    
    const sharpenList = useSelector((state) => state.sharpenList)
  const { loading:loadingSharpen, error:errorSharpen, sharpens } = sharpenList

  const counselList = useSelector((state) => state.counselList);
  const { loading:loadingCounsel, error:loadingError, counsels } = counselList;

  const commitmentList = useSelector((state) => state.commitmentList)
  const { loading:loadingCommitment, error:errorCommitment, commitments } = commitmentList

  const aimList = useSelector((state) => state.aimList)
  const { loading:loadingAim, error:errorAim, aims } = aimList
  const { userInfo } = userLogin
  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
        window.scrollTo(0,0)
        dispatch(listCommitments())
        dispatch(listCounsels())
        dispatch(listInnovations())
        dispatch(listSharpens())
        dispatch(listAims())
    }else{
        history.push('/login')
    }
    
}, [dispatch,userInfo,history])

const clickHandler=()=>{

    const newDate1=format(date1,'yyyy-MM-dd')
    const newDate2=format(date2,'yyyy-MM-dd')
    var aimPrice=0;
    for(var i=0;i<aims.length;i++){
             if(aims[i].createdAt.substring(0,10)>=newDate1 && aims[i].createdAt.substring(0,10)<=newDate2){
            aimPrice=aims[i].price+aimPrice;
        }
    }
    
    var counselPrice=0;
    for(var i=0;i<counsels.length;i++){
             if(counsels[i].createdAt.substring(0,10)>=newDate1 && counsels[i].createdAt.substring(0,10)<=newDate2){
            counselPrice=counsels[i].price+counselPrice;
        }
    }
    
    var sharpenPrice=0;
    for(var i=0;i<sharpens.length;i++){
             if(sharpens[i].createdAt.substring(0,10)>=newDate1 && sharpens[i].createdAt.substring(0,10)<=newDate2){
            sharpenPrice=sharpens[i].price+sharpenPrice;
        }
    }
    console.log(sharpenPrice)
    
    var commitmentPrice=0;
    for(var i=0;i<commitments.length;i++){
             if(commitments[i].createdAt.substring(0,10)>=newDate1 && commitments[i].createdAt.substring(0,10)<=newDate2){
            commitmentPrice=commitments[i].price+commitmentPrice;
        }
    }
    
    
    var innovPrice=0;
    for(var i=0;i<innovations.length;i++){
             if(innovations[i].createdAt.substring(0,10)>=newDate1 && innovations[i].createdAt.substring(0,10)<=newDate2){
            innovPrice=innovations[i].price+innovPrice;
        }
    }
    setInnovFin(innovPrice)
    setAimFin(aimPrice)
    setCommitmentFin(commitmentPrice)
    setSharpenFin(sharpenPrice)
    setCounselFin(counselPrice)

  

}
    return (
        <Container style={{marginTop:"45px"}}>
            <h2 className="adminthings">Welcome to Finance Section $$$</h2>
            <div style={{margin:"10px"}}>
      <DatePicker
        onChange={onChange1}
        selected={date1}
        
      />
      </div>
      <div style={{margin:"10px"}}>
       <DatePicker
        onChange={onChange2}
        selected={date2}
      />
    </div>
    {
      aims && counsels && commitments && sharpens && innovations && <button style={{margin:"10px"}} onClick={()=>clickHandler()} className="btn btn-primary">change timeframe</button>
    }
      
     <hr/>
      <ListGroup variant="flush">
          <h3 className="adminthings">Finances from {date1.toDateString()} to {date2.toDateString()}</h3>
        <ListGroup.Item>
            Academic Counsulting : {aimFin} Rs
        </ListGroup.Item>
        <ListGroup.Item>
            Technology Innovation : {innovFin} Rs
        </ListGroup.Item>
        <ListGroup.Item>
            Signature and Beyond : {commitmentFin} Rs
        </ListGroup.Item>
        <ListGroup.Item>
            Professional Mentoring : {counselFin} Rs
        </ListGroup.Item>
        <ListGroup.Item>
            Training/Sharpen Skills : {sharpenFin} Rs
        </ListGroup.Item>
      </ListGroup>
      <br/>
      <hr/>
      <br/><br/>
      <h2 className="adminthings">Look at the pie chart for visualization</h2>
     

     <div class="container" id="pie">
       <div class="row">
         <div class="col-md-4">
         <br/>  
         <div class="alert alert-success">
    <strong>University & Academic Consulting!</strong>.
  </div>
  <div class="alert alert-primary">
    <strong>Technology Innovation!</strong>.
  </div>
  <div class="alert alert-warning">
    <strong>Signature & Beyond!</strong>.
  </div>
  <div class="alert alert-danger">
    <strong>Professional Mentoring!</strong>.
  </div>
  <div class="alert alert-dark">
    <strong>Training/Sharpen Skills!</strong>.
  </div>
           </div>
           <div class="col-md-8">
        <PieChart
    radius={20}
    label={({ dataEntry }) => dataEntry.value}
    labelStyle={{...defaultLabelStyle}}
  data={[
    { title: 'University', value: aimFin, color: '#d4edda' },
    { title: 'Technology', value: innovFin, color: '#cce5ff' },
    { title: 'Signature', value: commitmentFin, color: '#fff3cd' },
    { title: 'Mentoring', value: counselFin, color: '#f8d7da' },
    { title: 'Training', value: sharpenFin, color: '#d6d8d9' },
  ]}
/>
</div>
</div>
</div>
            
        </Container>
    )
}

export default FinanceScreen
