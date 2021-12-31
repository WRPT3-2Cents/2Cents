import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { MDBCol, MDBInput} from "mdbreact";
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer.js';

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const loginUser = () => {
  //   const body = {
  //     userName,
  //     password,
  //   };

  //   // axios.post("/api/login", body).then((res) => {});
  //   props.loginUser(body);
  // };

  return (
    <div className="login-container">
      <ToastContainer theme="dark" />
      <MDBCol>
        <form>
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
          <Link to="/Follows">
            <button onClick={() => props.loginUser({userName, password})}>Login</button>
          </Link>
          <Link to="/Sign-up">
            <p className="h6 text-center mb-4">Create An Account</p>
          </Link>
        </form>
      </MDBCol>
    </div>
  );
};

const mapStateToProps = (reduxState) => {
  return {
    state: reduxState,
  }
};

const mapDispatchToProps = { loginUser };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
