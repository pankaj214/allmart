import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  
const Forgotpassword = () => {
    const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    email: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const { email } = user;

    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email
      }),
    });
    const data = await res.json();
   
  };
    return (
        <>
         <Container
      component="main"
      style={{ backgroundColor: "white", borderRadius: "4%" }}
      maxWidth="xs"
    >
      <div className={classes.paper}>
      
          <div className="nav-container text-center">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>

        <Typography component="h1" variant="h5">
         Forgot Password
        </Typography>
        <form className={classes.form} method="POST">
          <Grid container spacing={2}>
          
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="email"
                fullWidth
                id="email"
                label="Enter email id"
                value={user.email}
                name="email"
                onChange={handleInputs}
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
            Send Email
          </Button>
        
        </form>
      </div>
      <ToastContainer />
    </Container>
        </>
    )
}

export default Forgotpassword
