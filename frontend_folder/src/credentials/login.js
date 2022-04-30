import React, { useState,useContext } from "react";
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
import {UserContext} from '../App'
import Appbar from "../appbar";

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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const {state,dispatch}=useContext(UserContext)

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

    const res = await fetch("http://localhost:5000/api/login", {
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
    if (data.message === "Now,you are LoggedIn") {
      dispatch({type:'USER',payload:true})
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      localStorage.setItem('state',1)
        localStorage.setItem('decision',1)
      setTimeout(() => {
        alert('Warm Wishes')
        history.push("/dashboard",{replace:true});
      }, 1000);
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
  };

  if(localStorage.getItem('decision')==1){
    toast.error('You are already Logged In', {
      position: "top-center",
    });
  return (

<>
<Appbar />

    <Container
      component="main"
      style={{ marginTop:'6%', backgroundColor: "white", height: "20vh", borderRadius: "1%" }}
      maxWidth="xs"
    >
      <div style={{display:'flex',justifyContent:'center',textAlign:'center',textDecoration:'underline',paddingTop:'20%',color:'black',fontSize:'20px',fontWeight:'bold' }}>
       You are already Logged In.Please go to the Dashboard
      </div>
      <ToastContainer />
    </Container></>
  )}
  else{
    return(<>
    <Appbar />

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
        Login as an user
      </Typography>
      <form className={classes.form} method="POST">
        <TextField
          variant="outlined"
          margin="normal"
          required
          type="email"
          fullWidth
          id="email"
          label="Email Address"
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
        <Grid item xs>
            <Link to="/forgot_password" style={{ color: "#05386B" }} variant="body2">
              forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/signup" style={{ color: "#05386B" }} variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
          <Grid item>
            <Link to="/adminlogin" style={{ color: "#05386B" }} variant="body2">
              login as an admin
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <ToastContainer />
  </Container></>)
  }
};
export default Login;
