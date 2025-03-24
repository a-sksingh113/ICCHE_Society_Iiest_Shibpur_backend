import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { AiOutlineDelete } from "react-icons/ai";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAdmin(!!token);
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/volunteers", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  const confirmDelete = (volunteerId) => {
    const toastId = toast.warn(
      <div>
        <p className="font-semibold text-gray-800">
          Are you sure you want to delete this volunteer?
        </p>
        <div className="mt-2 flex gap-3 justify-center">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              deleteVolunteer(volunteerId);
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

  const deleteVolunteer = async (volunteerId) => {
    try {
      await fetch(
        `http://localhost:8000/api/admin/dashboard/volunteers/${volunteerId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setVolunteers((prevVolunteers) =>
        prevVolunteers.filter((volunteer) => volunteer._id !== volunteerId)
      );
      toast.success(" Volunteer deleted successfully!", {
        transition: Slide,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(" Failed to delete volunteer. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-center my-6 text-2xl font-bold">Our Volunteers</h2>

      {loading && <p className="text-center text-lg">Loading volunteers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              className="bg-white p-5 shadow-md rounded-lg flex flex-col items-center text-center relative"
            >
              {isAdmin && (
                <button
                  onClick={() => confirmDelete(volunteer._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 rounded-full"
                >
                  <AiOutlineDelete size={24} />
                </button>
              )}

              <img
                src={volunteer.coverImageURL || "/uploads/default.png"}
                alt={volunteer.fullName}
                className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
              />
              <h5 className="font-bold text-lg">{volunteer.fullName}</h5>
              <p className="text-gray-600 text-sm">Email: {volunteer.email}</p>
              <p className="text-gray-600 text-sm">
                Contact: {volunteer.contactNumber}
              </p>
              <p className="text-gray-600 text-sm">
                Enrollment No: {volunteer.enrollmentNo}
              </p>
              <p className="text-gray-600 text-sm">
                Gender: {volunteer.gender}
              </p>
              <p className="text-gray-600 text-sm">Year: {volunteer.year}</p>
              <p className="text-gray-600 text-sm">
                Department: {volunteer.department}
              </p>
              <p className="text-gray-600 text-sm">
                Residence: {volunteer.residenceType}
              </p>
              {volunteer.residenceType === "Hostel" && (
                <p className="text-gray-600 text-sm">
                  Hostel: {volunteer.hostelName}
                </p>
              )}
              {volunteer.residenceType === "Hall" && (
                <p className="text-gray-600 text-sm">
                  Hall: {volunteer.hallName}
                </p>
              )}
              {volunteer.residenceType === "Day Scholar" && (
                <p className="text-gray-600 text-sm">
                  Address: {volunteer.address}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Volunteers;
