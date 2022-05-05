import React,{useEffect,useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './footer.css'
import {useHistory} from 'react-router-dom'
import { Button,Container,Row,Dropdown } from 'react-bootstrap';
const Admineditprofile = () => {
  const history=useHistory()
  const [names,setNames] = useState('')

  const [user, setUser] = useState({
  adminid:"",
  admindateofbirth:"",
  adminphone:""
 });
      let name, value;
      const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
      };
    
      
      const handleClick = async (e) => {
        e.preventDefault();
        const { adminid,admindateofbirth,adminphone} = user;
        const id=names._id
        const res = await fetch("http://localhost:5000/api/admineditprofile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminid,
            admindateofbirth,
            adminphone,
            id
          }),
        });
    
        const data = await res.json();
        if (data.message ==="Profile updated") {
          toast.success(`${data.message}`, {
            position: "top-center",
          });
          setTimeout(() => {
            history.push("/admindashboard",{replace:true});
          }, 1000);
        } else {
          toast.error(`${data.error}`, {
            position: "top-center",
          });
        }
      };

  const callAdminEditProfile=async()=>{
    const res=await fetch('http://localhost:5000/api/checkadminLogin',{
       method:'GET',
       headers:{
   Accept:'application/json',
   'Content-Type':'application/json'
 },
   })
   const data=await res.json()
   setNames(data)
   if(data.error==='Please be login'){
       localStorage.setItem('decisions',0)
       history.push('/adminlogin')
       setTimeout(()=>{toast.error(`${data.error}`, {
         position: "top-center",
       });},1000)
      
     } }
     useEffect(()=>{
 callAdminEditProfile()
     },[])

    return (
        <>
        <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            <span style={{display:'flex',justifyContent:'right',textAlign:'center'}}>
        <Dropdown>
        
  <Dropdown.Toggle style={{color:'#05386B'}} id="dropdown-basic">
   <i className="fas fa-user">{names.adminid}</i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
  <img src={names.adminimage} alt="Profile" style={{width:'30%',height:'30%',marginLeft:'30%',borderRadius:'50%'}}/>
    <Dropdown.Item href="/admindashboard">Go to dashboard</Dropdown.Item>
    <Dropdown.Item href="/adminseeusers">See all users</Dropdown.Item>
    <Dropdown.Item href="/adminuserfeedback">See user feedback</Dropdown.Item>
    <Dropdown.Item href="/adminchangepassword">Change Password</Dropdown.Item>
    <Dropdown.Item href="/adminitemsdata">View products</Dropdown.Item>
    <Dropdown.Item href="/adminlogout">Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
       
        </span>
           
            </div>
            </nav>
            <marquee scrollAmount={20} style={{fontWeight:'bolder',fontSize:'25px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px'}}>Welcome to Admin Panel</marquee>
      <br/>
            <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>ADMIN PROFILE</span>
  </Row>
  </Container>
 <br/>
            <div className="container emp-profile">
   <form method="POST" encType="multipart/form-data">
     <div className="row">
       <div className="col-md-4">
       <img src={names.adminimage} alt="John" style={{width:'50%'}}/><br/>
       <h4 style={{marginTop:'2%',color:'#05386B'}}>Edit Profile Picture</h4>
       <input type="file" name="file" id="file" style={{color:'white',backgroundColor:'#05386B'}}/>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="adminid"><b>Name: </b></label>
         <input autoComplete="off" type="text" defaultValue={names.adminid} id="adminid" name="adminid" onChange={handleInputs}/>
         <label htmlFor="admindateofbirth"><b>Date of birth: </b></label>
         <input autoComplete="off" type="date" max="2013-01-01" min="1960-12-31" onKeyDown={(e)=>e.preventDefault()} defaultValue={names.admindateofbirth} id="admindateofbirth" name="admindateofbirth" onChange={handleInputs} style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }}/>
         <label htmlFor="adminphone"><b>Phone number: </b></label>
         <input autoComplete="off" type="tel" minLength={0} maxLength={10} defaultValue={names.adminphone} id="adminphone" name="adminphone" onChange={handleInputs} style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }}/>
    
         </div>
       </div>
     </div>
     <span className="row">
     <input type="submit" value="Update Profile" onClick={handleClick} style={{color:'white',backgroundColor:'#05386B'}}/>&nbsp;
     </span>
    
     </form>
</div>
<br/><br/>
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
        </>
    )
}

export default Admineditprofile
