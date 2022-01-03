import React ,{useState,useEffect,createContext,useReducer} from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./credentials/login";
import Register from "./credentials/register";
import Error from "./error";
import Dashboard from "./dashboard";
import Home from "./home";
import Appbar from "./appbar";
import Addtocart from "./addtocart";
import About from "./about";
import RingLoader from 'react-spinners/RingLoader'
import Contact from "./contact";
import Viewmore from './viewmore'
import Logout from './credentials/logout'
import Logoutall from './credentials/logoutall'
import Admindashboard from "./admindashboard";
import Adminlogin from "./credentials/adminlogin";
import Adminlogout from "./credentials/adminlogout";
import {initialState,reducer} from './reducer/UseReducer'


export const UserContext=createContext()

const Routing =()=>{
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },4000)
  },[])
  return(
    <>
     {loading ? 
    <div style={{marginTop:'16%',marginLeft:'42%'}}>
      <RingLoader 
      size={200}
      color={"#05386B"}
      loading={loading}
      /></div>
      :
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/addtocart" component={Addtocart} />
        <Route exact path="/viewmoreitem" component={Viewmore} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/logout_" component={Logoutall} />
        <Route exact path="/adminlogin" component={Adminlogin} />
          <Route exact path="/admindashboard" component={Admindashboard} />
          <Route exact path="/adminlogout" component={Adminlogout} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
    }
    </>
  )
}
const App = () => {

  const [state,dispatch]=useReducer(reducer,initialState)
 
  return (<>

          <UserContext.Provider value={{state,dispatch}}>
            <Routing/>
          </UserContext.Provider>

     
   </>);
}

export default App;
