import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../layout/Layout";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        
        const response = await axios.get(
          "http://localhost:8000/api/admin/dashboard/feedback",
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        
        setFeedbacks(response.data);
      } catch (err) {
        setError("Failed to fetch feedback. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-6 text-xs sm:text-base ">
        <h2 className="text-2xl font-semibold text-center mb-6">
          User Feedback
        </h2>

        {loading && <p className="text-center">Loading feedback...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && feedbacks.length === 0 && (
          <p className="text-center text-gray-500">No feedback available.</p>
        )}

        {!loading && !error && feedbacks.length > 0 && (
          <div className="grid gap-4">
            {feedbacks.map((feedback) => (
              <div
                key={feedback._id}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold py-3">{feedback.fullName}</h3>
                <p className="text-gray-700">
                  <strong className='me-2 '>Email:</strong> {feedback.email}
                </p>
                <p className="text-gray-700">
                  <strong className='me-2'>Contact:</strong> {feedback.contact}
                </p>
                <p className="text-gray-600 mt-2"><strong className='me-2'>Message:</strong>{feedback.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Feedback;
