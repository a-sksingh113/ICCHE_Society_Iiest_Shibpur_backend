import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import axios from "axios"; // ✅ Import axios for API requests
import Layout from "../../layout/Layout";

const ResetPassword = () => {
  const { resetToken } = useParams(); // ✅ Get token from URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    if (!password || !confirmPassword) {
      setError("Please enter both password fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`https://icche.vercel.app/api/admin/reset-password/${resetToken}`, {
        password,
      });

      if (response.status === 200) {
        setIsSubmitted(true); 
      } else {
        setError("Failed to reset password. Try again.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError(error.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="lg:w-1/4 border border-slate-500 rounded-xl p-6 shadow-lg text-center w-[250px]">
          {!isSubmitted ? (
            <>
              <h1 className="text-xl font-bold text-start">Reset Your Password</h1>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <form className="flex flex-col gap-3 text-start" onSubmit={handleSubmit}>
                <div className="flex flex-col relative">
                  <label>New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control mt-2"
                    required
                  />
                  <span 
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="flex flex-col relative">
                  <label>Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control mt-2"
                    required
                  />
                  <span 
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                    onClick={handleToggleConfirmPassword}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded text-center transition duration-300 ease-in-out hover:bg-blue-700 mt-2"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaCheckCircle className="text-green-500 text-5xl mb-2" />
              <p className="text-lg font-semibold text-gray-700">
                Your password has been successfully changed!
              </p>
              <Link to="/" className="text-blue-500 mt-4">
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
