import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/activities");
        setActivities(response.data);
      } catch (err) {
        setError("Failed to fetch activities. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const confirmDelete = (id) => {
    const toastId = toast.warn(
      <div>
        <p className="font-semibold text-gray-800">Are you sure you want to delete this activity?</p>
        <div className="mt-2 flex gap-3 justify-center">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              deleteActivity(id);
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

  const deleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/events/activities/${id}`);
      setActivities(activities.filter((activity) => activity._id !== id));
      toast.success("✅ Activity deleted successfully!", { transition: Slide, autoClose: 3000 });
    } catch (err) {
      toast.error("❌ Failed to delete activity. Please try again.", { autoClose: 3000 });
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4 text-center">Activities</h1>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity._id} className="border rounded-lg p-4 shadow-md relative">
              <img
                src={activity.coverImageURL}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-lg cursor-pointer"
                onClick={() => setSelectedMedia(activity.coverImageURL)}
              />
              <h2 className="text-xl font-semibold mt-2">{activity.title}</h2>
              <p className="text-gray-600">{activity.description}</p>
              <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {activity.activityType}</p>
              <p><strong>Chief Guest:</strong> {activity.chiefGuest}</p>
              <p><strong>Venue:</strong> {activity.venue}</p>
              <p><strong>Students Present:</strong> {activity.studentsPresent}</p>
              <p><strong>Volunteers Present:</strong> {activity.volunteersPresent}</p>
              
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => confirmDelete(activity._id)}
                  className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg"
                >
                  Delete
                </button>
                <button
                  onClick={() => toast.info("Edit functionality coming soon!")}
                  className="bg-blue-500 text-white px-3 py-1 text-sm rounded-lg"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Activities;