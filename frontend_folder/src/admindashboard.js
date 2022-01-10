import React, { useState,useEffect,Fragment } from "react";
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './footer.css'
const Admindashboard = () => {

  const history=useHistory()
  const [name,setName]  = useState('')


  const callDashboardPage=async()=>{
    const res=await fetch('http://localhost:5000/api/checkadminlogin',{
      method:'GET',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
    })

    const data=await res.json()
    if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/adminlogin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
    setName(data.adminid)
    

}
  
  useEffect(()=>{
      callDashboardPage()
  },[])
  

  return <Fragment>
 <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            <Button style={{backgroundColor:'#05386B'}} href="/adminlogout">Logout</Button>
            </div>
            </nav>
               
                <div style={{display:'flex',justifyContent:'center',textAlign:'center',marginTop:'2%'}}> 
                <h4 style={{fontWeight:'bold'}}>Hello,{name}</h4>
                   
                </div>
                <div style={{display:'flex',justifyContent:'center',textAlign:'center'}}> 
                <h4 style={{fontWeight:'bold'}}> Welcome to the admin dashboard</h4>
                   
                </div>
               
                <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Allmart.com <i>We are Allmart. </i>Our website is one of the leading e-commerce sites in 
        the world in which we have to sell almost all types of
        products which are exits.Our global delivery service
        was also very trustable and currently, we reached up
        1 Lakh+ successful delivery in all over the world and
        our Customers are very to know that we give 5-10% discount
        on each and every product compare to retailer prices
        and also we have done your home delivery in 5-6 working days.
        we wish you all have a wonderful experience with us.</p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="https://react-bootstrap.com">UI</a></li>
              <li><a href="https://nodejs.com">Node.js</a></li>
              <li><a href="https://reactjs.com">React JS</a></li>
              <li><a href="https://expressjs.com">Express JS</a></li>
              <li><a href="https://axios.com">Axios</a></li>
              <li><a href="https://mongodb.com">MongoDB</a></li>
            </ul>
          </div>

        
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved by 
         <a href="/"> All Mart</a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa fa-twitter"></i></a></li>
              <li><a className="dribbble" href="#"><i className="fa fa-dribbble"></i></a></li>
              <li><a className="linkedin" href="#"><i className="fa fa-linkedin"></i></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
    <ToastContainer/>
  </Fragment>;
};
export default Admindashboard;


