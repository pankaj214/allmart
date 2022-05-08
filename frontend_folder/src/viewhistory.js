import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import { Table,Container,Row } from 'react-bootstrap';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Appbar from "./appbar";
import Footer from './footer';
import jsPDF from 'jspdf'
const Viewhistory = () => {
    const history=useHistory()
    const [emails,setEmails]  = useState('')
    const [transact,setTransact]  = useState([])
    const callViewhistoryPage=async()=>{
        const res=await fetch('http://localhost:5000/api/checkLogin',{
          method:'GET',
          headers:{
            Accept:'application/json',
            'Content-Type':'application/json'
          },
          // credentials:'include'
        })
    
        const data=await res.json()
        setEmails(data)
        if(data.error==='Please be login'){
          localStorage.setItem('decision',0)
          history.push('/signin')
          setTimeout(()=>{toast.error(`${data.error}`, {
            position: "top-center",
          });},1000)
         
        }
    
    }
    const getTransactions=async()=>{
      const res=await fetch(`http://localhost:5000/api/viewtransactions/${emails.email}`)
      const data=await res.json()
      setTransact(data)
    }

    const handlePdfDownload=async(e,itemname,itemprice,payment_id,order_id,payment_status)=>{
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
      
      docx.save(`receipt_${Math.ceil((Math.random() *9823762))}.pdf`)
    }
      
      useEffect(()=>{
        callViewhistoryPage()
      },[])
      useEffect(()=>{
          if(emails!==""){
            getTransactions()
          }
      },[emails])
      
    
    return (
        <>
           <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>
        <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>TRANSACTION HISTORY</span>
  </Row></Container>
 <br/>
            <Table striped bordered hover>
  <thead>
    <tr>
      <th>S.No</th>
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
    {transact.length>0 ? transact.map((item,index)=>{
      return(
          <tr key={item._id}>
            <td>{++index}</td>
            <td>{item.itemname}</td>
            <td>{item.itemid}</td>
            <td>{item.itemprice}</td>
            <td>{item.payment_id}</td>
            <td>{item.order_id}</td>
            <td>{item.payment_status}</td>
            <td>{item.date}</td>
            <td><button style={{backgroundColor:"#05386B", color:'white'}} onClick={(e)=>handlePdfDownload(e,item.itemname,item.itemprice,item.payment_id,item.order_id,item.payment_status)}><i className="fa fa-download"></i>Download payment invoice</button></td>
          </tr>)
    }):<tr><h2 style={{textAlign:'center'}}>No transactions found</h2></tr>}
     
  </tbody>
</Table>
<br/><br/><br/><br/>
<Footer/>
<ToastContainer/>
        </>
    )
}

export default Viewhistory
