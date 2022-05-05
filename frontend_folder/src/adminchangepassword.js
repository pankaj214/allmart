import React, {useEffect, Fragment,useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useHistory} from 'react-router-dom'
import './footer.css'
import {Row,Container,Button,Dropdown} from 'react-bootstrap'
const Adminchangepassword = () => {
  const history=useHistory()
  const [names,setNames] = useState('')
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
        const adminid = names.adminid;
        const { currentpassword,newpassword,renewpassword} = user;
        const res = await fetch("http://localhost:5000/api/adminchangepassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminid,
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
            history.push("/admindashboard",{replace:true});
          }, 1000);
        } else {
          toast.error(`${data.error}`, {
            position: "top-center",
          });
        }
      };
    

  const callAdminChangePassword=async()=>{
    const res=await fetch('http://localhost:5000/api/checkadminlogin',{
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
 callAdminChangePassword()
     },[])

    return (
        <Fragment>
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
    <Dropdown.Item href="/admineditprofile">Edit Profile</Dropdown.Item>
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
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>CHANGE PASSWORD</span>
  </Row>
  </Container>
  <br/>
            <div className="container emp-profile">
   <form method="POST">
     <div className="row">
       <div className="col-md-4">
       <img src={names.adminimage} alt="John" style={{width:'50%'}}/>
       </div>
       <div className="col-md-8">
         <div className="profile-head">
           <label htmlFor="currentpassword"><b>Enter Current Password: </b></label>
         <input autoComplete="off" type="password" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} value={user.currentpassword} onChange={handleInputs} name="currentpassword" id="currentpassword"/>
         <label htmlFor="newpassword"><b>Enter New Password: </b></label>
         <input autoComplete="off" type="password" name="newpassword" id="newpassword" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} value={user.newpassword} onChange={handleInputs}/>
         <label htmlFor="renewpassword"><b>Enter Re-new Password: </b></label>
         <input autoComplete="off" type="text" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} name="renewpassword" id="renewpassword" value={user.renewpassword} onChange={handleInputs}/>
         <input type="submit" value="Save" style={{color:'white',backgroundColor:'#05386B'}} onClick={handleClick}/>
         </div>
       </div>
     </div>
     
     </form>
</div>
<br/>
<br/>
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
        </Fragment>
    )
}

export default Adminchangepassword
