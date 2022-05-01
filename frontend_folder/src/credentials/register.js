import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    userid: "",
    password: "",
    repassword: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { username, email, phone, userid, password, repassword } = user;

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        phone,
        userid,
        password,
        repassword,
      }),
    });
    const data = await res.json();
    if (data.message === "Registration Successful\n Please check the mail") {
      toast.success(`${data.message}`, {
        position: "top-center",
      });
      setTimeout(() => {
        history.push("/signin");
      }, 2000);
    } else {
      toast.error(`${data.error}`, {
        position: "top-center",
      });
    }
  };
  const callModal=()=>{
    toast.warning('Please enter the correct email-id and phone number otherwise you will not receiving the confirm email',{
      position:'top-center'
    })
  }
  useEffect(()=>{
        callModal()
  },[])

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
  return (
    <>
            <Appbar/>

    <Container
      component="main"
      style={{ backgroundColor: "white", height: "96vh", borderRadius: "4%" }}
      maxWidth="xs"
    >
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                value={user.username}
                name="username"
                onChange={handleInputs}
                variant="outlined"
                fullWidth
                id="username"
                label="Name"
                autoFocus
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                value={user.email}
                name="email"
                onChange={handleInputs}
                autoComplete="off"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="text"
                fullWidth
                id="userid"
                label="UserID"
                value={user.userid}
                name="userid"
                onChange={handleInputs}
                autoComplete="off"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="number"
                fullWidth
                id="phone"
                label="Phone Number"
                value={user.phone}
                name="phone"
                onChange={handleInputs}
                autoComplete="off"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="password"
                fullWidth
                id="password"
                label="Password"
                value={user.password}
                name="password"
                onChange={handleInputs}
                autoComplete="off"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                value={user.repassword}
                name="repassword"
                onChange={handleInputs}
                label="Re-Enter Password"
                type="password"
                id="repassword"
                autoComplete="off"
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            onClick={handleClick}
            variant="contained"
            style={{ backgroundColor: "#05386B", color: "white" }}
            className={classes.submit}
          >
            Submit & Verify
          </Button>
          <Grid container style={{ justifyContent: "flex-end" }}>
            <Grid item>
              <Link to="/signin" style={{ color: "#05386B" }} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <ToastContainer />
    </Container></>
  );}
};
export default Register;
