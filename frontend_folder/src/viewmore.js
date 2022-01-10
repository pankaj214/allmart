import React,{useEffect } from 'react'
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Jumbotron,Button,Container } from "react-bootstrap";
import Footer from './footer';

const Viewmore=()=>{

 const history=useHistory()
 const callViewmore=async()=>{
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
callViewmore()
    },[])
    return(
        <>
        <Appbar/>
        <div className='text-center'>
<Button style={{backgroundColor:'#05386B',color:'white'}} href="/checkout">Buy</Button>
</div>
    <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Viewmore