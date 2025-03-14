import React, { useState } from "react";
import Layout from "../../layout/Layout";
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
      <div className="flex items-center justify-center min-h-screen">
  <div className="lg:w-1/4 border border-slate-500 rounded-xl p-6 shadow-lg ">
    <h1 className="text-center text-lg font-bold">Admin Login</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <Link to='/' type="submit" className="bg-blue-500 text-white p-2 border border-primary rounded no-underline text-center transition duration-300 ease-in-out hover:bg-blue-700 "
      >
        Login
      </Link>
      {/* Error Message (If login fails) */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <p className="text-center">
        Not registered? <Link to="/admin/signup" className="no-underline">Register Now</Link>
      </p>
      <p className="text-center">
        <Link to="/forgotpassword" className="no-underline">Forgot Password?</Link>
      </p>
    </form>
  </div>
</div>

    </Layout>
  );
};

export default Login;
