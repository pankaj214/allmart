import React,{useState,useEffect } from 'react'
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row,Col,Button,Container } from "react-bootstrap";
import Footer from './footer';
import Rating from 'material-ui-rating'
const Viewmore=()=>{

 const history=useHistory()
 const callViewmore=async()=>{
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
     
    } }
    useEffect(()=>{
callViewmore()
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
        <br/><br/>
        <Container style={{borderRadius: '5px',
    backgroundColor: '#f2f2f2',color:'black',
    padding: '20px'}}>
    <Row>
        <Col lg={7} sm={6}>
        <img src="https://m.media-amazon.com/images/I/81leb5g4asL._SL1500_.jpg" class="img-fluid"style={{border:"2px solid black"}} width="500" height="600" />
        </Col>
        <Col style={{float:"right"}} lg={4} sm={6}>
        <h3>Redmi Note 10S 
              (Deep Sea Blue, 8GB RAM,
              128 GB Storage) - Super 
              Amoled Display 
              | 64 MP Quad Camera | 
              Alexa Built in</h3>
        <p>Brand Redmi</p>
  <Rating value={3} max={5} onChange={(value) => console.log(`Rated with value ${value}`)}
/>
        <h4>M.R.P.: <strike style={{color:'red'}}>₹20,999.00</strike></h4>
        <h5>Discount: 16%</h5>
        <h4>Deal Price: <span style={{color:'green'}}>₹17,499.00</span></h4>
        <h4>You save: <span style={{color:'green'}}>₹3,500.00</span></h4>
        <h5>(Inclusive of all taxes)</h5>
        <Button href="/checkout" style={{color:"white", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",backgroundColor:'#05386B'}}><h4>Buy</h4></Button><strong>(in stock)</strong>
        </Col>
    </Row>
    <br/>
    <Row>
      <h3>About this Item</h3>
      </Row>
    <Row>
    <p>Display: FHD+ 1080x2400 AMOLED Dot display; 16.33 centimeters 6.43 inch; 20:9 aspect ratio
        Camera: 64 MP Quad Rear camera with 8MP Ultra-wide, 2MP Macro and Portrait lens 13 MP Front camera
        Processor: MediaTek Helio G95 Octa-core; 12nm process; Up to 2.05GHz clock speed
        Battery: 5000 mAh large battery with 33W fast charger in-box and Type-C connectivity
        Memory, Storage and SIM: 8GB RAM 128GB UFS 2.2 storage expandable up to 512GB with dedicated SD 
        card slot Dual SIM nano+nano dual standby 4G+4G.</p>
    </Row>
</Container>
    <br/><br/>
    <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Viewmore