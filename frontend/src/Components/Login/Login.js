import React, { useState } from "react";
import "./Loginstyle.css";
import { Link, useNavigate } from "react-router-dom"

const Login = ({ changeloggedin, changeauthtoken }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  let history = useNavigate();
  const [wrongcredentials, setwrongcredentials] = useState("false")

  // post request to login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    if (json.error !== "Wrong Credentials") {
      localStorage.setItem('token', json.authtoken);
      history("/Books");
    }
    else {
      setwrongcredentials("true")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  var stylingObject = {
    it: {
      width: "90.5%",
      borderTopRightRadius: '0px',
      borderBottomRightRadius: '0px'
    }
  }


  return (
    <>
      <div style={{ height: "90vh" }}>
        <div className="login">
          <div className="LoginTitle"> <h3><b> Log In</b></h3></div>
          <div className="New">New here?
            <Link to="/SignUp" style={{ textDecoration: "none" }}> Create an account</Link></div>
          <br />
          <form >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label"> <b> Email address</b></label>
              <input type="email" className="form-control for-email" style={{ borderRadius: "10px" }} value={credentials.email} onChange={onChange} id="emailHelp" name="email" placeholder="Enter your email address..." aria-describedby="emailHelp" autoComplete="on" />

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label" id="id_password"> <b>Password</b></label>
              <button type="submit" className="FP">Forgot password?</button>


              
              <input type="password" style={stylingObject.it} className="form-control password-input" value={credentials.password} onChange={onChange} name="password" id="password" autoComplete="on" placeholder="Enter your password..." />

              <p className={(wrongcredentials === "false" ? "d-none" : "text-danger")}>Wrong Credentials</p>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Log In</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;