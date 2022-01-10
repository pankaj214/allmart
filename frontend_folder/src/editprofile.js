import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from './appbar'
import Footer from './footer'
import { Button,Container,Row } from 'react-bootstrap';
const Editprofile = () => {
    return (
        <>
            <Appbar/>
      <br/>
            <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>USER PROFILE</span>
  </Row>
  </Container>
 <br/>
            <div className="container emp-profile">
   <form method="POST" action="" enctype="multipart/form-data">
     <div className="row">
       <div className="col-md-4">
       <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" alt="John" style={{width:'50%'}}/><br/>
       <h4 style={{marginTop:'2%',color:'#05386B'}}>Edit Profile Picture</h4>
       <input type="file" name="file" id="file" style={{color:'white',backgroundColor:'#05386B'}}/>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="username"><b>Name: </b></label>
         <input type="text" name="username" id="username" value="Name"/>
         <label htmlFor="email"><b>Email id: </b></label>
         <input type="text" value="email id" name="email" id="email"/>
         <label htmlFor="userid"><b>User id: </b></label>
         <input type="text" value="user id" name="userid" id="userid"/>
         <label htmlFor="phonenumber"><b>Phone Number: </b></label>
         <input type="text" value="phone number" name="phonenumber" id="phonenumber"/>
         </div>
       </div>
     </div>
     <span className="row">
     <input type="submit" value="Update Profile" style={{color:'white',backgroundColor:'#05386B'}}/>&nbsp;
     </span>
     </form>
</div>
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Editprofile
