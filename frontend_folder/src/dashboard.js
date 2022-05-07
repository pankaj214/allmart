import React, { useState,useEffect,Fragment } from "react";
import {useHistory,Link} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import {Typography,AccordionSummary,AccordionDetails,Accordion,Grid} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Allmart from './images/allmart.png'
import './dashboard.css';
import bk6 from './images/bk6.jpeg';
import bk7 from './images/bk7.jpeg';
import bk8 from './images/bk8.jpeg';
import bk1 from './images/bk1.jpg';
import bk2 from './images/bk2.jpg';
import bk3 from './images/bk3.jpg';
import ac from './images/ac.jpg';
import ac1 from './images/ac1.jpg';
import ac2 from './images/ac2.jpg';
import ac3 from './images/ac3.jpg';
import formal from './images/formal.jpg';
import formal1 from './images/formal1.jpg';
import formal2 from './images/formal2.jpg';
import tv from './images/tv.jpg';
import tv1 from './images/tv1.jpg';
import mobile from './images/mobile.jpg';
import npci from './images/npci.jpg';
import paytm from './images/paytm.jpg';
import upi from './images/upi.jpg';
import instamojo from './images/instamojo.jpg';
import razorpay from './images/razorpay.jpg';
import {Container,Image,Card,Dropdown,Button,Row,Col,Carousel,Table} from 'react-bootstrap';
import Footer from "./footer";

const Dashboard = () => {

  const history=useHistory()
  const [name,setName]  = useState('')
  const [itemdata,setItemdata] = useState([])


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
    setName(data)
    if(data.error==='Please be login'){
      localStorage.setItem('decision',0)
      history.push('/signin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
    
}
  
const callModal=()=>{
  toast.info(`Hello,\n\n Welcome back`,{
    position:"top-center",
  })
}

const fetchItemData=async()=>{
  const res=await fetch('http://localhost:5000/api/recommendhome',{
    method:'GET',
    headers:{
Accept:'application/json',
'Content-Type':'application/json'
},
})

const data=await res.json()
setItemdata(data)
}
  useEffect(()=>{
      callDashboardPage()
      callModal()
      fetchItemData()
  },[])
  
  
  const handleBlog=async(e,id)=>{
    e.preventDefault()
    const email = name.email
    const itemid = id
    const res = await fetch("http://localhost:5000/api/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       email,
        itemid
      }),
    });

    const data = await res.json();
    if (data.message ==="Added") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        history.push({
          pathname:'/addtocart',
        state:email
      })
      }, 1000);
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
   
  }
  const handleBlog1=(e,itemid)=>{
    e.preventDefault()
    localStorage.setItem('email',name.email)
           history.push({
             pathname:'/viewmoreitem',
             state:itemid
           })
  }

  localStorage.setItem('userimage',name.userimage)

  return <Fragment>
        <Appbar/>
        <span style={{display:'flex',justifyContent:'right',textAlign:'center',marginRight:'4%'}}>
        <Dropdown>
  <Dropdown.Toggle style={{color:'#05386B'}} id="dropdown-basic">
   <i className="fas fa-user">{name.userid}</i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
  <img src={name.userimage} alt="Profile" style={{width:'30%',height:'30%',marginLeft:'30%',borderRadius:'50%'}}/>
    <Dropdown.Item href="/user_profile">Edit profile</Dropdown.Item>
    <Dropdown.Item href="/change_password">Change password</Dropdown.Item>
    <Dropdown.Item href="/view_history">Transactions</Dropdown.Item>
    <Dropdown.Item ><Link
  to={{
    pathname: "/addtocart",
    state: name.email
  }}
>Cart products</Link></Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
       
        </span>
        <div className="bhaihead">
        <marquee direction="left" height="60" width="1360" bgcolor="transparent">
        <h1 style={{fontWeight:350}}>Welcome back to our AllMart</h1>
    </marquee>
        <marquee direction="right" height="60" width="1360" bgcolor="transparent">    
        <h2 style={{fontWeight:500,borderStyle:'solid',fontFamily:'Brush Script MT, Brush Script Std, cursive'}}>Enables brands to cover every step of the buyer's journey..</h2></marquee>
    </div>
<Carousel > 
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={bk6}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={ac}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={ac1}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={ac2}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={ac3}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={formal}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={formal1}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={formal2}
    />
    <Carousel.Caption style={{color:'black'}}>
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
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={tv}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={tv1}
    />
    <Carousel.Caption style={{color:'black'}}>
      <h3>Clothing Gears</h3>
      <p>All brands are available to see
           , Lets Grab it
      </p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100"
      src={mobile}
    />
    <Carousel.Caption style={{color:'black'}}>
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
    <Carousel.Caption style={{color:'black'}}>
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
    <Carousel.Caption style={{color:'black'}}>
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

    <Carousel.Caption style={{color:'black'}}>
      <h3>More Everyday essentials to explore</h3>
      <p>All items we have are pocket friendly.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item style={{height:"70vh"}}>
    <img
      className="d-block w-100 h-10"
      src={bk8}
    />

    <Carousel.Caption style={{color:'black'}}>
      <h3>Inspired by your shopping trends</h3>
      <p>Trending near you , Popular near you</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
<br/><br/>
<h5 style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>Some Payment modes</h5>
<Grid container>
  <Grid item xs={12} sm={6} md={2}>
  <Card style={{margin:'40%',width:'95%'}} >
  <Card.Img variant="top" style={{height:'35vh'}} src={npci} alt="NPCI"/>
 
</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
  <Card style={{margin:'40%',width:'95%'}} >
  <Card.Img variant="top" style={{height:'35vh'}} src={upi} alt="UPI"/>
 
</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
  <Card style={{margin:'40%',width:'95%'}} >
  <Card.Img variant="top" style={{height:'35vh'}} src={paytm} alt="PAYTM"/>
 
</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
  <Card style={{margin:'40%',width:'95%'}} >
  <Card.Img variant="top" style={{height:'35vh'}} src={razorpay} alt="RAZORPAY"/>
 
</Card>
  </Grid>
  <Grid item xs={12} sm={6} md={2}>
  <Card style={{margin:'40%',width:'95%'}} >
  <Card.Img variant="top" style={{height:'35vh'}} src={instamojo} alt="INSTAMOJO"/>
 
</Card>
  </Grid>
</Grid>


<br/><br/><br/>
<Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>RECOMMENDED ITEMS</span>
  </Row></Container>
<Grid container style={{marginTop:'-4%'}}>
{itemdata.map((item,index)=>{
      return(
        <Grid item xs={12} sm={6} md={4} key={item._id}>
        <div > 
<Card style={{margin:'20%',width:'60%'}} >
  <Card.Img variant="top" style={{height:'25vh'}} src={item.itempicture} alt="Blog Photo"/>
  <Card.Body style={{overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis'}}>
  <Card.Title style={{marginTop:'2%',textAlign:'center',overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis'
}} >{item.itemname}</Card.Title>

<h5 style={{textAlign:'center'}}>₹{item.itemprice}</h5>
<h6 style={{textAlign:'center'}}>{item.itemdiscount}% discount</h6>
  <h4 style={{float:'left',marginTop:'4%',}}>  <span style={{textAlign:'center'}}>{item.itemdescription}</span> </h4> 
  <Button style={{float:'right', marginTop:'10%',backgroundColor:'orange',}} onClick={(e)=>handleBlog(e,item._id)}>Add To Cart</Button>
    <Button style={{marginTop:'10%',float:'left', backgroundColor:'#293659',}} onClick={(e)=>handleBlog1(e,item._id)}>View More</Button>
  </Card.Body>
</Card>
</div>
</Grid>
      )
    })}
</Grid>
<h5 style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>Frequently asked questions:(FAQ)</h5>
<br/>
<Accordion style={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            If suddenly the payment gateway will stopped and deduct the amount then what we will do?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Don't worry,in that situation website owners will check the conditions and take the action within 1-2 working days for returning the deduct amount.</Typography>
        </AccordionDetails>
       
      </Accordion>
      <Accordion style={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            When we will get the feedback/suggestion solutions?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>According to the website,if the query makes any sense then you will receive the solutions within 2-3 working days.</Typography>
        </AccordionDetails>
       
      </Accordion>
     <br/>
      <br/>
<Footer/>
    <ToastContainer/>
  </Fragment>;
};
export default Dashboard;
