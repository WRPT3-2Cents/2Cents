import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [userName, setUsername] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userEmail, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      userName,
      userPassword,
      userEmail,
    };

    axios.post("/api/register",body);
  };

  return (
    <div>
      <h1>2cents</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="USERNAME"
          required
          value={userName}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          required
          value={userPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="EMAIL"
          required
          value={userEmail}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Create Account</button>
      </form>
    </div>
  );
};

export default Register;
