import axios from "axios";
import React, { useState } from "react";
import {Link} from 'react-router-dom';
import './register.css'

const Register = () => {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");
  const [clickedRegister, setClickedRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userName,
      userPassword,
      userEmail,
    };

    axios.post("/api/register",body);

    setClickedRegister({clickedRegister: true})
  };

  return (
    <div>
      <h1>2cents</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
        className="register-inputs"
          type="text"
          placeholder="USERNAME"
          required
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
        className="register-inputs"
          type="password"
          placeholder="PASSWORD"
          required
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
        className="register-inputs"
          type="text"
          placeholder="EMAIL"
          required
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
        {clickedRegister ? (
          <Link to="/Login"><button>Continue</button></Link>
        ) : (
          <button
           
          >
            Register
          </button>
        )}
        <Link to="/Login"><p>Already Have An Account?</p></Link>
      </form>
    </div>
  );
};

export default Register;
