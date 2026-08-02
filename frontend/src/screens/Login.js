import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function Login() {

  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://crave-food-backend.onrender.com/api/loginuser", {
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
        toast.error(json.error, { toastId: 'login-error' });
      } else {
        toast.error("Invalid email or password.", { toastId: 'login-error' });
      }
      return; // Stop further execution
    }

    // If login successful
    localStorage.setItem("userEmail", credentials.email);
    localStorage.setItem("authToken", json.authToken);
    toast.success("Logged in successfully.", { toastId: 'login-success' });

    console.log("Auth Token Saved:", localStorage.getItem("authToken"));

    navigate("/");
  };

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-kicker">Welcome back</div>
        <h1 className="auth-title">Sign in to CraveFood</h1>
        <p className="auth-copy">Pick up right where your cravings left off.</p>
        
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

        <button type="submit" className="btn btn-success auth-submit">
          Sign in
        </button>

        <p className="mb-0 text-center text-muted">New to CraveFood? <Link to="/signup" className="auth-link">Create an account</Link></p>
      </form>
    </main>
  );
}
