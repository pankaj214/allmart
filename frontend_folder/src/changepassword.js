import React, {useEffect, Fragment } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from './appbar';
import {useHistory} from 'react-router-dom'
import {Row,Container,Button} from 'react-bootstrap'
import Footer from './footer';
const Changepassword = () => {
  const history=useHistory()

  const callChangePassword=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
       method:'GET',
       headers:{
   Accept:'application/json',
   'Content-Type':'application/json'
 },
   })
   const data=await res.json()
   if(data.error==='Please be login'){
       localStorage.setItem('decisions',0)
       history.push('/signin')
       setTimeout(()=>{toast.error(`${data.error}`, {
         position: "top-center",
       });},1000)
      
     } }
     useEffect(()=>{
 callChangePassword()
     },[])

    return (
        <Fragment>
             <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>
            <br/>
            <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>CHANGE PASSWORD</span>
  </Row>
  </Container>
  <br/>
            <div className="container emp-profile">
   <form method="POST" action="">
     <div className="row">
       <div className="col-md-4">
       <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" alt="John" style={{width:'50%'}}/>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="username"><b>Enter Current Password: </b></label>
         <input type="password" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} name="username" id="username"/>
         <label htmlFor="email"><b>Enter New Password: </b></label>
         <input type="text" name="email" id="email"/>
         <label htmlFor="userid"><b>Enter Re-new Password: </b></label>
         <input type="password" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} name="userid" id="userid"/>
         <input type="submit" value="Save" style={{color:'white',backgroundColor:'#05386B'}}/>
         </div>
       </div>
     </div>
     
     </form>
</div>
<br/>
<Footer/>
<ToastContainer/>
        </Fragment>
    )
}

export default Changepassword
