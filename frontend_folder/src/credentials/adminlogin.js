import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Typography,
  makeStyles,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#05386B",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Adminlogin = () => {
  const classes = useStyles();
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { email, password } = user;

    const res = await fetch("http://localhost:5000/api/adminlogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    if (data.message === "you are loggedin") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
        localStorage.setItem('decisions',1)
      setTimeout(() => {
        history.push("/admindashboard",{replace:true});
      }, 1000);
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
  };

  if(localStorage.getItem('decisions')==1){
    toast.error('Admin,you are already loggedin', {
      position: "top-center",
    });
  return (

<>
<nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>

    <Container
      component="main"
      style={{ marginTop:'6%', backgroundColor: "white", height: "20vh", borderRadius: "1%" }}
      maxWidth="xs"
    >
      <div style={{display:'flex',justifyContent:'center',textAlign:'center',textDecoration:'underline',paddingTop:'20%',color:'black',fontSize:'20px',fontWeight:'bold' }}>
       Admin,you are already logged in.Please go to the Dashboard
      </div>
      <ToastContainer />
    </Container></>
  )}
  else{
    return(<>
    <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>

    <Container
    component="main"
    style={{ backgroundColor: "white", height: "54vh", borderRadius: "4%" }}
    maxWidth="xs"
  >
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login as an admin
      </Typography>
      <form className={classes.form} method="POST">
        <TextField
          variant="outlined"
          margin="normal"
          required
          type="text"
          fullWidth
          id="email"
          label="Admin Name"
          value={user.email}
          onChange={handleInputs}
          name="email"
          autoComplete="off"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={user.password}
          name="password"
          onChange={handleInputs}
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{ backgroundColor: "#05386B", color: "white" }}
          className={classes.submit}
          onClick={handleClick}
        >
          Login
        </Button>
        <Grid container>
          <Grid item >
            <Link to="/signin" style={{ color: "#05386B" }} variant="body2">
              login as an user
            </Link>
          </Grid>
          </Grid>
      </form>
    </div>
    <ToastContainer />
  </Container></>)
  }
};
export default Adminlogin;
