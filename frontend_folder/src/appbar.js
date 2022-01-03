import React, { useState ,useContext} from "react";

import './appbar.css'
import { NavLink } from "react-router-dom";
import {UserContext} from './App'

const RenderMenu =()=>{
  const [click, setClick] = useState(false);
  const {state,dispatch}=useContext(UserContext)
    const handleClick = () => setClick(!click);
    if(localStorage.getItem('state')==1 || state ){
return(
  <>
     <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
  
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/dashboard"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/about"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/contact"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Contact
                </NavLink>
              </li>
             
              <li className="nav-item">
                <NavLink
                  exact
                  to="/logout"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </nav>
  </>
)
    }
    else{
      return(
        <>
           <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-drafting-compass">&nbsp;</i>All Mart
            </div>
  
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Home
                </NavLink>
              </li>
            
              <li className="nav-item">
                <NavLink
                  exact
                  to="/signin"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/signup"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Register
                </NavLink>
              </li>
            
            </ul>
            <div className="nav-icon" onClick={handleClick}>
              <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </div>
        </nav>
        </>
      )
    }
  
}
const Appbar = () => {
    return (
      <>
     <RenderMenu/>
      </>
    );
};
export default Appbar;
