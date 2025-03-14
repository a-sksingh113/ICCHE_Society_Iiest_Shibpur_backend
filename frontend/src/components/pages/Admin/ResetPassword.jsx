import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import Layout from "../../layout/Layout";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password === confirmPassword) {
      setIsSubmitted(true); // Show success message
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="lg:w-1/4 border border-slate-500 rounded-xl p-6 shadow-lg text-center w-[250px]">
          {!isSubmitted ? (
            <>
              <h1 className="text-xl font-bold text-start">Reset Your Password</h1>
              <form className="flex flex-col gap-3 text-start" onSubmit={handleSubmit}>
                {/* New Password Field */}
                <div className="flex flex-col relative">
                  <label>New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
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

                {/* Confirm Password Field */}
                <div className="flex flex-col relative">
                  <label>Confirm Password</label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
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
                  Reset
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
