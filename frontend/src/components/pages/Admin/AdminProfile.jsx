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

        const response = await axios.get("http://localhost:8000/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);  
        if (response.data.success) {
          setAdmin(response.data.admin); // Fix: Accessing 'admin' properly
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold">Admin Profile</h2>

        {/* Profile Image */}
        {admin?.profileImageURL && (
          <img
            src={admin.profileImageURL}
            alt="Profile"
            className="w-32 h-32 rounded-full mb-4"
          />
        )}

        <p><strong>Name:</strong> {admin?.fullName || "N/A"}</p>
        <p><strong>Email:</strong> {admin?.email || "N/A"}</p>
        <p><strong>Role:</strong> {admin?.role || "N/A"}</p>
        <p><strong>Contact:</strong> {admin?.contactNumber || "N/A"}</p>
        <p><strong>Gender:</strong> {admin?.gender || "N/A"}</p>
        <p><strong>Unique ID:</strong> {admin?.uniqueId || "N/A"}</p>

        {/* Edit Profile Button */}
        <div className="mt-4">
          <Link to="/edit-profile" className="text-blue-500 hover:underline">
            Edit Profile
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
