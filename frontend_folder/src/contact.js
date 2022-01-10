import {Container,Row,Col} from 'react-bootstrap'
import Contacts from './images/contact.jpeg';
import React, {useEffect, Fragment } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import './dashboard.css'
import Footer from './footer';

const Contact = () => {

  const history=useHistory()


  const callContactPage=async()=>{
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
      callContactPage()
  },[])
  
    return(
<Fragment>
            <Appbar/>
           
<Container style={{marginTop:'2%',backgroundColor:'white'}}>
  <Row>
    <Col sm={6} lg={5}>
        <h2>Contact Us:</h2>   
        <div>
        <form action="" method="POST">
        <label htmlFor="name">Your Name: </label>
        <input type="text" id="name" name="name" value=""/>
        <label htmlFor="email">Email: </label>
        <input type="email" id="email" name="email" value=""/>
        <label htmlFor="phone">Phone: </label>
        <input type="number" id="phone" name="phone" value=""/>

        <label htmlFor="subject">Any Feedback/Suggestion</label>
        <textarea id="subject" name="subject" placeholder="Write something..." style={{height:200}}></textarea>

        <input type="submit" value="Submit"></input>

        </form>
        </div>
    </Col>
   <Col sm={6} lg={7}>
       <div style={{textAlign:'right',paddingTop:'18%'}}>    
        <img style={{height:400,width:600}} src={Contacts}/>
        </div>
  </Col>
  </Row>
</Container>
<Footer/>
    <ToastContainer/>
</Fragment>
    );
}

export default Contact;
