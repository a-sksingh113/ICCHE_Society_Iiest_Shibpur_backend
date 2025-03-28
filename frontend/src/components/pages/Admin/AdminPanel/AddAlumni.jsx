import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddAlumni = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    enrollmentNo: "",
    gender: "",
    department: "",
    graduationYear: "",
    company: "",
    address: "",
  });

  const [coverImageURL, setCoverImageURL] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCoverImageURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding alumni...");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    });

    if (coverImageURL) {
      formDataToSend.append("coverImageURL", coverImageURL);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/admin/dashboard/alumni/add-alumni",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(loadingToast, {
        render: "Alumni added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });

      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        enrollmentNo: "",
        gender: "",
        department: "",
        graduationYear: "",
        company: "",
        address: "",
      });
      setCoverImageURL(null);
    } catch (error) {
      console.log(error)
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to add alumni!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  return (
    <Layout>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
      />
       <div className="w-[90%] max-w-xl mx-auto p-6  bg-white rounded-lg shadow-lg mt-7 text-xs sm:text-base ">
        <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
          Add Alumni
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <input
            type="text"
            name="enrollmentNo"
            placeholder="Enrollment No"
            value={formData.enrollmentNo}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <input
            type="number"
            name="graduationYear"
            placeholder="Graduation Year"
            value={formData.graduationYear}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="Company (Optional)"
            value={formData.company}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />
          <input
            type="text"
            name="address"
            placeholder="Address (Optional)"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            required
          />
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="border-2 border-gray-600 py-2 link  px-5 mt-2 mb-4 rounded "
            >
              Add Alumni
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddAlumni;
