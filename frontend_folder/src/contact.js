import {Container,Row,Col} from 'react-bootstrap'
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
  const [names,setNames]  = useState('')
  const [contactdata,setContactdata] = useState([])

  const [user, setUser] = useState({
    iname: "",
    iprice: "",
    idiscount: "",
    idescription: "",
    icategory: ""  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  
  const handleClick = async (e) => {
    e.preventDefault();
    const { iname,iprice,idiscount,idescription,icategory } = user;
    const res = await fetch("http://localhost:5000/api/adminitemdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iname,
        iprice,
        idiscount,
        idescription,
        icategory,
      }),
    });

    const data = await res.json();
    if (data.message === "Uploaded") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        history.push("/adminitemsdata",{replace:true});
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
    setContactdata(data._id)
    console.log(contactdata)
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
           <br/>
<Container style={{marginTop:'2%',backgroundColor:'white'}}>
  <Row>
    <Col sm={6} lg={5}>
        <h2>Contact Us:</h2>   
        <div>
        <form method="POST">
        
        <TextField variant="outlined"
          margin="normal"
          type="text"
          fullWidth
          id="name"
          label="Your Name"
          onChange={handleInputs}
          name="name"
          autoComplete="off"
          autoFocus/>
        <TextField variant="outlined"
          margin="normal"
          type="email"
          fullWidth
          id="email"
          label="Your Email ID"
          onChange={handleInputs}
          name="email"
          autoComplete="off"
          autoFocus/>
        <TextField variant="outlined"
          margin="normal"
          type="number"
          fullWidth
          id="phone"
          label="Your Phone Number"
          onChange={handleInputs}
          name="phone"
          autoComplete="off"
          autoFocus/>
        <label htmlFor="subject">Any Feedback/Suggestion</label>
        <textarea id="subject" name="subject" placeholder="Write something..." style={{height:200}}></textarea>

        <input type="submit" value="Submit"/>

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
