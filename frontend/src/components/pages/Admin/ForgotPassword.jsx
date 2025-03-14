import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Importing a green tick icon

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(true);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true); // Hide form and show success message
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="lg:w-1/4 border border-slate-500 rounded-xl p-6 shadow-lg w-[250px] text-center">
          {!isSubmitted ? (
            <>
              <h1 className="text-xl font-bold">Reset Your Password</h1>
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
                  className="bg-blue-500 text-white p-2 rounded text-center transition duration-300 ease-in-out hover:bg-blue-700"
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
