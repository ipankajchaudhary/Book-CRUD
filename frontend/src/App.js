import React, { useState } from "react";
import { Link, BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Signup/SignUp";
import "./App.css";
import Books from "./Components/Books/Books";
import BookState from "./Context/BookState";

function App() {

  return (
    <>
    <div id="container">
      <BookState>
          <Router>
            <div id="main-content">
            <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route exact path="/SignUp" element = {<SignUp /> }/>
              <Route exact path="/Books" element = {<Books/>}/>
            </Routes>
            </div>
            </Router>
        </BookState>
        </div>
    </>
  );
}

export default App;
