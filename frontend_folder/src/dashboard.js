import React, { useEffect,Fragment } from "react";
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";

const Dashboard = () => {

  const history=useHistory()


  const callDashboardPage=async()=>{
    const res=await fetch('http://localhost:5000/api/dashboard',{
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
      callDashboardPage()
  },[])
  

  return <Fragment>
        <Appbar/>

        <div style={{display:'flex',justifyContent:'right',textAlign:'center',marginRight:'4%' }}>

        <Button style={{backgroundColor:'#05386B'}} href="/logout_">Logout from all devices</Button>

        </div>

    <ToastContainer/>
  </Fragment>;
};
export default Dashboard;
