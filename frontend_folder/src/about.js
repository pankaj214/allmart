import React, { useEffect, Fragment } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import { Jumbotron,Button,Container } from "react-bootstrap";

const About = () => {
  const history=useHistory()


  const callAboutusPage=async()=>{
    const res=await fetch('http://localhost:5000/api/about',{
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
      callAboutusPage()
  },[])
  
  
  return <Fragment>
        <Appbar/>

        <Jumbotron>
      <h1>Regular, Jumbotron!</h1>
      <p>
        This is a simple Jumbotron example.
      </p>
  
      <p>
        <Button variant="primary">
          Primary Button
        </Button>
      </p>
    </Jumbotron>
    <br/>
    <Jumbotron fluid>
      <Container>
        <h1>Fluid jumbotron !</h1>
        <p>
           This is a modified fluid jumbotron which
           stretches the whole horizontal space.    
        </p>
        <Button variant="primary">
         Primary Button
        </Button>
      </Container>
    </Jumbotron>

  <ToastContainer/>
  </Fragment>;
};

export default About;
