import React, {useEffect, Fragment,useState } from "react";
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./footer";
import {Table,Container,Row,Button} from 'react-bootstrap'
const Addtocart = () => {

  const history=useHistory()
  const [seecart,setSeecart] = useState([])
  const callAddtocart=async()=>{
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
      
     } }

     const fetchItemData=async()=>{
      const res=await fetch('http://localhost:5000/api/addtocartdetails',{
        method:'GET',
        headers:{
    Accept:'application/json',
    'Content-Type':'application/json'
    },
    })
    
    const data=await res.json()
    setSeecart(data)
    }

    const handleCartdeleted=async(e,id)=>{
      e.preventDefault()
      const ok=await window.confirm("Are you sure you want to delete this cart item in your cart list ?")
      if(ok){
        const res = await fetch(`http://localhost:5000/api/deletecart/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
         
        });
    
        const data = await res.json();
        if (data.message ==="Deleted") {
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
      }
      else
      {
        return false
      }

    }
    const handleView=(e,itemid)=>{
      e.preventDefault()
           history.push({
             pathname:'/viewmoreitem',
             state:itemid
           })
    }
     useEffect(()=>{
 callAddtocart()
 fetchItemData()
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
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>CART LIST</span>
  </Row>
  </Container>
  <br/>
        
  <Table striped bordered hover>
<thead>
<tr>
  <th>S.No</th>
  <th>Item name</th>
  <th>Item picture</th>
  <th>Item category</th>
  <th colSpan={2}>Action</th>
</tr>
</thead>
<tbody>
{seecart.length>0 ? seecart.map((item,index)=>{
  return(
    <tr key={item._id}>
      <td>{++index}</td>
      <td>{item.itemname}</td>
      <td><img src={item.itempicture} style={{marginLeft:'18%',width:'30%',height:'30%'}} /></td>
      <td>{item.itemcategory}</td>
      <td>{<button onClick={(e)=>handleView(e,item.itemid)} style={{backgroundColor:"#05386B", color:'white'}}><i className="fa fa-eye" ></i>View</button>}</td>
      <td>{<button onClick={(e)=>handleCartdeleted(e,item._id)} style={{backgroundColor:"#05386B", color:'white'}}><i className="fa fa-trash" ></i>Delete from cart</button>}</td>

    </tr>
)}):<tr><h2 style={{textAlign:'center'}}>No products yet</h2></tr>

}

</tbody>
</Table>

<br/> <br/>
      <Footer/>
      <ToastContainer/>
    </Fragment>
  );
};
export default Addtocart;
