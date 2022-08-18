import React, { useState } from 'react'
import "./SignUpstyle.css"
import { Link, useNavigate } from 'react-router-dom'

function SignUp({ changeloggedin, changeauthtoken }) {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        
        if (json.error === "Already Registered | Login to Continue") {
            alert('Already Registered | Login to Continue')
        }
        else {
            
            console.log(json.authtoken);
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history("/Books");
            // console.log("Logged in")
        }
}


const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
    // console.log(credentials.password)
}

const [cpassword, setcpassword] = useState()

const onChange2 = (e) => {
    setcpassword({ ...cpassword, [e.target.name]: e.target.value })
    // console.log(cpassword)
}

return (
    <div style={{ height: "90vh" }}>
        <div className="signup">
            <div className="Head"> <h3><b> Create an account</b></h3></div>
            <div className="New">
                <br />Already have an account?
                <Link to="/" style={{ textDecoration: "none" }}> Log In</Link></div>
            <form >
                <div>
                    <label htmlFor="exampleInputEmail1" className="form-label"> <b> Full Name</b></label>
                    <input type="text" className="form-control" id="NameInput" name="name" placeholder="Enter your full name...." aria-describedby="name" onChange={onChange} autoComplete="on" />

                </div>
                <div>
                    <label htmlFor="exampleInputEmail1" className="form-label"> <b> Email address</b></label>
                    <input type="email" className="form-control" id="EmailInput" name="email" placeholder="Enter your email address..." aria-describedby="emailHelp" onChange={onChange} autoComplete="on" />

                </div>
                <div>
                    <label htmlFor="exampleInputPassword1" className="form-label" id="id_password"> <b> Password</b></label>
                    <input type="password" className="form-control password-input" id="Password" name="password" placeholder="Enter your password..." onChange={onChange} />

                    
                    <label htmlFor="exampleInputPassword1" className="form-label" id="id_password"> <b> Confirm Password</b></label>

                    <input type="text" className="form-control password-input" id="cpassword" name="cpassword" onChange={onChange2} placeholder="Enter your password again..." />
                    <div className="New">Password should contain both letter and number, with minimum length of 8 characters. </div>
                    <br />
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}> <b> Create an account</b></button>
                </div>


            </form>
        </div>
    </div>
)
}

export default SignUp