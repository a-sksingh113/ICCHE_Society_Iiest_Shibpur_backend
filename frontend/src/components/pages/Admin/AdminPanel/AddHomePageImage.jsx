import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../../layout/Layout";
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
      await axios.post(
        "http://localhost:8000/api/admin/dashboard/add-homePageImage",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        transition={Slide}
      />
      <div className="w-[90%] max-w-sm mx-auto p-6 min-w-2xs bg-white rounded-lg shadow-lg  text-xs sm:text-base mt-20 flex flex-col items-center justify-center ">
        <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
          Add Home Page Image
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-10">
            <input
              type="text"
              name="title"
              placeholder="Image Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition  w-full"
              required
            />
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition   w-full"
            required
          />
          <div className='mt-7'>
            <button
              type="submit"
              className="border-2 border-gray-600 py-2 link  px-5  mb-4 rounded w-full "
            >
              Upload Image
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddHomePageImage;
