import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";

const UpdateAdmin = ({ adminId }) => {
  const [adminData, setAdminData] = useState({
    contactNumber: "",
    year: "",
    department: "",
    residenceType: "",
    hostelName: "",
    hallName: "",
    address: "",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`/api/admins/profile/${adminId}`);
        setAdminData(response.data.admin);
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };
    fetchAdminData();
  }, [adminId]);

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/admins/update/${adminId}`, adminData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Layout>
      <div>
        <h2>Update Profile</h2>
        <input
          type="text"
          name="contactNumber"
          value={adminData.contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
        />
        <input
          type="text"
          name="year"
          value={adminData.year}
          onChange={handleChange}
          placeholder="Year (For Volunteers)"
        />
        <input
          type="text"
          name="department"
          value={adminData.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <select
          name="residenceType"
          value={adminData.residenceType}
          onChange={handleChange}
        >
          <option value="">Select Residence Type</option>
          <option value="Hostel">Hostel</option>
          <option value="Hall">Hall</option>
          <option value="Day Scholar">Day Scholar</option>
        </select>
        {adminData.residenceType === "Hostel" && (
          <input
            type="text"
            name="hostelName"
            value={adminData.hostelName}
            onChange={handleChange}
            placeholder="Hostel Name"
          />
        )}
        {adminData.residenceType === "Hall" && (
          <input
            type="text"
            name="hallName"
            value={adminData.hallName}
            onChange={handleChange}
            placeholder="Hall Name"
          />
        )}
        {adminData.residenceType === "Day Scholar" && (
          <input
            type="text"
            name="address"
            value={adminData.address}
            onChange={handleChange}
            placeholder="Address"
          />
        )}
        <button onClick={handleUpdate}>Update Profile</button>
      </div>
    </Layout>
  );
};

export default UpdateAdmin;
