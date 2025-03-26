import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddFestivals = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    venue: "",
    date: "",
    studentsPresent: "",
    volunteersPresent: "",
  });

  const [coverImageURL, setCoverImageURL] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e, setter) => {
    setter(e.target.files);
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding festival...");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    if (coverImageURL) formDataToSend.append("coverImageURL", coverImageURL);
    for (let i = 0; i < photos.length; i++) {
      formDataToSend.append("photos", photos[i]);
    }
    for (let i = 0; i < videos.length; i++) {
      formDataToSend.append("videos", videos[i]);
    }

    try {
      await axios.post(
        "http://localhost:8000/api/admin/dashboard/events/festivals/add-festival",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(loadingToast, {
        render: "Festival added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });

      setFormData({
        title: "",
        description: "",
        venue: "",
        date: "",
        studentsPresent: "",
        volunteersPresent: "",
      });
      setCoverImageURL(null);
      setPhotos([]);
      setVideos([]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.update(loadingToast, {
        render: "Failed to add festival!",
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
          Add Festival
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="number"
            name="studentsPresent"
            placeholder="Students Present"
            value={formData.studentsPresent}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="number"
            name="volunteersPresent"
            placeholder="Volunteers Present"
            value={formData.volunteersPresent}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          {/* Cover Image Upload */}
          <label className="col-span-2">
            Cover Image:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImageURL(e.target.files[0])}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition w-full"
              required
            />
          </label>

          {/* Photos Upload */}
          <label className="col-span-2">
            Photos:
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, setPhotos)}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition w-full"
            />
          </label>

          {/* Videos Upload */}
          <label className="col-span-2">
            Videos:
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={(e) => handleFileChange(e, setVideos)}
              className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition w-full"
            />
          </label>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="border-2 border-gray-600 py-2 link  px-5 mt-2 mb-4 rounded"
            >
              Add Festival
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddFestivals;
