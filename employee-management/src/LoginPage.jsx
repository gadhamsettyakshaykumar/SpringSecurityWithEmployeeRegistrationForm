import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import "./App.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.username, credentials.password);
      alert("Login successful 🌙");
      navigate("/"); // Redirect after login
    } catch (error) {
      console.error(error);
      alert("Invalid username or password ❌");
    }
  };

  return (
    <div className="container">
      <h2>🔐 Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn">
          Login
        </button>
      </form>

      {/* 🌟 Add this below your form */}
      <p style={{ marginTop: "10px" }}>
        Don’t have an account?{" "}
        <Link to="/signup" className="link">
          Sign up here
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
