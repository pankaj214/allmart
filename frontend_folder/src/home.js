import React,{useEffect, useState} from 'react';
import {Container,Row,Card,Button} from 'react-bootstrap'
import {Typography,AccordionSummary,AccordionDetails,Accordion,Grid,Input} from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useHistory} from 'react-router-dom'
import Allmart from './images/allmart.png'
import Appbar from "./appbar";
import SearchIcon from '@material-ui/icons/Search';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from './footer';
const Home = () => {
 
  const history = useHistory()
  const [itemdata,setItemdata] = useState([])
  const handleBlog=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
      method:'GET',
      headers:{
  Accept:'application/json',
  'Content-Type':'application/json'
},
  })
  const data=await res.json()
  if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/signin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
   else{
     history.push('/addtocart')
   }
  }
  const handleBlog1=async()=>{
    const res=await fetch('http://localhost:5000/api/checkLogin',{
      method:'GET',
      headers:{
  Accept:'application/json',
  'Content-Type':'application/json'
},
  })
  const data=await res.json()
  if(data.error==='Please be login'){
      localStorage.setItem('decisions',0)
      history.push('/signin')
      setTimeout(()=>{toast.error(`${data.error}`, {
        position: "top-center",
      });},1000)
     
    }
else{
  history.push('/viewmoreitem')
}
  }
 
  const fetchItemData=async()=>{
    const res=await fetch('http://localhost:5000/api/home',{
      method:'GET',
      headers:{
  Accept:'application/json',
  'Content-Type':'application/json'
},
  })

  const data=await res.json()
  setItemdata(data)
  }
  useEffect(()=>{
        fetchItemData()
  },[])

return(
<>
<Appbar/>
<Typography variant="h5" >
<Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif'}}>PRODUCTS</span>
  </Row></Container>

  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_India.svg/2560px-Flag_of_India.svg.png" alt="Indian Flag" style={{width:'5%',height:'5%',marginLeft:'5%'}}/>

  <SearchIcon style={{marginLeft:'15%'}}/><Input style={{width:'50%',marginTop:'2%'}} placeholder='Search By Item Name' type='search'/>
  
  {localStorage.getItem('userimage') ? <img src={localStorage.getItem('userimage')} alt="Profile" style={{width:'5%',height:'5%',float:'right',marginRight:'5%',borderRadius:'50%'}}/> : <p style={{marginRight:'5%',visibility:'hidden',float:'right'}}>Allmart</p>}

</Typography>


<marquee style={{fontSize:20,fontWeight:'bold'}}>**Latest Mobiles,Brand New Formals and Eletronic Products like Brand T.V,Air Conditioner and many more products will be found here...**</marquee>
<marquee style={{fontSize:20,fontWeight:'bold'}}>**Grab it**</marquee>

<Grid container style={{marginTop:'-4%'}}>
    {itemdata.map((item,index)=>{
      return(
        <Grid item xs={12} sm={6} md={4} key={item._id}>
        <div > 
<Card style={{margin:'20%',width:'60%'}} >
  <Card.Img variant="top" style={{height:'25vh'}} src={item.itempicture} alt="Blog Photo"/>
  <Card.Body style={{overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis'}}>
  <Card.Title style={{marginTop:'2%',textAlign:'center',overflow:'hidden',
    whiteSpace:'nowrap',
    textOverflow:'ellipsis'
}} >{item.itemname}</Card.Title>

<h5 style={{textAlign:'center'}}>₹{item.itemprice}</h5>
<h6 style={{textAlign:'center'}}>{item.itemdiscount}% discount</h6>
  <h4 style={{float:'left',marginTop:'4%',}}>  <span style={{textAlign:'center'}}>{item.itemdescription}</span> </h4> 
  <Button style={{float:'right', marginTop:'10%',backgroundColor:'orange',}} onClick={handleBlog}>Add To Cart</Button>
    <Button style={{marginTop:'10%',float:'left', backgroundColor:'#293659',}} onClick={handleBlog1}>View More</Button>
  </Card.Body>
</Card>
</div>
</Grid>
      )
    })}
</Grid>

<h5 style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>Frequently asked questions:(FAQ)</h5>
<br/>
<Accordion style={{ width: '100%' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography
            style={{
              fontWeight: 10,
            }}
          >
            What is register and login procedure?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>In Allmart,you will entered correct details like email id, phone number because when you entered wrong details then you will not apply for login after register you will get confirmation mail then after you will apply for login. </Typography>
        </AccordionDetails>
       
      </Accordion>
      <br/><br/>
<Footer/>
<ToastContainer/>
</>
);
};
export default Home;
