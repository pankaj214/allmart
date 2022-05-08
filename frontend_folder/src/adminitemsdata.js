import React, { useState,useEffect,Fragment } from "react";
import {useHistory} from 'react-router-dom'
import {Button,Col,Row,Container,Dropdown,Table,Modal} from 'react-bootstrap'
import { ToastContainer, toast } from "react-toastify";
import {TextField,makeStyles} from '@material-ui/core'
import "react-toastify/dist/ReactToastify.css";
import './footer.css'
const useStyles = makeStyles((theme) => ({
  
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Adminitemsdata = () => {
  const classes=useStyles()
  const history=useHistory()
  const [names,setNames]  = useState('')
  const [viewproducts,setViewproducts] = useState([])
  const [show, setShow] = useState(false);
  const [viewproductss,setViewproductss] = useState([])
  const [image,setImage] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = (e,items) =>{
    setShow(true)
    setViewproductss(items)

  }
  const [user, setUser] = useState({
    itemname: "",
    itemprice: "",
    itemdiscount: "",
    itemdescription: "",
    itemcategory: "",
    itempicture: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleImages=(e)=>{
    setImage(e.target.files[0])
}
  const handleClick = async (e) => {
    e.preventDefault();
      const itemid=viewproductss._id
    const { itemname,itemprice,itemdiscount,itemdescription,itemcategory,itempicture } = user;
    const res = await fetch("http://localhost:5000/api/adminedititemdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemid,
        itemname,
        itemprice,
        itemdiscount,
        itemdescription,
        itemcategory,
        itempicture
      }),
    });

    const data = await res.json();
    if (data.message === "Successfully edited") {
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


  const callAdminitemsPage=async()=>{
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
    setNames(data)
    

}

const products=async()=>{
  const res=await fetch('http://localhost:5000/api/home',{
    method:'GET',
    headers:{
      Accept:'application/json',
      'Content-Type':'application/json'
    },
    // credentials:'include'
  })

  const data=await res.json()
  setViewproducts(data)

}
const handleDeleteitem=async(e,id)=>{
  e.preventDefault()
  const ok=await window.confirm("Are you sure you want to delete this item ?")
  if(ok){
    const res = await fetch(`http://localhost:5000/api/deleteitems/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     
    });
  
    const data = await res.json();
    if (data.message === "Deleted") {
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
  
  }
  else{
    return false
  }
}

  useEffect(()=>{
      callAdminitemsPage()
      products()
  },[])
  
  

  return <Fragment>
 <nav className="navbar">
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
    <Dropdown.Item href="/adminseeusers">See all users</Dropdown.Item>
    <Dropdown.Item href="/adminseeusertransactions">See user transactions</Dropdown.Item>
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
 <h2 style={{textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px'}}>View products</h2>
 <Table striped bordered hover>
<thead>
<tr>
  <th>S.No</th>
  <th>Item name</th>
  <th>Item discount</th>
  <th>Item Price</th>
  <th>Item description</th>
  <th>Item category</th>
  <th>Item picture</th>
  <th colSpan={2}>Action</th>
</tr>
</thead>
<tbody>
{viewproducts.length>0 ? viewproducts.map((item,index)=>{
  return(
    <tr key={item._id}>
      <td>{++index}</td>
      <td>{item.itemname}</td>
      <td>{item.itemdiscount}</td>
      <td>{item.itemprice}</td>
      <td>{item.itemdescription}</td>
      <td>{item.itemcategory}</td>
      <td><img src={item.itempicture} style={{marginLeft:'18%',width:'40%',height:'40%'}} /></td>
      <td>{<button onClick={(e)=>handleShow(e,item)} style={{backgroundColor:"#05386B", color:'white'}}><i className="fa fa-edit" ></i>Edit</button>}</td>
      <td>{<button onClick={(e)=>handleDeleteitem(e,item._id)} style={{backgroundColor:"#05386B", color:'white'}}><i className="fa fa-trash" ></i>Delete</button>}</td>


    </tr>
)}):<tr><h2 style={{textAlign:'center'}}>No users yet</h2></tr>

}

</tbody>
</Table>

<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <Row>
    <Col >
    <div>
        <form className={classes.form} method="POST" >
        <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="itemname"
          label="Item Name"
          defaultValue={viewproductss.itemname}
          onChange={handleInputs}
          name="itemname"
          autoComplete="off"
          autoFocus/>
        <TextField variant="outlined"
          margin="normal"
          required
          type="number"
          fullWidth
          id="itemprice"
          label="Item Price"
          defaultValue={viewproductss.itemprice}
          onChange={handleInputs}
          name="itemprice"
          autoComplete="off"
          autoFocus/>
        <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="itemdiscount"
          label="Item Discount"
          defaultValue={viewproductss.itemdiscount}
          onChange={handleInputs}
          name="itemdiscount"
          autoComplete="off"
          autoFocus/>
 <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="itemdescription"
          label="Item Description"
          defaultValue={viewproductss.itemdescription}
          onChange={handleInputs}
          name="itemdescription"
          autoComplete="off"
          autoFocus/>
          <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="itemcategory"
          label="Item Category"
          defaultValue={viewproductss.itemcategory}
          onChange={handleInputs}
          name="itemcategory"
          autoComplete="off"
          autoFocus/>
             <TextField variant="outlined"
          margin="normal"
          type="file"
          fullWidth
          id="itempicture"
          label="Item Picture"
          onChange={handleImages}
          name="itempicture"
          autoComplete="off"
          autoFocus/>
            <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#05386B", color: "white" }}
          className={classes.submit}
          onClick={handleClick}
        >
          Update
        </Button>
        </form>      
        <br/>
        </div>       
    </Col>
  
  </Row>
  </Modal.Body>
        <Modal.Footer>
          <Button style={{backgroundColor:"#05386B"}} onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
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
  </Fragment>;
};
export default Adminitemsdata;


