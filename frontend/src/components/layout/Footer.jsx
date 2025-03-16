import React, { useState } from "react";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
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
    <footer className="bg-gray-900 text-white py-6 px-6 md:px-16">
      <ToastContainer position="top-right" autoClose={3000} transition={Slide} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        
        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-blue-500 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-blue-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-pink-500 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="p-3 bg-gray-700 rounded-full hover:bg-blue-700 transition">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p>Email: <span className="text-blue-400">contact@icche.org</span></p>
          <p>Phone: <span className="text-blue-400">+91 98765 43210</span></p>
          <p>Address: <span className="text-blue-400">IIEST, Shibpur, India</span></p>
        </div>

        {/* Feedback Form */}
        <div className="bg-gray-800 p-4 rounded-lg w-full">
          <h2 className="text-lg font-semibold mb-4">Feedback Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <input
                type="text"
                name="fullName"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 transition"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 transition"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="contact"
                placeholder="Your Contact Number"
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 transition"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none focus:bg-gray-600 transition"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-400 text-sm">
        © 2024 ICCHE. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
