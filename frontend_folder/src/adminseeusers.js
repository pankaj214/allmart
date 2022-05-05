import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Table,Container,Row,Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './footer.css'
const Adminseeusers = () => {
    const history=useHistory()
    const [names,setNames] = useState('')
    const [seeusers,setSeeusers] = useState([])
    const callAdminseePage=async()=>{
        const res=await fetch('http://localhost:5000/api/checkadminLogin',{
          method:'GET',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          // credentials:'include'
        })
    
        const data=await res.json()
        setNames(data)
        if(data.error==='Please be login'){
          localStorage.setItem('decision',0)
          history.push('/adminlogin')
          setTimeout(()=>{toast.error(`${data.error}`, {
            position: "top-center",
          });},1000)
         
        }
    
    }

    const seeUsers=async()=>{
      const res=await fetch('http://localhost:5000/api/seeusers',{
        method:'GET',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        // credentials:'include'
      })
  
      const data=await res.json()
      setSeeusers(data)
   
    }

    const handleProfiledeleted=async(e,deleteprofilestatus,id,username)=>{
        e.preventDefault()
      if(deleteprofilestatus=="wants to delete"){
        const ok=await window.confirm(`${username} wants to delete now,you will delete this profile.`)
        if(ok){
        const res=await fetch(`http://localhost:5000/api/deletedprofile/${id}`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          // credentials:'include'
        })
    
        const data=await res.json()
        if (data.message ==="Profile deleted and mail sent to user.") {
          toast.success(`${data.message}`, {
            position: "top-center",
          });
          setTimeout(() => {
            history.push("/adminseeusers",{replace:true});
          }, 1000);
        } else {
          toast.error(`${data.error}`, {
            position: "top-center",
          });
        }
       
      }else{
        return false
      }}
      else{
        toast.warning("It can't remove because user not wants to delete",{
          position:"top-center"
        })
      }
      }

  
      
      useEffect(()=>{
        callAdminseePage()
        seeUsers()
      },[])

    return(<>
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
  <Dropdown.Item href="/admineditprofile">Edit Profile</Dropdown.Item>
    <Dropdown.Item href="/adminitemsdata">View products</Dropdown.Item>
    <Dropdown.Item href="/adminuserfeedback">See user feedback</Dropdown.Item>
    <Dropdown.Item href="/adminchangepassword">Change Password</Dropdown.Item>
  <Dropdown.Item href="/admindashboard">Go to dashboard</Dropdown.Item>
    <Dropdown.Item href="/adminlogout">Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
       
        </span>
        </div>
        </nav>
        <marquee scrollAmount={20} style={{fontWeight:'bolder',fontSize:'25px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px'}}>Welcome to Admin Panel</marquee>
    <Container >
<Row className="justify-content-md-center">
<span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>View Users</span>
</Row></Container>
<br/>
        <Table striped bordered hover>
<thead>
<tr>
  <th>S.No</th>
  <th>User name</th>
  <th>Email id</th>
  <th>Phone number</th>
  <th>User id</th>
  <th>User image</th>
  <th>D.O.B</th>
  <th>Address</th>
  <th>deleteprofilestatus</th>
  <th>Action</th>
</tr>
</thead>
<tbody>
{seeusers.length>0 ? seeusers.map((item,index)=>{
  return(
    <tr key={item._id}>
      <td>{++index}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.userid}</td>
      <td><img src={item.userimage} style={{marginLeft:'18%',width:'30%',height:'30%'}} /></td>
      <td>{item.dateofbirth}</td>
      <td>{item.addressfororders}</td>
      <td>{item.deleteprofilestatus}</td>
      <td>{<button onClick={(e)=>handleProfiledeleted(e,item.deleteprofilestatus,item._id,item.username)} style={{backgroundColor:"#05386B", color:'white'}}><i className="fa fa-trash" ></i>Delete Profile</button>}</td>

    </tr>
)}):<tr><h2 style={{textAlign:'center'}}>No users yet</h2></tr>

}

</tbody>
</Table>
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
    </>)
}
export default Adminseeusers;