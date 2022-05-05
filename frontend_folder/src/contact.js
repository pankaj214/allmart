import {Container,Row,Col,Button} from 'react-bootstrap'
import Contacts from './images/contact.jpeg';
import React, {useEffect, Fragment,useState } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import './dashboard.css'
import Footer from './footer';
import {TextField} from '@material-ui/core'
const Contact = () => {
  const history=useHistory()
  const [itemdata,setItemdata] = useState('')
  const [user, setUser] = useState({
feedback:"" });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  
  const handleClick = async (e) => {
    e.preventDefault();
    const username = itemdata.username;
    const email = itemdata.email;
    const phone = itemdata.phone;
    const { feedback } = user;
    const res = await fetch("http://localhost:5000/api/contactdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        feedback
      }),
    });

    const data = await res.json();
    if (data.message ==="Please check your mail") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        history.push("/",{replace:true});
      }, 1000);
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
  };

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
    setItemdata(data)
   

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
        <div>
        <form method="POST">
        <label htmlFor="name">Your Name:</label>
        <input type="text" readOnly onChange={handleInputs} id="name" name="name" value={itemdata.username}/>
         <label htmlFor="email">Your Email ID:</label>
        <input type="email" readOnly onChange={handleInputs} id="email" name="email" value={itemdata.email}/>
          <label htmlFor="phone">Your Phone:</label>
        <input type="number" readOnly onChange={handleInputs} id="phone" name="phone" value={itemdata.phone}/>
        <label htmlFor="feedback">Any Feedback/Suggestion/Query</label>
        <textarea id="feedback" required name="feedback" placeholder="Write something..." style={{height:200}} value={user.feedback} onChange={handleInputs}></textarea>

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#05386B", color: "white" }}
          onClick={handleClick}
        >
          Submit
        </Button>
        </form>
        <br/>
        </div>
    </Col>
   <Col sm={6} lg={7}>
       <div style={{textAlign:'right',paddingTop:'18%'}}>    
        <img style={{height:400,width:600}} src={Contacts}/>
        </div>
  </Col>
  </Row>
</Container>
<br/>
<Footer/>
    <ToastContainer/>
</Fragment>
    );
}

export default Contact;
