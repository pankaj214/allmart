import React,{useEffect,useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import {useHistory} from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
const Checkout = (props) => {
  const history=useHistory()
  const [values,setValues]  = useState({
    amount:0,
    orderId:'',
    error:'',
    success:false
  })
  const {amount,orderId,error,success}  = values

  const callCheckout=async()=>{
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
useEffect(()=>{
   callCheckout()
   getOrders()
       },[])
     const getOrders=async()=>{
       const res=await fetch(`http://localhost:5000/api/createorder/${props.location.state[1]}`,{
         method:'GET'
       })
       const data=await res.json()
        if(data.error){
          setValues({...values,error:data.error,success:false})
        }
        else{
          setValues({...values,error:'',success:true,orderId:data.id,amount:data.amount})
        }
      }

      useEffect(()=>{
          if(amount>0 && orderId!==''){
                showRazorPay()
          }
      },[amount])

     const showRazorPay=()=>{
       const form=document.createElement('form')
       form.setAttribute('action',`http://localhost:5000/api/payment/success/${props.location.state[0]}/${props.location.state[1]}/${props.location.state[2]}/${props.location.state[5]}/${orderId}`)
       form.setAttribute('method','post')
       const script = document.createElement('script')
       script.src="https://checkout.razorpay.com/v1/checkout.js"
       script.setAttribute('data-key','rzp_test_dyDeRIriUuDmPY')
       script.setAttribute('data-amount',amount)
       script.setAttribute('data-name','ALLMART')
       script.setAttribute('data-description','Thanks for purchasing')
       script.setAttribute('data-currency','INR')
       script.setAttribute('data-prefill.contact',props.location.state[3])
       script.setAttribute('data-prefill.email',props.location.state[2])
       script.setAttribute('data-order-id',orderId)
       script.setAttribute('data-prefill.name',props.location.state[4])
       script.setAttribute('data-image','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1kDyk4t1MZOnnXUT24zNSuVBtmeA0MPzUOg&usqp=CAU')
       script.setAttribute('data-buttontext',"Buy now")
       document.body.appendChild(form)
       form.appendChild(script)
       const input= document.createElement('input')
       input.type="hidden"
       input.custom="Hidden Element"
       input.name="hidden"
       form.appendChild(input)
     }
   

    return (
        <>
              <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>
            <br/>
            <marquee scrollAmount={35} style={{fontWeight:'bolder',fontSize:'25px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px'}}>Welcome to ALLMART payment gateway</marquee>

            <ToastContainer/>
        </>
    )
}

export default Checkout
