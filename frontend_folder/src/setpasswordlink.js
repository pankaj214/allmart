import React,{useState} from 'react'
import { useHistory,useParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container,Row } from 'react-bootstrap';
const Setpasswordlink = () => {
    const history = useHistory();
    const {token} = useParams()
  const [user, setUser] = useState({
    password: "",
    repassword: ""    
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { password,repassword } = user;

    const res = await fetch("http://localhost:5000/api/passwordreset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        repassword,
        token
      }),
    });
    const data = await res.json();
    if (data.message === "Password updated successfully") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        history.push("/signin",{replace:true});
      }, 1000);
      
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
   
  };
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
            <Container >
  <Row className="justify-content-md-center">
   <span style={{fontWeight:'bolder',fontSize:'30px',textDecoration:'underline',textDecorationColor:'#EEB127',textAlign:'center',textDecorationThickness:'8px',fontFamily:'sans-serif',marginTop:'1%'}}>RESET PASSWORD</span>
  </Row>
  </Container>
  <br/>
            <div className="container emp-profile">
   <form method="POST">
     <div className="row">
       <div className="col-md-12">
         <div className="profile-head">
         <label htmlFor="password"><b>Enter New Password: </b></label>
         <input type="password" name="password" id="password" value={user.password} onChange={handleInputs}
 style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }}/>
         <label htmlFor="repassword"><b>Enter Re-new Password: </b></label>
         <input type="password" style={{width: '100%',padding: '12px',marginTop: '6px',  marginBottom: '16px',resize: 'vertical' }} name="repassword" id="repassword"  onChange={handleInputs} value={user.repassword}/>
         <input type="submit" value="Reset" style={{color:'white',backgroundColor:'#05386B'}} onClick={handleClick}/>
         </div>
       </div>
     </div>
     
     </form>
</div>
            <ToastContainer/>
        </>
    )
}

export default Setpasswordlink
