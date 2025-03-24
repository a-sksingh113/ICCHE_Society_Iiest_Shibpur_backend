import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import Layout from "../../layout/Layout";
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

      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Title:</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description:</label>
            <textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold">Image File:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 border rounded"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <div>
            <label className="block font-semibold">PDF File:</label>
            <input
              type="file"
              accept="application/pdf"
              className="w-full p-2 border rounded"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit Notification
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddNotification;
