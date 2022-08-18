import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp";import './App.css';

function App() {
  const [currency, setcurrency] = useState("inr")
  const [loggedin, setloggedin] = useState("false")
  const [authtoken, setauthtoken] = useState("")
  
  return (
    <SignUp currentlyloggedin={loggedin} changeloggedin={setloggedin} currentlyauthtoken={authtoken} changeauthtoken={setauthtoken} />
    );
}

export default App;
