import React, { Fragment } from "react";
import Appbar from "./appbar";

const Error = () => {
  return (
    <Fragment>
              <nav className='navbar'>
            <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
            </div>
            </nav>

      <h2 style={{display:'flex',textAlign:'center',justifyContent:'center',marginTop:'15%' ,color:'#05386B'}}>
        Error 404 ! Page not Found
      </h2>
    </Fragment>
  );
};
export default Error;
