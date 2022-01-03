import React,{useEffect } from 'react'
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Viewmore=()=>{

 const history=useHistory()
   
    return(
        <>
        <Appbar/>
        Purchased
        <ToastContainer/>
        </>
    )
}

export default Viewmore