import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import { MDBCol, MDBInput} from "mdbreact";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    const body = {
      userName,
      password,
    };

    axios.post("/api/login", body).then((res) => {});
  };

  return (
    <div className="login-container" >
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
            value={userName}
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
          <Link to="/Follows">
            <button>Login</button>
          </Link>
          <Link to="/Sign-up">
            <p className="h6 text-center mb-4">Create An Account</p>
          </Link>
        </form>
      </MDBCol>
    </div>
  );
};

export default Login;
