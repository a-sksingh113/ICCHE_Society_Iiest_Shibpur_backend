import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../../layout/Layout";
import "react-toastify/dist/ReactToastify.css";

const AddNotification = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Adding notification...", { toastId: "loading" });

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("imageFile", imageFile);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    try {
      await axios.post(
        "http://localhost:8000/api/admin/dashboard/add-notification",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.update(loadingToast, {
        render: "Notification added successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
        toastId: "success",
      });

      // Reset Form Fields
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPdfFile(null);
    } catch (error) {
      toast.update(loadingToast, {
        render: "Failed to add notification!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        transition: Slide,
        toastId: "error",
      });
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} transition={Slide} />

      <div className="w-[80%] max-w-sm mx-auto p-6  bg-white rounded-lg shadow-lg mt-7 text-xs sm:text-base ">
      <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">
          Add Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Title:</label>
            <input
              type="text"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="form-label">Description:</label>
            <textarea
              className="w-full border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="form-label">Image File:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div>
            <label className="form-label">PDF File:</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-gray-400 focus:outline-none transition"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </div>
          <div className='flex justify-center'>
          <button
            type="submit"
            className=" border-2 border-gray-600 py-2 link  px-5 mt-2 mb-4 rounded"
          >
            Submit Notification
          </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNotification;
