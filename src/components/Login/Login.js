import axios from "axios";
import React, { useState } from "react";
import { Link} from "react-router-dom";
import './login.css'


const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  

  const loginUser = () => {
      const body = {
          userName,
          password
      };

      axios.post("/api/login", body)
      .then((res)=> {
         
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser} className="login-form">
        <input
        className="login-inputs"
          placeholder="USERNAME"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
        className="login-inputs"
          placeholder="PASSWORD"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/Follows"><button>Login</button></Link>
        <Link to="/Sign-up">
          <p>Create An Account</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
