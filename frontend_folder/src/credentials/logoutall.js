import React, { useEffect,useContext } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Appbar from "../appbar";

const Logoutall = () => {
    const history=useHistory()
    const {state,dispatch}=useContext(UserContext)

    const callLogoutallPage=async()=>{
        const res=await fetch('http://localhost:5000/api/logoutall',{
          method:'GET',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          // credentials:'include'
        })
    
        const data=await res.json()
        if(data.message==='Now,you are logout'){
         dispatch({type:'USER',payload:false})
         localStorage.setItem('decision',0)
         localStorage.removeItem('state')
          history.push('/signin', {replace:true})
          setTimeout(()=>{toast.success(`${data.message}`, {
            position: "top-center",
          });},1000)
         
        }
        else if(data.error==='You are already logout'){
                dispatch({type:'USER',payload:false})
                localStorage.removeItem('state')
                localStorage.setItem('decision',0)
                 history.push('/signin', {replace:true})
                 setTimeout(()=>{toast.error(`${data.error}`, {
                   position: "top-center",
                 });},1000)
                
               }
        
    
    }
    

      useEffect(()=>{
          callLogoutallPage()
      },[])

return(
    <>
            <Appbar/>

    <span style={{textAlign:'center'}}>
        You are logout
    </span>
<ToastContainer/>
    </>
)
}

export default Logoutall