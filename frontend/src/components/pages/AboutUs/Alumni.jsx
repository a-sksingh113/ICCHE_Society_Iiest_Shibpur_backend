import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { AiOutlineDelete } from "react-icons/ai";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDetails, setShowDetails] = useState({});

  const toggleDetails = (id) => {
    setShowDetails((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle current card's state
    }));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdmin(!!token);
    const fetchAlumni = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/alumni", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAlumni(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch alumni data");
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  const confirmDelete = (alumId) => {
    const toastId = toast.warn(
      <div>
        <p className="font-semibold text-gray-800">
          Are you sure you want to delete this alumnus?
        </p>
        <div className="mt-2 flex gap-3 justify-center">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              deleteAlumnus(alumId);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const deleteAlumnus = async (alumId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/dashboard/alumni/${alumId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAlumni((prevAlumni) =>
        prevAlumni.filter((alum) => alum._id !== alumId)
      );
      toast.success(" Alumnus deleted successfully!", {
        transition: Slide,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(" Failed to delete alumnus. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-1 ">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-center my-6 text-2xl font-bold">Our Alumni</h2>

      {loading && <p className="text-center text-lg">Loading alumni data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs md:text-base  ">
        {alumni.map((alum) => (
          <div
            key={alum._id}
            className="relative w-64 bg-gradient-to-b from-gray-200 to-white p-5 shadow-lg rounded-lg flex flex-col items-center text-center cursor-pointer transition-all duration-300"
          >
            {isAdmin && (
              <button
                onClick={() => confirmDelete(alum._id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 rounded-full"
              >
                <AiOutlineDelete size={24} />
              </button>
            )}

            <img
              src={alum.coverImageURL || "/uploads/default.png"}
              alt={alum.fullName}
              className="w-24 h-24 rounded-full object-cover mb-3"
            />
            <h5 className="font-bold text-lg">{alum.fullName}</h5>

            {/* Toggle Details Button */}
            {!showDetails[alum._id] ? (
              <button
                onClick={() => toggleDetails(alum._id)}
                className="link border-2 py-2 px-3 rounded border-gray-700"
              >
                View Details
              </button>
            ) : null}

            {/* Floating Details */}
            {showDetails[alum._id] && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 shadow-xl rounded-lg transition-all duration-300 opacity-100 z-50 overflow-hidden bg-white">
                {/* Upper Half - gray Background */}
                <div className="bg-gray-400 h-24 flex justify-center items-center relative">
                  <img
                    src={alum.coverImageURL || "/uploads/default.png"}
                    alt={alum.fullName}
                    className="w-24 h-24 rounded-full border-4 border-white absolute top-12 object-cover "
                  />
                </div>

                {/* Lower Half - White Background */}
                <div className="pt-12 pb-4 px-4 text-center bg-white">
                  <h3 className="text-gray-700 text-lg font-bold">
                    {alum.fullName}
                  </h3>
                  <div className="text-start mt-2 text-gray-600 text-sm">
                  <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Email:</strong> {alum.email}
                    </p>
                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Contact:</strong> {alum.contactNumber}
                    </p>
                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Enrollment ID:</strong> {alum.enrollmentNo}
                    </p>
                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Gender:</strong>
                      {alum.gender}
                    </p>

                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Department:</strong> {alum.department}
                    </p>
                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Graduation Year:</strong> {alum.graduationYear}
                    </p>
                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Company:</strong> {alum.company || "N/A"}
                    </p>
                    <p className="break-words overflow-auto whitespace-normal" >
                      <strong>Address:</strong> {alum.address || "N/A"}
                    </p>
                  </div>

                  {/* Hide Details Button */}
                  <button
                    onClick={() => toggleDetails(alum._id)}
                    className="mt-4 px-3 py-2 rounded bg-gray-500 text-white hover:bg-gray-800 transition-colors duration-300"
                  >
                    Hide Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
     
    </Layout>
  );
};

export default Alumni;
