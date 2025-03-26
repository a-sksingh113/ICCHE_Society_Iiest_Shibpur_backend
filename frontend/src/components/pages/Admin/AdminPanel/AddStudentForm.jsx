import React, { useState, useRef } from "react";
import axios from "axios";
import Layout from "../../../layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddStudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    uniqueId: "",
    gender: "",
    studentClass: "",
    address: "",
    coverImageURL: null,
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) form.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/dashboard/students/add-students",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form",
          },
        }
      );

      if (response.data.success) {
        toast.success("Student added successfully!", { autoClose: 3000 });
        setFormData({
          fullName: "",
          uniqueId: "",
          gender: "",
          studentClass: "",
          address: "",
          coverImageURL: null,
        });
      } else {
        toast.error("Failed to add student. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
       <div className="w-[95%] max-w-md mx-auto p-8  bg-white rounded-lg shadow-lg mt-7 text-xs sm:text-base ">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-6 text-center">
          Add Student
        </h2>
        <form onSubmit={handleAddStudent} className="grid gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition "
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="uniqueId"
            placeholder="Unique ID"
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            value={formData.uniqueId}
            onChange={handleChange}
          />
          <select
            name="gender"
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transitiond"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="studentClass"
            placeholder="Class"
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            value={formData.studentClass}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
            value={formData.address}
            onChange={handleChange}
          />
          <input
            type="file"
            name="coverImageURL"
            accept="image/*"
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transitiond"
            onChange={handleChange}
            ref={fileInputRef}
          />

          <div className='flex justify-center'>
            <button
              type="submit"
              className="border-2 border-gray-600 py-2 link  px-5 mt-2 mb-4 rounded "
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddStudentForm;
