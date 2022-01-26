
import React, { useState , useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import "./login.css";
import { MDBCol, MDBInput} from "mdbreact";
import { connect } from 'react-redux';
import { loginUser } from '../../redux/reducer.js';
import { toast } from "react-toastify";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(props.state.loggedIn){
      toast.success("Succesful Login")
      navigate("/follows")
    }
  }, [props.state.loggedIn, navigate])

  const loggingIn = (e) => {
    e.preventDefault();
    props.loginUser({userName, password});
  }

  const guestLogin = (e) => {
    e.preventDefault();
    const userName = 'guest';
    const password = 'guest';
    props.loginUser({userName, password})
  }
  
  return (
    <div className="login-container">
      <MDBCol>
        <form>
          <h1 className="h1 text-center mb-4">Login</h1>
          <div className="black-text">
            <MDBInput
            icon='user'
              label="Enter your username"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <MDBInput
            icon='lock'
              label="Enter your password"
              group
              type="password"
              validate
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button onClick={loggingIn} className='button-login'>Login</button>
            <button onClick={guestLogin} className='guest-button-login'>Login as a Guest</button>
          </div>
          <Link to="/Sign-up">
            <p className="h6 text-center mb-4">Create An Account Today!</p>
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
