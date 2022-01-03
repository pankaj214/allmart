import React, {useEffect, Fragment } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";

const Contact = () => {

  const history=useHistory()


  const callContactPage=async()=>{
    const res=await fetch('http://localhost:5000/api/contact',{
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
      callContactPage()
  },[])
  

  return <Fragment>
            <Appbar/>

    <span style={{textAlign:'center'}}>Contact Page</span>
    <ToastContainer/>
  </Fragment>;
};

export default Contact;
