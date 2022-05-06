import React,{useState,useEffect } from 'react'
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row,Col,Button,Container } from "react-bootstrap";
import Footer from './footer';
import Rating from 'material-ui-rating'
const Viewmore=(props)=>{

 const history=useHistory()
 const [itemdata,setItemdata] = useState([])
 const [yousave,setYousave] = useState('')
 const [dealprice,setDealprice] = useState('')
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
     
    useEffect(()=>{
callViewmore()
callItemdata()
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

        <Container style={{borderRadius: '5px',
    backgroundColor: '#f2f2f2',color:'black',
    padding: '20px'}}>
    <Row>
      <Col>
      
      </Col>
        <Col lg={7} sm={6}>
        <img src={itemdata.itempicture} className="img-fluid"style={{border:"2px solid black"}} width="500" height="600" />
        </Col>
        <Col style={{float:"right"}} lg={4} sm={6}>
        <h3>{itemdata.itemname}</h3>
        <h5>Category: {itemdata.itemcategory}</h5>
  <Rating value={3} max={5} onChange={(value) => console.log(`Rated with value ${value}`)}
/>
        <h4>M.R.P.: <strike style={{color:'red'}}>{itemdata.itemprice}</strike></h4>
        <h5>Discount: {itemdata.itemdiscount}%</h5>
        <h4>Deal Price: <span style={{color:'green'}}>₹{dealprice}</span></h4>
        <h4>You save: <span style={{color:'green'}}>₹{yousave}</span></h4>
        <h5>(Inclusive of all taxes)</h5>
        <Button href="/checkout" style={{color:"white", margin: "5%", boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",backgroundColor:'#05386B'}}><h4>Buy</h4></Button><strong>(in stock)</strong>
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