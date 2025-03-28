import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Layout from "../../layout/Layout";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/admin/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);
        if (response.data.success) {
          setAdmin(response.data.admin);
        } else {
          setError("Failed to load admin profile.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        if (err.response) {
          if (err.response.status === 404) {
            setError("Profile not found. Please contact support.");
          } else if (err.response.status === 401) {
            setError("Unauthorized access. Please log in.");
          } else {
            setError("An error occurred while fetching data.");
          }
        } else {
          setError("Failed to fetch admin data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, []);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-gray-200 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center w-full max-w-lg relative">
          {/* Profile Image */}
          {admin?.profileImageURL && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
              <img
                src={admin.profileImageURL}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow"
              />
            </div>
          )}

          {/* Profile Content */}
          <div className="mt-14">
            <h2 className="text-2xl font-bold">{admin?.fullName || "N/A"}</h2>
            <p className="text-gray-500">{admin?.email || "N/A"}</p>
            <div className="w-4/6 text-start mx-auto flex flex-col items-center p-2">
              <div className="mb-2">
                <strong className="me-2">Role:</strong> {admin?.role || "N/A"}
              </div>
              <div className="mb-2">
                <strong className="me-2">Contact:</strong> {admin?.contactNumber || "N/A"}
              </div>
              <div className="mb-2">
                <strong className="me-2">Gender:</strong> {admin?.gender || "N/A"}
              </div>
              <div className="mb-2">
                <strong className="me-2">Unique ID:</strong> {admin?.uniqueId || "N/A"}
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-3 mb-4">
              <Link
                to="/edit-profile"
                className="bg-gray-300 hover:bg-gray-400 text-black no-underline font-bold py-3 px-8 rounded-3xl transition duration-300"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
