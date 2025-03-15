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
      setStudents((prevStudents) => prevStudents.filter((student) => student._id !== studentId));
      toast.success("Student deleted successfully!", { transition: Slide, autoClose: 3000 });
    } catch (error) {
      toast.error("Failed to delete student. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <h2 className="text-center my-6 text-2xl font-bold">Our Students</h2>

        {loading && <p className="text-center text-lg">Loading students...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <div
              key={student._id}
              className="bg-white p-5 shadow-md rounded-lg flex flex-col items-center text-center relative"
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
                className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
              />
              <h5 className="font-bold text-lg">{student.fullName}</h5>
              <p className="text-gray-600 text-sm">Gender: {student.gender}</p>
              <p className="text-gray-600 text-sm">Class: {student.studentClass}</p>
              <p className="text-gray-600 text-sm">Address: {student.address}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Students;

// Now, the delete button will only show if the user's role is "admin"! 🎯
