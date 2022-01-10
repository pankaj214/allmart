import React, { useState,useEffect,Fragment } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import {Grid} from '@material-ui/core';
import Allmart from './images/allmart.png'
import './dashboard.css';
import bk6 from './images/bk6.jpeg';
import bk7 from './images/bk7.jpeg';
import bk8 from './images/bk8.jpeg';
import bk1 from './images/bk1.jpg';
import bk2 from './images/bk2.jpg';
import bk3 from './images/bk3.jpg';
import {Container,Image,Card,Button,Row,Col,Carousel,Table} from 'react-bootstrap';
import Footer from "./footer";

const Dashboard = () => {

  const history=useHistory()
  const [name,setName]  = useState('')

  const callDashboardPage=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      // credentials:'include'
    })

    const data=await res.json()
    setName(data.username)
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
  
  
  const handleBlog=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
      method:'GET',
      headers:{
  Accept:'application/json',
  'Content-Type':'application/json'
},
  })
  const data=await res.json()
  if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/signin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
   else{
     history.push('/addtocart')
   }
  }
  const handleBlog1=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
      method:'GET',
      headers:{
  Accept:'application/json',
  'Content-Type':'application/json'
},
  })
  const data=await res.json()
  if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/signin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
else{
  history.push('/viewmoreitem')
}
  }
  return <Fragment>
        <Appbar/>
        <span style={{display:'flex',justifyContent:'right',textAlign:'center',marginRight:'4%'}}>
        <Button style={{backgroundColor:'#05386B',color:'white'}} href="/logout_">Logout from all devices</Button>&nbsp;
        <Button style={{backgroundColor:'#05386B',color:'white'}} href="/viewhistory">ViewHistory</Button>
        </span>
        <div className="bhaihead">
    <h2 style={{fontWeight:500,borderStyle:'solid',fontFamily:'Brush Script MT, Brush Script Std, cursive'}}>Hello, {name ? name  : 'Hello'}</h2>
    <marquee direction="right" height="60" width="1360" bgcolor="transparent">
        <h1 style={{fontWeight:350}}>Welcome back to our dashboard</h1>
    </marquee>
    </div>
<Carousel>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={bk6}
    />
    <Carousel.Caption>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={bk3}
    />
    <Carousel.Caption>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={bk1}
    />
    <Carousel.Caption>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={bk2}
    />
    <Carousel.Caption>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100 h-10"
      src={bk7}
    />

    <Carousel.Caption>
      <h3>More Everyday essentials to explore</h3>
      <p>All items we have are pocket friendly.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100 h-10"
      src={bk8}
    />

    <Carousel.Caption>
      <h3>Inspired by your shopping trends</h3>
      <p>Trending near you , Popular near you</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<br/>
<Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>USER PROFILE</span>
  </Row>
  </Container>
 <br/>
 <div className="container emp-profile">
   <form method="POST" action="">
     <div className="row">
       <div className="col-md-4">
       <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" alt="John" style={{width:'50%'}}/><br/>
       <Button id="password" href="/change_password" style={{marginTop:'5%',color:'white',backgroundColor:'#05386B'}}>Change Password</Button>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="username"><b>Name: </b></label>
         <input type="text" name="username" id="username" value="Name"/>
         <label htmlFor="email"><b>Email id: </b></label>
         <input type="text" value="email id" name="email" id="email"/>
         <label htmlFor="userid"><b>User id: </b></label>
         <input type="text" value="user id" name="userid" id="userid"/>
         <label htmlFor="phonenumber"><b>Phone Number: </b></label>
         <input type="text" value="phone number" name="phonenumber" id="phonenumber"/>
         </div>
       </div>
     </div>
     <span className="row">
     <input type="submit" value="Update Profile" style={{color:'white',backgroundColor:'#05386B'}}/>&nbsp;
     </span>
     </form>
</div>
<br/><br/><br/>
<Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>RECOMMENDED ITEMS</span>
  </Row></Container>
<Grid container style={{marginTop:'-4%'}}>
                <Grid item xs={12} sm={6} md={4}>
                <div > 
    
<Card style={{margin:'20%',width:'60%'}}>
  <Card.Img variant="top"  style={{height:'25vh'}} src={Allmart} alt="Blog Photo"/>
  <Card.Body>
  <Card.Title style={{marginTop:'2%',textAlign:'center'}}>ITEM NAME</Card.Title>
  
  {/* Rating Code */}
  {/* <span style={{textAlign:'center'}}><Rating value={3} max={5} onChange={(value) => console.log(`Rated with value ${value}`)}
/></span> */}

<h5 style={{textAlign:'center'}}>₹2500</h5>
<span style={{textAlign:'center'}}>10% discount</span>
  <span style={{float:'left',marginTop:'4%'}}>  <span style={{textAlign:'center'}}>This is an electronic item then you should purchase.</span> </span> 
  <Button style={{float:'right', marginTop:'10%',backgroundColor:'orange',}} onClick={handleBlog}>Add To Cart</Button>
    <Button style={{marginTop:'10%',float:'left', backgroundColor:'#293659',}} onClick={handleBlog1}>View More</Button>
  </Card.Body>
</Card>
</div>
</Grid>
</Grid>
<Footer/>
    <ToastContainer/>
  </Fragment>;
};
export default Dashboard;
