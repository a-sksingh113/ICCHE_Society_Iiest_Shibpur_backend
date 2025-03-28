import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddVolunteer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    enrollmentNo: "",
    gender: "",
    year: "",
    department: "",
    residenceType: "",
    hostelName: "",
    hallName: "",
    address: "",
  });

  const [coverImageURL, setCoverImageURL] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setCoverImageURL(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding volunteer...");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (coverImageURL) {
      formDataToSend.append("coverImageURL", coverImageURL);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/admin/dashboard/volunteers/add-volunteers",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(loadingToast, {
        render: "Volunteer added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });

      // Reset form after success
      setFormData({
        fullName: "",
        email: "",
        contactNumber: "",
        enrollmentNo: "",
        gender: "",
        year: "",
        department: "",
        residenceType: "",
        hostelName: "",
        hallName: "",
        address: "",
      });
      setCoverImageURL(null);
    } catch (error) {
      toast.update(loadingToast, {
        render: "Failed to add volunteer!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} transition={Slide} />

      <div className="w-[90%] max-w-xl mx-auto p-6  bg-white rounded-lg shadow-lg mt-7 text-xs sm:text-base ">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6 text-center">
          Add Volunteer
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition "
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          />

          {/* Contact Number */}
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          />

          {/* Enrollment Number */}
          <input
            type="text"
            name="enrollmentNo"
            placeholder="Enrollment No"
            value={formData.enrollmentNo}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Year */}
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          />

          {/* Department */}
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          />

          {/* Residence Type */}
          <select
            name="residenceType"
            value={formData.residenceType}
            onChange={handleChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          >
            <option value="">Select Residence Type</option>
            <option value="Hostel">Hostel</option>
            <option value="Hall">Hall</option>
            <option value="Day Scholar">Day Scholar</option>
          </select>

          {/* Conditional Fields */}
          {formData.residenceType === "Hostel" && (
            <input
              type="text"
              name="hostelName"
              placeholder="Hostel Name"
              value={formData.hostelName}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
              required
            />
          )}

          {formData.residenceType === "Hall" && (
            <input
              type="text"
              name="hallName"
              placeholder="Hall Name"
              value={formData.hallName}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
              required
            />
          )}

          {formData.residenceType === "Day Scholar" && (
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
              required
            />
          )}

          {/* Cover Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded col-span-2 focus:ring-2 focus:ring-gray-400 focus:outline-none transition text-xs sm:text-sm"
            required
          />

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className=" border-2 border-gray-600 py-2 link  px-5 mt-0 rounded"
            >
              Add Volunteer
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddVolunteer;
