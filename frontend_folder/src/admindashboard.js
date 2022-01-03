import React, { useState,useEffect,Fragment } from "react";
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Admindashboard = () => {

  const history=useHistory()
  const [name,setName]  = useState('')


  const callDashboardPage=async()=>{
    const res=await fetch('http://localhost:5000/api/admindashboard',{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
    })

    const data=await res.json()
    if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/adminlogin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
    setName(data.adminid)
    

}
  
  useEffect(()=>{
      callDashboardPage()
  },[])
  

  return <Fragment>
 <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            <Button style={{backgroundColor:'#05386B'}} href="/adminlogout">Logout</Button>
            </div>
            </nav>
               
                <div style={{display:'flex',justifyContent:'center',textAlign:'center',marginTop:'2%'}}> 
                <h4 style={{fontWeight:'bold'}}>Hello,{name}</h4>
                   
                </div>
                <div style={{display:'flex',justifyContent:'center',textAlign:'center'}}> 
                <h4 style={{fontWeight:'bold'}}> Welcome to the admin dashboard</h4>
                   
                </div>
               
     
    <ToastContainer/>
  </Fragment>;
};
export default Admindashboard;


