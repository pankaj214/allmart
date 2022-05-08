import React,{useState,useEffect } from 'react'
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row,Col,Button,Container,Card } from "react-bootstrap";
import Footer from './footer';
import npci from './images/npci.jpg';
import razorpay from './images/razorpay.jpg';
import Rating from 'material-ui-rating'
import {Grid} from '@material-ui/core'
const Viewmore=(props)=>{

 const history=useHistory()
 const [itemdata,setItemdata] = useState([])
 const [yousave,setYousave] = useState('')
 const [dealprice,setDealprice] = useState('')
 const [ratings,setRatings] = useState(0)
 const [emails,setEmails] = useState('')
 const callViewmore=async()=>{
   const res=await fetch('http://localhost:5000/api/checkLogin',{
      method:'GET',
      headers:{
  Accept:'application/json',
  'Content-Type':'application/json'
},
  })
  const data=await res.json()
  setEmails(data)
  if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/signin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    } }
       const callItemdata=async()=>{
          const itemid=props.location.state
        const res = await fetch(`http://localhost:5000/api/callhome/${itemid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const data = await res.json();
        const value=(data.itemdiscount*data.itemprice)/100
        const value1=data.itemprice-value
        setYousave(value)
        setDealprice(value1)
        setItemdata(data)
      }

      const handleRating=async(value)=>{
              const res=await fetch(`http://localhost:5000/api/ratings/${value}/${itemdata._id}/${emails.email}`)

              const data=await res.json()
              if(data.message==='Successfully rated'){
                setTimeout(()=>{toast.success(`${data.message}`, {
                  position: "top-center",
                });},1000)
               
              }
              else if(data.message==='Rating updated'){
                setTimeout(()=>{toast.success(`${data.message}`, {
                  position: "top-center",
                });},1000)
               
              }
              else{
                setTimeout(()=>{toast.error(`${data.error}`, {
                  position: "top-center",
                });},1000)
               
              }
      }

      const callRating=async()=>{
        const itemid=props.location.state
        const res=await fetch(`http://localhost:5000/api/viewratings/${itemid}/${localStorage.getItem('email')}`)
        const data=await res.json()
        setRatings(data.ratingvalue)
      }
      const handlecallPurchase=(e,dealprice,itemid,itemname)=>{
        e.preventDefault()
        const array=[itemid,dealprice,emails.email,emails.phone,emails.username,itemname]
        history.push({
          pathname:'/checkout',
          state:array
        })
      }
     
    useEffect(()=>{
callViewmore()
callItemdata()
callRating()
    },[])
  
    return(
        <>
        
        <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>
        <br/>
        <marquee scrollAmount={30} style={{opcaity:0.6,fontSize:20,fontWeight:'bold'}}>**You have select and purchase only one product at a time of the allmart.**</marquee>

        <Grid container>
  <Grid item xs={12} sm={6} md={6}>
  <Card style={{width:'55%'}} >
  <Card.Img variant="top" style={{height:'10vh'}} src={npci} alt="NPCI"/>
  </Card>
  </Grid>

  <Grid item xs={12} sm={6} md={6}>
  <Card style={{width:'55%'}} >
  <Card.Img variant="top" style={{height:'10vh'}} src={razorpay} alt="RAZORPAY"/>
 
</Card>
  </Grid>
</Grid>

        <Container style={{borderRadius: '5px',
    backgroundColor: '#f2f2f2',color:'black',
    padding: '20px'}}>
    <Row>
      
        <Col lg={7} sm={6}>
        <img src={itemdata.itempicture} className="img-fluid"style={{border:"2px solid black"}} width="500" height="600" />
        </Col>
        <Col style={{float:"right"}} lg={4} sm={6}>
        <h3>{itemdata.itemname}</h3>
        <h5>Category: {itemdata.itemcategory}</h5>

  <Rating value={ratings} max={5} onChange={(value)=>handleRating(value)}
/><h4 style={{fontWeight:'bold',color:'#ffcc00'}}>{ratings>0 ?  `You have rated: ${ratings}`:`No rating`}</h4>

        <h4>M.R.P.: <strike style={{color:'red'}}>₹{itemdata.itemprice}</strike></h4>
        <h5>Discount: {itemdata.itemdiscount}%</h5>
        <h4>Deal Price: <span style={{color:'green'}}>₹{dealprice}</span></h4>
        <h4>You save: <span style={{color:'green'}}>₹{yousave}</span></h4>
        <h5>(Inclusive of all taxes)</h5>
        <Button onClick={(e)=>handlecallPurchase(e,dealprice,itemdata._id,itemdata.itemname)} style={{color:"white", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",backgroundColor:'#05386B'}}><h4>Go to buy now</h4></Button><strong>(in stock)</strong>
        </Col>
    </Row>
    <br/>
    <Row>
      <h3>About this Item</h3>
      </Row>
    <Row>
    <p>{itemdata.itemdescription}</p>
    </Row>
</Container>
    <br/><br/>
    <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Viewmore