import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { AiOutlineDelete } from "react-icons/ai";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Students = () => {
  const [students, setStudents] = useState([]);
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

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const confirmDelete = (studentId) => {
    const toastId = toast.warn(
      <div>
        <p className="font-semibold text-gray-800">
          Are you sure you want to delete this student?
        </p>
        <div className="mt-2 flex gap-3 justify-center">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              deleteStudent(studentId);
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

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/dashboard/students/${studentId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
      toast.success("Student deleted successfully!", {
        transition: Slide,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to delete student. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-1 ">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-center my-6 text-2xl font-bold">Our Students</h2>

        {loading && <p className="text-center text-lg">Loading students...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className=" mx-auto grid grid-cols-1 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs md:text-base  ">
          {students.map((student) => (
            <div
              key={student._id}
              className="relative bg-gradient-to-b from-gray-200 to-white p-5 shadow-lg rounded-lg flex flex-col items-center text-center cursor-pointer transition-all duration-300
                 "
            >
              {isAdmin && (
                <button
                  onClick={() => confirmDelete(student._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 rounded-full"
                >
                  <AiOutlineDelete size={24} />
                </button>
              )}
              <img
                src={student.coverImageURL || "/uploads/default.png"}
                alt={student.fullName}
                className="w-24 h-24 rounded-full object-cover mb-3"
              />
              <h5 className="font-bold text-lg">{student.fullName}</h5>

              {/* Toggle Details Button */}
              {!showDetails[student._id] ? (
                <button
                  onClick={() => toggleDetails(student._id)}
                  className="link border-2 py-2 px-3 rounded border-gray-700"
                >
                  View Details
                </button>
              ) : null}

              {/* Floating Details */}
              {showDetails[student._id] && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 shadow-xl rounded-lg transition-all duration-300 opacity-100 z-50 overflow-hidden bg-white">
                  {/* Upper Half - gray Background */}
                  <div className="bg-gray-400 h-24 flex justify-center items-center relative">
                    <img
                      src={student.coverImageURL || "/uploads/default.png"}
                      alt={student.fullName}
                      className="w-24 h-24 rounded-full border-4 border-white absolute top-12 object-cover "
                    />
                  </div>

                  {/* Lower Half - White Background */}
                  <div className="pt-12 pb-4 px-4 text-center bg-white">
                    <h3 className="text-gray-700 text-lg font-bold">
                      {student.fullName}
                    </h3>
                    <div className="text-start mt-2 text-gray-600 text-sm">
                      <p>
                        <strong>ID:</strong> {student.uniqueId}
                      </p>
                      <p>
                        {" "}
                        <strong>Gender:</strong>
                        {student.gender}
                      </p>

                      <p>
                        <strong>Class:</strong> {student.studentClass}
                      </p>
                      <p>
                        <strong>Address:</strong> {student.address}
                      </p>
                    </div>

                    {/* Hide Details Button */}
                    <button
                      onClick={() => toggleDetails(student._id)}
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

export default Students;

// Now, the delete button will only show if the user's role is "admin"! 🎯
