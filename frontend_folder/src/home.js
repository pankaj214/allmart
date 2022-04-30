import React,{useEffect, useState} from 'react';
import {Input, Typography} from '@material-ui/core'
import {Container,Row,Card,Button} from 'react-bootstrap'
import {Grid} from '@material-ui/core';
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
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>ITEMS</span>
  </Row></Container>
  <SearchIcon style={{marginLeft:'25%'}}/><Input style={{width:'50%',marginTop:'2%'}} placeholder='Search By Item Name' type='search'/>
</Typography>
            
<marquee style={{fontSize:20,fontWeight:'bold'}}>Latest Mobiles,Brand New Formals and Eletronic Products like Brand T.V,Air Conditioner and many more products will be found here...</marquee>

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


<br/>      
<Footer/>
<ToastContainer/>
</>
);
};
export default Home;
