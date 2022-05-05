import React,{useEffect,useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from './appbar'
import Footer from './footer'
import {useHistory} from 'react-router-dom'
import { Button,Container,Row } from 'react-bootstrap';
const Editprofile = () => {
  const history=useHistory()
  const [datas,setDatas] = useState('')

  const [user, setUser] = useState({
    username:"",
  dateofbirth:"",
addressfororders:"",
email:""
 });
      let name, value;
      const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
      };
    
      
      const handleClick = async (e) => {
        e.preventDefault();
        const { username,dateofbirth,addressfororders } = user;
        const email=datas.email;
        const res = await fetch("http://localhost:5000/api/editprofile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            dateofbirth,
            addressfororders,
            email
          }),
        });
    
        const data = await res.json();
        if (data.message ==="Profile updated") {
          toast.success(`${data.message}`, {
            position: "top-center",
          });
          setTimeout(() => {
            history.push("/dashboard",{replace:true});
          }, 1000);
        } else {
          toast.error(`${data.error}`, {
            position: "top-center",
          });
        }
      };
const handleDelete=async(e)=>{
  e.preventDefault();
  const email=datas.email;
  const ok=await window.confirm("Are you sure you want to delete this profile if you click Ok then can't withdraw delete profile request.")
  if(ok){
  const res = await fetch("http://localhost:5000/api/deleteprofile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email
    }),
  });

  const data = await res.json();
  if (data.message ==="Your delete request send to website admin if, further process will done then you receive the mail.") {
    toast.success(`${data.message}`, {
      position: "top-center",
    });
    setTimeout(() => {
      history.push("/user_profile",{replace:true});
    }, 1000);
  } else {
    toast.error(`${data.error}`, {
      position: "top-center",
    });
  }}else{
    return false
  }
}    
  const callEditProfile=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
       method:'GET',
       headers:{
   Accept:'application/json',
   'Content-Type':'application/json'
 },
   })
   const data=await res.json()
   setDatas(data)
   if(data.error==='Please be login'){
       localStorage.setItem('decisions',0)
       history.push('/signin')
       setTimeout(()=>{toast.error(`${data.error}`, {
         position: "top-center",
       });},1000)
      
     } }
     useEffect(()=>{
 callEditProfile()
     },[])

    return (
        <>
        <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>
      <br/>
            <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>USER PROFILE</span>
  </Row>
  </Container>
 <br/>
            <div className="container emp-profile">
   <form method="POST" encType="multipart/form-data">
     <div className="row">
       <div className="col-md-4">
       <img src={datas.userimage} alt="John" style={{width:'50%'}}/><br/>
       <h4 style={{marginTop:'2%',color:'#05386B'}}>Edit Profile Picture</h4>
       <input type="file" name="userimage" id="userimage" style={{color:'white',backgroundColor:'#05386B'}}/>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="username"><b>Name: </b></label>
         <input type="text" autoComplete="off" defaultValue={datas.username} id="username" name="username" onChange={handleInputs}/>
         <label htmlFor="dateofbirth"><b>Date of birth: </b></label>
         <input type="date" autoComplete="off" max="2013-01-01" min="1960-12-31" onKeyDown={(e)=>e.preventDefault()} defaultValue={datas.dateofbirth} id="dateofbirth" name="dateofbirth" onChange={handleInputs} style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }}/>
         <label htmlFor="addressfororders"><b>Address for orders: </b></label>
         <textarea autoComplete="off" defaultValue={datas.addressfororders} id="addressfororders" name="addressfororders" placeholder="Write address" onChange={handleInputs}></textarea>

         <marquee style={{fontWeight:'bolder',fontSize:'20px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>You can not edit below details because they all are verified.</marquee><br/>

         <label htmlFor="email"><b>Email id: </b></label>
         <input type="email" value={datas.email} name="email" id="email" readOnly onChange={handleInputs}/>
         <label htmlFor="userid"><b>User id: </b></label>
         <input type="text" value={datas.userid} name="userid" id="userid" readOnly onChange={handleInputs}/>
         <label htmlFor="phonenumber"><b>Phone Number: </b></label>
         <input type="tel" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} value={datas.phone} name="phonenumber" id="phonenumber" readOnly onChange={handleInputs}/>
         </div>
       </div>
     </div>
     <span className="row">
     <input type="submit" value="Update Profile" onClick={handleClick} style={{color:'white',backgroundColor:'#05386B'}}/>&nbsp;
     <input type="submit" value="Delete Profile" onClick={handleDelete} style={{color:'white',backgroundColor:'#05386B'}}/>&nbsp;
     </span>
    
     </form>
</div>
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Editprofile
