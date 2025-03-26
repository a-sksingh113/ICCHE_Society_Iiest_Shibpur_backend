import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddInduction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    chiefGuest: "",
    fresherPresent: "",
    volunteerPresent: "",
  });

  const [coverImageURL, setCoverImageURL] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e, setter) => {
    setter(e.target.files);
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Adding induction...");

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
        "http://localhost:8000/api/admin/dashboard/events/freshersInductions/add-freshersInduction",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(loadingToast, {
        render: "Induction added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
      });

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        date: "",
        venue: "",
        chiefGuest: "",
        fresherPresent: "",
        volunteerPresent: "",
      });
      setCoverImageURL(null);
      setPhotos([]);
      setVideos([]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.update(loadingToast, {
        render: "Failed to add induction!",
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

      <div className="w-[90%] max-w-xl mx-auto p-6  bg-white rounded-lg shadow-lg mt-7 text-xs sm:text-base mb-7 ">
        <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
          Add Induction
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

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
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
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="text"
            name="chiefGuest"
            placeholder="Chief Guest"
            value={formData.chiefGuest}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="number"
            name="fresherPresent"
            placeholder="Freshers Present"
            value={formData.fresherPresent}
            onChange={handleChange}
            required
            className="border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
          />

          <input
            type="number"
            name="volunteerPresent"
            placeholder="Volunteers Present"
            value={formData.volunteerPresent}
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
              Add Induction
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddInduction;
