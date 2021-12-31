import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { MDBCol, MDBInput } from "mdbreact";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = () => {
    const body = {
      username,
      password,
    };

    axios.post("/api/login", body).then((res) => {
      navigate("/follows");
    });
  };

  return (
    <div className="login-container">
      <MDBCol>
        <form onSubmit={loginUser}>
          <h1 className="h1 text-center mb-4">Login</h1>
          <div className="black-text">
            <MDBInput
              label="Enter your username"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
            <MDBInput
              label="Enter your password"
              group
              type="password"
              validate
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button>Login</button>
          </div>
          <Link to="/Sign-up">
            <p className="h6 text-center mb-4">Create An Account</p>
          </Link>
        </form>
      </MDBCol>
    </div>
  );
};

export default Login;
