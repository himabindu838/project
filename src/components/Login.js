import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateUsername = (username) => {
    const usernameRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*]{1,25}$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateUsername(username)) {
      setError("Invalid username. Ensure it meets the criteria.");
      return;
    }
    if (!validatePassword(password)) {
      setError("Invalid password. Ensure it meets the criteria.");
      return;
    }
    setError("");
    navigate("/dashboard");
  };

  return (
    <div className="loginBackground">
    <div className="login">
       <div className="loginPage">
      <h2 style={{color:"blueviolet",fontStyle:"cursive",}}>Login</h2>
      <form onSubmit={handleLogin}>
       
        <div className="userDetails">
          <label>Username:</label>
          <input className="loginInput"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>
        <span style={{color:"red"}}>* Username should contain atleast one capitalletter, and one number</span>

        <div className="userDetails">
          <label>Password:</label>
          <input className="loginInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>
        <span style={{color:"red"}}>* Password should contain atleast one capitalletter, and one number and one special character and morethan 8 characters</span>
        <br/>
        <br/>

     <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
       
        </div>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
