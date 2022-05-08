import React,{useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Table,Container,Row,Dropdown } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './footer.css'
import jsPDF from 'jspdf'
const Adminseeusertransactions = () => {
    const history=useHistory()
    const [names,setNames] = useState('')
    const [seetransact,setSeetransact] = useState([])
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

    const seeTransactions=async()=>{
      const res=await fetch('http://localhost:5000/api/seetransactions',{
        method:'GET',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        // credentials:'include'
      })
  
      const data=await res.json()
      setSeetransact(data)
   
    }
    const handlePdfDownload=async(e,itemname,itemprice,payment_id,order_id,payment_status,email,itemid,purchased_at)=>{
      e.preventDefault()
      var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var docx=new jsPDF('landscape','px','a4')
      docx.addImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kDyk4t1MZOnnXUT24zNSuVBtmeA0MPzUOg&usqp=CAU",'PNG',65,20,100,80)
      docx.setFont('Helvertica','bold')
      docx.text(60,120,'Itemname')
      var i = docx.splitTextToSize(itemname, 180);
      docx.text(60, 140, i)
      docx.text(60,200,'Date')
      docx.text(60,220,date.toString())
      docx.text(60,240,'Itemprice')
      docx.text(60,260,itemprice.toString())
      docx.text(60,280,'Payment id')
      docx.text(60,300,payment_id)
      docx.text(60,320,'Order id')
      docx.text(60,340,order_id)
      docx.text(60,360,'Payment status')
      docx.text(60,380,payment_status)
      docx.text(60,360,'User email id')
      docx.text(60,380,email)
      docx.text(60,360,'Item id')
      docx.text(60,380,itemid)
      docx.text(60,360,'Purchased at')
      docx.text(60,380,purchased_at)
      
      docx.save(`receipt_${Math.ceil((Math.random() *9823762))}.pdf`)
    }
  
      
      useEffect(()=>{
        callAdminseePage()
        seeTransactions()
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
    <Dropdown.Item href="/adminseeusers">See all users</Dropdown.Item>
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
<span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>View User Transactions</span>
</Row></Container>
<br/>
        <Table striped bordered hover>
<thead>
<tr>
      <th>S.No</th>
      <th>Email id</th>
      <th>Item name</th>
      <th>Item id</th>
      <th>Item price</th>
      <th>Payment_id</th>
      <th>Order_id</th>
      <th>Payment_status</th>
      <th>Purchased at</th>
      <th>Action</th>
</tr>
</thead>
<tbody>
{seetransact.length>0 ? seetransact.map((item,index)=>{
  return(
    <tr key={item._id}>
    <td>{++index}</td>
     <td>{item.email}</td>   
    <td>{item.itemname}</td>
    <td>{item.itemid}</td>
    <td>{item.itemprice}</td>
    <td>{item.payment_id}</td>
    <td>{item.order_id}</td>
    <td>{item.payment_status}</td>
    <td>{item.date}</td>
    <td><button onClick={(e)=>handlePdfDownload(e,item.itemname,item.itemprice,item.payment_id,item.order_id,item.payment_status,item.email,item.itemid,item.date)} style={{backgroundColor:"#05386B", color:'white'}} >Download invoice</button></td>
    </tr>
)}):<tr><h2 style={{textAlign:'center'}}>No transactions yet by users</h2></tr>

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
export default Adminseeusertransactions;