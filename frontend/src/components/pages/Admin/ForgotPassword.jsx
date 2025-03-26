import React, { useState, useEffect } from "react";
import axios from "axios"; // ✅ Import axios
import Layout from "../../layout/Layout";
import { FaCheckCircle } from "react-icons/fa"; // ✅ Import green tick icon

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(""); // ✅ Added error state
  const [timer, setTimer] = useState(0); // ✅ Timer for resend button

  // Function to handle input change
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/forget-password",
        { email }
      );

      if (!response.data.success) {
        setError("Invalid email. Please try again.");
        return;
      }

      console.log("Email sent:", response.data);
      setIsSubmitted(true);
      setTimer(30); // ✅ Start 30s timer
    } catch (error) {
      console.error("Request error:", error);
      if (error.response) {
        if (error.response.status === 403) {
          setError("Admin approval pending. Contact the PIC or Admin.");
        } else if (error.response.status === 404) {
          setError("Admin not found.");
        } else {
          setError("Failed to send email. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  // Function to handle email resend
  const handleResend = async () => {
    if (timer > 0) return; // Prevent multiple resends

    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/forget-password",
        { email }
      );

      if (!response.data.success) {
        setError("Invalid email. Please try again.");
        return;
      }

      console.log("Resend email success:", response.data);
      setTimer(30); // ✅ Restart 30s timer
    } catch (error) {
      setError("Failed to resend email. Please try again.");
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen text-xs sm:text-base">
        <div className="lg:w-1/4 border border-slate-500 rounded-xl p-6 shadow-lg w-[250px] text-center">
          {!isSubmitted ? (
            <>
              <h1 className="text-xl font-bold">Reset Your Password</h1>
              {error && <p className="text-red-600">{error}</p>}
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="flex flex-col text-start">
                  <label className="text-sm text-gray-800">
                    Enter your email, and we'll send you reset instructions.
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="form-control mt-3"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="border-2 border-gray-600 py-2 link rounded"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FaCheckCircle className="text-green-500 text-5xl mb-2" />
              <p className="text-lg font-semibold text-gray-700">
                Reset password instructions sent to your email!
              </p>

              {/* Resend Button */}
              <button
                onClick={handleResend}
                disabled={timer > 0}
                className={`link border-2 border-gray-600 py-2 px-5 rounded ${
                  timer > 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                }`}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend Email"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
