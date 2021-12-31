
import React, { useState , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { MDBCol, MDBInput} from "mdbreact";
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer.js';
import { toast, ToastContainer } from "react-toastify";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  
  useEffect(()=>{
    if(props.state.loggedIn){
      toast.success("Succesful Login")
      navigate("/follows")
    }
  }, [props.state.loggedIn, navigate])
  
  return (
    <div className="login-container">
      <ToastContainer />
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
          </div >
          <div className="text-center">
            <button onClick={() => props.loginUser({userName, password})}>Login</button>
          </div>
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
