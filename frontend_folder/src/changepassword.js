import React, {useEffect, Fragment,useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from './appbar';
import {useHistory} from 'react-router-dom'
import {Row,Container,Button} from 'react-bootstrap'
import Footer from './footer';
const Changepassword = () => {
  const history=useHistory()
  const [profile,setProfile] = useState('')
  const [user, setUser] = useState({
    currentpassword:"",
    newpassword:"",
    renewpassword:"" });
      let name, value;
      const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
      };
    
      
      const handleClick = async (e) => {
        e.preventDefault();
        const email = profile.email;
        const { currentpassword,newpassword,renewpassword} = user;
        const res = await fetch("http://localhost:5000/api/changepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            currentpassword,
            newpassword,
            renewpassword
          }),
        });
    
        const data = await res.json();
        if (data.message ==="Password updated successfully") {
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
    

  const callChangePassword=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
       method:'GET',
       headers:{
   Accept:'application/json',
   'Content-Type':'application/json'
 },
   })
   const data=await res.json()
   setProfile(data)
   if(data.error==='Please be login'){
       localStorage.setItem('decisions',0)
       history.push('/signin')
       setTimeout(()=>{toast.error(`${data.error}`, {
         position: "top-center",
       });},1000)
      
     } }
     useEffect(()=>{
 callChangePassword()
     },[])

    return (
        <Fragment>
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
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>CHANGE PASSWORD</span>
  </Row>
  </Container>
  <br/>
            <div className="container emp-profile">
   <form method="POST">
     <div className="row">
       <div className="col-md-4">
       <img src={profile.userimage} alt="John" style={{width:'50%'}}/>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="currentpassword"><b>Enter Current Password: </b></label>
         <input type="password" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} value={user.currentpassword} onChange={handleInputs} name="currentpassword" id="currentpassword"/>
         <label htmlFor="newpassword"><b>Enter New Password: </b></label>
         <input type="password" name="newpassword" id="newpassword" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} value={user.newpassword} onChange={handleInputs}/>
         <label htmlFor="renewpassword"><b>Enter Re-new Password: </b></label>
         <input type="text" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} name="renewpassword" id="renewpassword" value={user.renewpassword} onChange={handleInputs}/>
         <input type="submit" value="Save" style={{color:'white',backgroundColor:'#05386B'}} onClick={handleClick}/>
         </div>
       </div>
     </div>
     
     </form>
</div>
<br/>
<Footer/>
<ToastContainer/>
        </Fragment>
    )
}

export default Changepassword
