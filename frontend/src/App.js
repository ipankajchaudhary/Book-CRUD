import React, { useState } from "react";
import { Link,  BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp"; import './App.css';
import Books from "./Components/Books/Books";

function App() {
  const [currency, setcurrency] = useState("inr")
  const [loggedin, setloggedin] = useState("false")
  const [authtoken, setauthtoken] = useState("")
  
  return (<>
   <Login/>
    </>
    );
}

export default App;
