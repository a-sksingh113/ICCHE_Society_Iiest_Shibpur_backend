import React, { useState } from "react";
import Layout from "../layout/Layout";
import Style from "../../cssFiles/login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store login errors

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    console.log("Login Successful:", formData);
  };

  return (
    <Layout>
      <div className={`${Style.container}`}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Error Message (If login fails) */}
          {error && <p className={Style.error}>{error}</p>}

          <button type="submit">Login</button>

          <p>
            Doesn't register? <Link to="/signup">Register Now</Link>
          </p>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
