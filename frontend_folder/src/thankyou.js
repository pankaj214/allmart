import React from 'react'
import './index.css'
import { Row,Container } from "react-bootstrap";
import Footer from './footer';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from 'material-ui-rating';
const Thankyou = () => {
    return (
        <>
      <br/><br/>
            <Container className="thankback text-center">
    <Row>
        <div style={{paddingLeft:'30%'}}>
        <marquee className="text-center" style={{color:'black',fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>!!Thanks for purchasing!!</marquee>
        <br/>
        <form action='' method=''>
            <textarea className="suggestion" placeholder="Any suggestion?" style={{width:"100%",height:"20vh"}}></textarea>
            <input type='submit' value="Save"/>
        </form>
      
        <hr/>
        <h4 className='text-center'>
            Having trouble? <a href="/contact" style={{textDecoration:"underline",color:"blue"}}>Contact us</a>
        </h4>
        </div>
    </Row>
</Container>
<br/><br/>
<Footer/>
<ToastContainer/>
        </>
    )
}

export default Thankyou
