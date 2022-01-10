import React, { useEffect, Fragment } from "react";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import './about.css';
import P from './images/pankaj.png'
import Pr from './images/pradeep.jpeg'
import Pu from './images/pushya.jpeg'
import Footer from "./footer";
const About = () => {
  const history=useHistory()
  const handleP=()=>{
    alert('Email: pchoubey822@gmail.com\nPhone: 9644605089');
  }
  const handlePr=()=>{
    alert('Email: pragyanshutayal2100@gmail.com\nPhone: 9575589724');
  }
  const handlePa=()=>{
    alert('Email: pk695283@gmail.com\nPhone: 8962434030');
  }
  const handlePu=()=>{
    alert('Email: pushyasingh.23@gmail.com\nPhone: 6269846106');
  }

  const callAboutusPage=async()=>{
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
      callAboutusPage()
  },[])
  
  
    return(
<Fragment>
<Appbar/>
<div className="about-section">
  <h1 style={{textDecoration:'underline',color: '#05386B'}}>About Us</h1>
  <p>Our website is one of the leading e-commerce sites in 
        the world in which we have to sell almost all types of
        products which are exits.Our global delivery service
        was also very trustable and currently, we reached up
        1 Lakh+ successful delivery in all over the world and
        our Customers are very to know that we give 5-10% discount
        on each and every product compare to retailer prices
        and also we have done your home delivery in 5-6 working days.
        we wish you all have a wonderful experience with us.</p>
</div>

<h2 style={{textAlign:'center'}}>Our Team</h2>

<div className="text-center" style={{width:'30%',marginLeft:'35%'}} >
    <div className="card">
      <img src={P} alt="Jane" style={{marginLeft:'25%',width:'50%'}}/>
      <div className="container">
        <h2>Pankaj Choubey</h2>
        <p className="title">Head of the Team(Allmart)</p>
        <p>Working on Backend</p>
        <p><button className="button" style={{backgroundColor:'#05386B'}} onClick={handleP}>Contact</button></p>
      </div>
    </div>
  </div>
<div className="row">

  <div className="column text-center">
    <div className="card">
      <img src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" alt="Mike" style={{marginLeft:'25%',width:'50%'}}/>
      <div className="container">
        <h2>Pragyanshu Tayal</h2>
        <p>Team Member(Allmart)</p>
        <p>Working on Frontend Design</p>
        <p><button className="button" style={{backgroundColor:'#05386B'}} onClick={handlePr}>Contact</button></p>
      </div>
    </div>
  </div>
  
  <div className="column text-center">
    <div className="card">
      <img src={Pr} alt="John" style={{marginLeft:'20%',width:'68%'}}/>
      <div className="container">
        <h2>Pradeep Kumar</h2>
        <p>Team Member(Allmart)</p>
        <p>Working on Documentation and web content</p>
        <p><button className="button"style={{backgroundColor:'#05386B'}} onClick={handlePa}>Contact</button></p>
      </div>
    </div>
  </div>

  <div className="column text-center">
    <div className="card">
      <img src={Pu} alt="John" style={{marginLeft:'28%',width:'45%'}}/>
      <div className="container">
        <h2>Pushya Singh</h2>
        <p>Team Member(Allmart)</p>
        <p>Working on Documentation and web content</p>
        <p><button className="button" style={{backgroundColor:'#05386B'}} onClick={handlePu}>Contact</button></p>
      </div>
    </div>
  </div>
</div>
<Footer/>
  <ToastContainer/>
</Fragment>
    );
}

export default About;
