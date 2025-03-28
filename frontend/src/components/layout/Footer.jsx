import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFacebook } from "react-icons/bs";
import { FaSquareInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting your feedback...");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8000/api/feedback/add-feedback",
        formData
      );

      toast.update(loadingToast, {
        render: "Feedback submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });

      setFormData({ fullName: "", email: "", contact: "", message: "" });
    } catch (error) {
      toast.update(loadingToast, {
        render: "Failed to submit feedback!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-100 border px-4 py-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
      />

      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-8 lg:gap-12">
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold">CONTACT US</h1>
          <p className="text-gray-600 mt-2">We'd love to hear from you!</p>

          <div className="flex flex-col sm:flex-row mt-6">
            <div className="w-full sm:w-1/2 flex flex-col items-center sm:items-start p-4">
              <h2 className="text-lg font-extrabold mb-2">Our Office</h2>
              <p className="text-gray-700">+91 465858588</p>
              <p className="text-gray-700">Slater Hall</p>
              <p className="text-gray-700">
                IIEST, Shibpur, Howrah, West Bengal
              </p>
            </div>

            <div className="w-full sm:w-1/2 flex flex-col items-center p-4">
              <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
              <ul className="flex gap-6 mt-3">
                <li>
                  <Link to="/facebook">
                    <BsFacebook className="size-7 text-blue-900" />
                  </Link>
                </li>
                <li>
                  <Link to="/instagram">
                    <FaSquareInstagram className="size-7 text-pink-800" />
                  </Link>
                </li>
                <li>
                  <Link to="/twitter">
                    <FaTwitter className="size-7 text-blue-700" />
                  </Link>
                </li>
                <li>
                  <Link to="/linkedin">
                    <FaLinkedin className="size-7 text-blue-500" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="w-full max-w-xs p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-center mb-4">
            Feedback Form
          </h2>
          <form onSubmit={handleSubmit} className="space-y-3 ">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Your Name"
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="contact"
                placeholder="Your Contact Number"
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                rows="3"
                placeholder="Your Message"
                className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-700 text-white font-extrabold py-2 hover:bg-gray-900 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
