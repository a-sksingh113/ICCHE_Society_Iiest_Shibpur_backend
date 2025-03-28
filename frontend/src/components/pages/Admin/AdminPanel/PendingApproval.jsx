import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../layout/Layout";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PendingApproval = () => {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  // Function to fetch pending approvals
  const fetchPendingApprovals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/dashboard/pending-approvals",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data && response.data.success) {
        const approvalsWithIds = response.data.data.map((approval) => ({
          id: approval._id, // Ensure Object ID is stored properly
          ...approval,
        }));
        setPendingApprovals(approvalsWithIds);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Function to approve a user
  const handleApprove = async (id) => {
    const loadingToast = toast.loading("Approving user...");
    try {
      await axios.put(
        `https://icche.vercel.app/api/admin/dashboard/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.update(loadingToast, {
        render: "User approved!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setPendingApprovals(
        pendingApprovals.filter((approval) => approval.id !== id)
      ); // Remove from list
    } catch (error) {
      console.error("Error approving user:", error);
      toast.update(loadingToast, {
        render: "Approval failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  // Function to reject a user
  const handleReject = async (id) => {
    const loadingToast = toast.loading("Rejecting user...");
    try {
      await axios.delete(
        `https://icche.vercel.app/api/admin/dashboard/reject/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.update(loadingToast, {
        render: "User rejected!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setPendingApprovals(
        pendingApprovals.filter((approval) => approval.id !== id)
      ); // Remove from list
    } catch (error) {
      console.error("Error rejecting user:", error);
      toast.update(loadingToast, {
        render: "Rejection failed!",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto text-xs sm:text-base ">
        <h2 className="text-2xl font-bold mb-4">Pending Approvals</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading &&
          !error &&
          (pendingApprovals.length === 0 ? (
            <p>No pending approvals found.</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[400px] sm:min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Email</th>
                    <th className="border p-2">Role</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingApprovals.map((approval) => (
                    <tr key={approval.id} className="text-center">
                      <td className="border p-2">{approval.fullName}</td>
                      <td className="border p-2">{approval.email}</td>
                      <td className="border p-2">{approval.role}</td>
                      <td className="border p-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                        <button
                          onClick={() => handleApprove(approval.id)}
                          className="border-2 border-gray-500 px-3 py-1 rounded w-full sm:w-auto link"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(approval.id)}
                          className="rounded text-white bg-gray-500 px-4 py-1 hover:bg-gray-900 transition-colors duration-500 w-full sm:w-auto"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default PendingApproval;
