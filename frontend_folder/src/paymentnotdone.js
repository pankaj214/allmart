import React, { Fragment,useEffect } from "react";
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Paymentnotdone = () => {
  const history=useHistory()
  const callPaymentnotPage=async()=>{
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
  callPaymentnotPage()
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

      <h2 style={{display:'flex',textAlign:'center',justifyContent:'center',marginTop:'15%' ,color:'red'}}>
        !!Payment Not Done!! Your payment is pending or not success
      </h2>
      <ToastContainer/>
    </Fragment>
  );
};
export default Paymentnotdone;
