import React,{useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { Table,Container,Row } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import Footer from './footer';
const Viewhistory = () => {
    const history=useHistory()
    const callViewhistoryPage=async()=>{
        const res=await fetch('http://localhost:5000/api/checkLogin',{
          method:'GET',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          // credentials:'include'
        })
    
        const data=await res.json()
        if(data.error==='Please be login'){
          localStorage.setItem('decision',0)
          history.push('/signin')
          setTimeout(()=>{toast.error(`${data.error}`, {
            position: "top-center",
          });},1000)
         
        }
    
    }
      
      useEffect(()=>{
        callViewhistoryPage()
      },[])
      
    
    return (
        <>
           <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>
        <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>TRANSACTION HISTORY</span>
  </Row></Container>
 <br/>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>S.No</th>
      <th>Item Name</th>
      <th>Item Decsription</th>
      <th>Actual Price</th>
      <th>Discount</th>
      <th>Discount price</th>
      <th>You save</th>
      <th>Status</th>
      <th>Purchased at</th>
    </tr>
  </thead>
  <tbody>
    
     Have not bought anything yet.
   
  </tbody>
</Table>
<br/><br/><br/><br/>
<Footer/>
<ToastContainer/>
        </>
    )
}

export default Viewhistory
