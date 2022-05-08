import React,{useEffect} from 'react'
import './index.css'
import { Row,Container } from "react-bootstrap";
import Footer from './footer';
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Thankyou = () => {
    const history=useHistory()

    const callThankyou=async()=>{
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
   callThankyou()
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
      <br/><br/>
            <Container className="thankback text-center">
    <Row>
        <div style={{paddingLeft:'30%'}}>
        <marquee className="text-center" style={{color:'green',fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>!!PAYMENT SUCCESS!!</marquee>
        <br/>
      
        <h4 className='text-center'>
            Having trouble? <a href="/contact" style={{textDecoration:"underline",color:"blue"}}>Contact us</a>
        </h4>
        <h4 className='text-center'>
        Go to <a href="/dashboard" style={{textDecoration:'underline',color:'blue'}}>Dashboard</a>
        </h4>
        </div>
    </Row>
</Container>
<br/><br/>
<Footer/>
<ToastContainer/>
        </>
    )
}

export default Thankyou
