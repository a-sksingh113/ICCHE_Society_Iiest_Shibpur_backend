import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddHomePageImage = () => {
  const [formData, setFormData] = useState({
    title: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Uploading image...");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    if (imageFile) formDataToSend.append("image", imageFile);

    try {
      await axios.post("http://localhost:8000/api/admin/dashboard/add-homePageImage", formDataToSend, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.update(loadingToast, {
        render: "Image added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });

      setFormData({ title: "" });
      setImageFile(null);
    } catch (error) {
      toast.update(loadingToast, {
        render: error.response?.data?.message || "Failed to upload image!",
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
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Home Page Image</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Image Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition w-full"
          >
            Upload Image
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddHomePageImage;
