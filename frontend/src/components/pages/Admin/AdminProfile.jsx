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

  if (loading) return <p style={{ color: "#f8f9fa" }}>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Layout>
      <div
        style={{
          backgroundColor: "#212529",
          color: "#f8f9fa",
          padding: "24px",
          borderRadius: "10px",
          maxWidth: "600px",
          margin: "20px auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Admin Profile</h2>

        {/* Profile Image */}
        {admin?.profileImageURL && (
          <img
            src={admin.profileImageURL}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "15px",
              border: "2px solid #f8f9fa",
            }}
          />
        )}

        <p><strong>Name:</strong> {admin?.fullName || "N/A"}</p>
        <p><strong>Email:</strong> {admin?.email || "N/A"}</p>
        <p><strong>Role:</strong> {admin?.role || "N/A"}</p>
        <p><strong>Contact:</strong> {admin?.contactNumber || "N/A"}</p>
        <p><strong>Gender:</strong> {admin?.gender || "N/A"}</p>
        <p><strong>Unique ID:</strong> {admin?.uniqueId || "N/A"}</p>

        {/* Edit Profile Button */}
        <div style={{ marginTop: "16px" }}>
          <Link
            to="/edit-profile"
            style={{
              color: "#0d6efd",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfile;
