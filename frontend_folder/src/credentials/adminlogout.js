import React, { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory} from 'react-router-dom'

const Adminlogout = () => {
    const history=useHistory()

    const callLogoutPage=async()=>{
        const res=await fetch('http://localhost:5000/api/adminlogout',{
          method:'GET',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
        })
    
        const data=await res.json()
        if(data.message==='you are logout'){
         localStorage.setItem('decisions',0)
          history.push('/adminlogin', {replace:true})
          setTimeout(()=>{toast.success(`${data.message}`, {
            position: "top-center",
          });},1000)
         
        }
        else if(data.error==='you are already logout'){
         localStorage.setItem('decisions',0)
          history.push('/adminlogin', {replace:true})
          setTimeout(()=>{toast.error(`${data.error}`, {
            position: "top-center",
          });},1000)
         
        }
    }

      useEffect(()=>{
          callLogoutPage()
      },[])

return(
    <>
    <span style={{textAlign:'center'}}>
        You are logout
    </span>
<ToastContainer/>
    </>
)
}

export default Adminlogout