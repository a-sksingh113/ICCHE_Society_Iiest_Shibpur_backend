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
      <div className="container mx-auto px-1 ">
        <ToastContainer position="top-right" autoClose={3000} />
        <h1 className="text-center my-6 text-2xl font-bold">Our Volunteers</h1>

        {loading && (
          <p className="text-center text-lg">Loading volunteers...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-xs md:text-base  ">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              className="relative w-64 bg-gradient-to-b from-gray-200 to-white p-5 shadow-lg rounded-lg flex flex-col items-center text-center cursor-pointer transition-all duration-300
                 "
            >
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(volunteer._id);
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 rounded-full "
                >
                  <AiOutlineDelete size={24} />
                </button>
              )}
              <img
                src={volunteer.coverImageURL || "/uploads/default.png"}
                alt={volunteer.fullName}
                className="w-24 h-24 rounded-full object-cover mb-3 "
              />
              <h5 className="font-bold text-lg">{volunteer.fullName}</h5>

              {/* Toggle Details Button */}
              {!showDetails[volunteer._id] ? (
                <button
                  onClick={() => toggleDetails(volunteer._id)}
                  className="link border-2 py-2 px-3 rounded border-gray-700"
                >
                  View Details
                </button>
              ) : null}

              {/* Floating Details */}
              {showDetails[volunteer._id] && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 shadow-xl rounded-lg transition-all duration-300 opacity-100 z-50 overflow-hidden bg-white">
                  {/* Upper Half - gray Background */}
                  <div className="bg-gray-400 h-24 flex justify-center items-center relative">
                    <img
                      src={volunteer.coverImageURL || "/uploads/default.png"}
                      alt={volunteer.fullName}
                      className="w-24 h-24 rounded-full border-4 border-white absolute top-12 object-cover "
                    />
                  </div>

                  {/* Lower Half - White Background */}
                  <div className="pt-12 pb-4 px-4 text-center bg-white">
                    <h3 className="text-gray-700 text-lg font-bold">
                      {volunteer.fullName}
                    </h3>
                    <div className="text-start mt-2 text-gray-600 text-sm">
                      <p className="break-words overflow-auto whitespace-normal" >
                        <strong>Email:</strong> {volunteer.email}
                      </p>
                      <p className="break-words overflow-auto whitespace-normal" >
                        {" "}
                        <strong>Contact:</strong>
                        {volunteer.contactNumber}
                      </p>
                      <p>
                        <strong>Enrollment No:</strong> {volunteer.enrollmentNo}
                      </p>
                      <p className="break-words overflow-auto whitespace-normal" >
                        {" "}
                        <strong>Gender:</strong>
                        {volunteer.gender}
                      </p>
                      <p className="break-words overflow-auto whitespace-normal" >
                        <strong>Year: </strong>
                        {volunteer.year}
                      </p>
                      <p className="break-words overflow-auto whitespace-normal" >
                        <strong>Department:</strong> {volunteer.department}
                      </p>
                      <p className="break-words overflow-auto whitespace-normal" >
                        <strong>Residence:</strong> {volunteer.residenceType}
                      </p>
                      {volunteer.residenceType === "Hostel" && (
                        <p className="break-words overflow-auto whitespace-normal" >
                          <strong>Hostel: </strong> {volunteer.hostelName}
                        </p>
                      )}
                      {volunteer.residenceType === "Hall" && (
                        <p className="break-words overflow-auto whitespace-normal" >
                          <strong>Hall: </strong> {volunteer.hallName}
                        </p>
                      )}
                      {volunteer.residenceType === "Day Scholar" && (
                         <p className="break-words overflow-auto whitespace-normal" >
                          <strong>Address: </strong> {volunteer.address}
                        </p>
                      )}
                    </div>

                    {/* Hide Details Button */}
                    <button
                      onClick={() => toggleDetails(volunteer._id)}
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

export default Volunteers;
