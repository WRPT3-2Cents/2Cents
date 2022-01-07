import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.css";
import {  MDBCol, MDBInput } from "mdbreact";
import {  toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =useState("");
  const [userEmail, setEmail] = useState("");
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userName,
      userEmail,
      userPassword,
    };
    

    if(userPassword !== confirmPassword){
        toast.error("Passwords Dont Match")
    } else {
        axios.post("/api/register", body)
    .then((res)=>{
        if(res.status === 201){
            toast.success("Registration Complete")
        }
        navigate('/login')
    });
    }
  };


  return (
    <div className="register-container">
      <MDBCol>
        <form onSubmit={handleSubmit}>
          <h1 className="h1 text-center mb-4">2cents</h1>
          <div className="black-text">
            <MDBInput
              label="Username"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput
              label="Your password"
              group
              type="password"
              validate
              required
              value={userPassword}
              onChange={(e) => setPassword(e.target.value)}
            /> 
            <MDBInput 
            label="Confirm Password"
            group type = "password"
            validate
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            /> 
            <MDBInput
              label="Your email"
              group
              type="email"
              validate
              error="wrong"
              success="right"
              required
              value={userEmail}
              onChange={(e) => setEmail(e.target.value)}
            /> 
          </div>
          <div className="text-center">        
              <button>Register</button>
            <Link to="/Login">
              <p className="h6 text-center mb-4">Already Have An Account?</p>
            </Link>
          </div>
        </form>
      </MDBCol>
    </div>
  );
};

export default Register;
