import React, {useEffect, Fragment } from "react";
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
import {Table,Container,Row,Button} from 'react-bootstrap'
const Addtocart = () => {

  const history=useHistory()
  const callAddtocart=async()=>{
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
 callAddtocart()
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
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>Your CART PRODUCTS</span>
  </Row>
  </Container>
  <br/>
              <Table striped bordered hover>
  <thead>
    <tr>
      <th>S.No.</th>
      <th>Item Name</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td><a style={{color:'black'}} href="/viewmoreitem">Mark</a></td>
      <td><Button href="">Delete</Button></td>
    </tr>
    <tr>
    <td>1</td>
      <td><a style={{color:'black'}} href="/viewmoreitem">Mark</a></td>
      <td><Button href="">Delete</Button></td>
    </tr>
    <tr>
    <td>1</td>
      <td><a style={{color:'black'}} href="/viewmoreitem">Mark</a></td>
      <td><Button href="">Delete</Button></td>
    </tr>
  </tbody>
</Table>
<br/> <br/><br/>
      <Footer/>
      <ToastContainer/>
    </Fragment>
  );
};
export default Addtocart;
