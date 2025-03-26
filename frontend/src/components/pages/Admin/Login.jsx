import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Layout from "../../layout/Layout";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Store login errors
  const navigate = useNavigate(); // Initialize navigation

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/admin/signin", formData);

      if (!response.data.success) {
        setError("Invalid email or password.");
        return;
      }

      console.log("Login success:", response.data);

      // Store the token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to dashboard
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error statuses
      if (error.response) {
        if (error.response.status === 403) {
          setError("Admin approval pending. Contact the PIC or Admin.");
        } else if (error.response.status === 404) {
          setError("Admin not found.");
        } else if (error.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("Login failed. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="lg:w-1/4 border border-slate-500 rounded-xl p-6 shadow-lg text-xs sm:text-base">
          <h1 className="text-center text-lg font-bold">Admin Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded col-span-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                required
              />
            </div>

            <div className="flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-2 rounded col-span-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
                required
              />
            </div>

            <button type="submit" className="border-2 py-2 transition-colors duration-300 border-gray-500 hover:bg-gray-600 link active:bg-gray-700 rounded">
              Login
            </button>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-center">
              Not registered? <Link to="/admin/signup" className="no-underline home-link">Register Now</Link>
            </p>
            <p className="text-center">
              <Link to="/forgotpassword" className="no-underline  home-link">Forgot Password?</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
