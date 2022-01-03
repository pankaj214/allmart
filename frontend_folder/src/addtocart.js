import React, {useEffect, Fragment } from "react";
import { Box,Paper } from "@material-ui/core";
import Appbar from "./appbar";
import {useHistory} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Addtocart = () => {

  const history=useHistory()

  return (
    <Fragment>
              <Appbar/>

      <Box
        fontWeight="bold"
        fontSize={25}
        textAlign="center"
        style={{ textDecoration: "underline", color: "#F8F8FF" }}
        mt={4}
      >
        Email Verification
      </Box>
      <Paper elevation={9} >Hello</Paper>
      <ToastContainer/>
    </Fragment>
  );
};
export default Addtocart;
