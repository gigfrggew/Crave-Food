import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();
    console.log("Login Response:", json);

    // If login failed
    if (!json.success) {
      if (json.error) {
        alert(json.error);  // Backend sends error message
      } else {
        alert("Invalid login credentials");
      }
      return; // Stop further execution
    }

    // If login successful
    localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("authToken", json.authToken);

    console.log("Auth Token Saved:", localStorage.getItem("authToken"));

    navigate("/");
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={onChange}
            id="loginEmail"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="loginPassword"
            required
          />
        </div>

        <button type="submit" className="m-3 btn btn-success">
          Submit
        </button>

        <Link to="/createuser" className="m-3 btn btn-danger">
          I'm a new user
        </Link>
      </form>
    </div>
  );
}
