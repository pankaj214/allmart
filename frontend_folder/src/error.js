import React, { Fragment } from "react";
import Appbar from "./appbar";

const Error = () => {
  return (
    <Fragment>
              <Appbar/>

      <h2 style={{display:'flex',textAlign:'center',justifyContent:'center',marginTop:'15%' ,color:'#05386B'}}>
        Error 404 ! Page not Found
      </h2>
    </Fragment>
  );
};
export default Error;
