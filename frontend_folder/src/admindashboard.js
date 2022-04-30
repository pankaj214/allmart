import React, { useState,useEffect,Fragment } from "react";
import {useHistory} from 'react-router-dom'
import {Button,Col,Row,Container,Dropdown} from 'react-bootstrap'
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

const Admindashboard = () => {
  const classes=useStyles()
  const history=useHistory()
  const [names,setNames]  = useState('')

  const [user, setUser] = useState({
    iname: "",
    iprice: "",
    idiscount: "",
    idescription: "",
    icategory: ""  });
const [image,setImage] = useState('')
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
    const formdata=new FormData()
    formdata.append("ipicture",image)
    const { iname,iprice,idiscount,idescription,icategory,ipicture } = user;
    const res = await fetch("http://localhost:5000/api/adminitemdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        iname,
        iprice,
        idiscount,
        idescription,
        icategory,
        formdata
      }),
    });

    const data = await res.json();
    if (data.message === "Uploaded") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        history.push("/adminitemsdata",{replace:true});
      }, 1000);
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
  };


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
    setNames(data.adminid)
    

}
const callModal=()=>{
  toast.info(`Hello,\n\n Welcome back`,{
    position:"top-center",
  })
}
  useEffect(()=>{
      callDashboardPage()
      callModal()
  },[])
  
  

  return <Fragment>
 <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            <span style={{display:'flex',justifyContent:'right',textAlign:'center'}}>
        <Dropdown>
          <span style={{textDecoration:'underline',fontWeight:500 }}>{names}</span>&nbsp;&nbsp;
  <Dropdown.Toggle style={{color:'#05386B'}} id="dropdown-basic">
   <i className="fas fa-user">Settings</i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/user_profile">Edit Profile</Dropdown.Item>
    <Dropdown.Item href="/change_password">Change Password</Dropdown.Item>
    <Dropdown.Item href="/adminitemsdata">Admin Items Data</Dropdown.Item>
    <Dropdown.Item href="/adminlogout">Logout</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
       
        </span>
           
            </div>
            </nav>
               
            <Container style={{marginTop:'2%',backgroundColor:'white'}}>
  <Row>
    <Col >
        <h2>Create Items:</h2>   
        <div>
        <form className={classes.form} method="POST">
        <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="iname"
          label="Item Name"
          value={user.iname}
          onChange={handleInputs}
          name="iname"
          autoComplete="off"
          autoFocus/>
        <TextField variant="outlined"
          margin="normal"
          required
          type="number"
          fullWidth
          id="iprice"
          label="Item Price"
          value={user.iprice}
          onChange={handleInputs}
          name="iprice"
          autoComplete="off"
          autoFocus/>
        <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="idiscount"
          label="Item Discount"
          value={user.idiscount}
          onChange={handleInputs}
          name="idiscount"
          autoComplete="off"
          autoFocus/>
 <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="idescription"
          label="Item Description"
          value={user.idescription}
          onChange={handleInputs}
          name="idescription"
          autoComplete="off"
          autoFocus/>
          <TextField variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="icategory"
          label="Item Category"
          value={user.icategory}
          onChange={handleInputs}
          name="icategory"
          autoComplete="off"
          autoFocus/>
          <TextField variant="outlined"
          margin="normal"
          type="file"
          fullWidth
          id="ipicture"
          label="Item Picture"
          onChange={handleImages}
          name="ipicture"
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
          Submit
        </Button>
        </form>
        <br/>
        </div>
    </Col>
  
  </Row>
</Container>
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
export default Admindashboard;


