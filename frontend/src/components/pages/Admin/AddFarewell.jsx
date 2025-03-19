import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddFarewell = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    finalYearStudentsPresent: "",
    juniorPresent: "",
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
    const loadingToast = toast.loading("Adding farewell...");

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
        "https://icche.vercel.app/api/admin/dashboard/events/farewells/add-farewell",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.update(loadingToast, {
        render: "Farewell added successfully!",
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
        finalYearStudentsPresent: "",
        juniorPresent: "",
      });
      setCoverImageURL(null);
      setPhotos([]);
      setVideos([]);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.update(loadingToast, {
        render: "Failed to add farewell!",
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

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Add Farewell</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="border p-2 rounded" />

          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required className="border p-2 rounded" />

          <input type="date" name="date" value={formData.date} onChange={handleChange} required className="border p-2 rounded" />

          <input type="text" name="venue" placeholder="Venue" value={formData.venue} onChange={handleChange} required className="border p-2 rounded" />

          <input type="number" name="finalYearStudentsPresent" placeholder="Final Year Students Present" value={formData.finalYearStudentsPresent} onChange={handleChange} required className="border p-2 rounded" />

          <input type="number" name="juniorPresent" placeholder="Juniors Present" value={formData.juniorPresent} onChange={handleChange} required className="border p-2 rounded" />

          {/* Cover Image Upload */}
          <label className="col-span-2">
            Cover Image:
            <input type="file" accept="image/*" onChange={(e) => setCoverImageURL(e.target.files[0])} className="border p-2 rounded w-full" required />
          </label>

          {/* Photos Upload */}
          <label className="col-span-2">
            Photos:
            <input type="file" accept="image/*" multiple onChange={(e) => handleFileChange(e, setPhotos)} className="border p-2 rounded w-full" />
          </label>

          {/* Videos Upload */}
          <label className="col-span-2">
            Videos:
            <input type="file" accept="video/*" multiple onChange={(e) => handleFileChange(e, setVideos)} className="border p-2 rounded w-full" />
          </label>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center">
            <button type="submit" className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
              Add Farewell
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddFarewell;
