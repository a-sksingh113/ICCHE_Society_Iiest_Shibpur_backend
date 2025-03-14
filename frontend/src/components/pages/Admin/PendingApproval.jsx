import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";

const PendingAdmins = () => {
  const [pendingAdmins, setPendingAdmins] = useState([]);

  useEffect(() => {
    const fetchPendingAdmins = async () => {
      try {
        const response = await axios.get("/api/admins/pending");
        setPendingAdmins(response.data.pendingAdmins);
      } catch (error) {
        console.error("Error fetching pending admins", error);
      }
    };
    fetchPendingAdmins();
  }, []);

  return (
    <Layout>

    
    <div>
      <h2>Pending Admin Approvals</h2>
      {pendingAdmins.length === 0 ? (
        <p>No pending approvals.</p>
      ) : (
        <ul>
          {pendingAdmins.map((admin) => (
            <li key={admin._id}>
              {admin.fullName} - {admin.email}
              <button onClick={() => handleApprove(admin._id)}>Approve</button>
              <button onClick={() => handleReject(admin._id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </Layout>
  );

  async function handleApprove(adminId) {
    try {
      await axios.put(`/api/admins/approve/${adminId}`);
      setPendingAdmins((prev) => prev.filter((admin) => admin._id !== adminId));
      alert("Admin approved!");
    } catch (error) {
      console.error("Error approving admin", error);
    }
  }

  async function handleReject(adminId) {
    try {
      await axios.delete(`/api/admins/reject/${adminId}`);
      setPendingAdmins((prev) => prev.filter((admin) => admin._id !== adminId));
      alert("Admin rejected.");
    } catch (error) {
      console.error("Error rejecting admin", error);
    }
  }
};

export default PendingAdmins;
