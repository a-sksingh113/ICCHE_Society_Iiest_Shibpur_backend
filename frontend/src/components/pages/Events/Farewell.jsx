import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const Farewell = () => {
  const [farewellEvents, setFarewellEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchFarewellEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/farewells");
        setFarewellEvents(response.data);
      } catch (err) {
        setError("Failed to fetch farewell events");
      } finally {
        setLoading(false);
      }
    };

    fetchFarewellEvents();
  }, []);

  const confirmDelete = (eventId) => {
    const toastId = toast.warn(
      <div>
        <p className="font-semibold text-gray-800">Are you sure you want to delete this event?</p>
        <div className="mt-2 flex gap-3 justify-center">
          <button
            onClick={() => {
              toast.dismiss(toastId);
              deleteEvent(eventId);
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

  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/dashboard/events/farewell/${eventId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setFarewellEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );

      toast.success("Event deleted successfully!", {
        transition: Slide,
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to delete event. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold mb-4 text-center">Farewell Events</h1>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && farewellEvents.length === 0 && (
        <p className="text-center">No farewell events found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {farewellEvents.map((event) => (
          <div key={event._id} className="border rounded-lg p-4 shadow-md bg-white relative">
            {/* Cover Image */}
            <img
              src={event.coverImageURL || "/uploads/default.png"}
              alt={event.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            {/* Event Details */}
            <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
            <p className="text-gray-600">{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Final Year Students Present:</strong> {event.finalYearStudentsPresent}</p>
            <p><strong>Juniors Present:</strong> {event.juniorPresent}</p>

            {/* Photos Section */}
            {event.photos && event.photos.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold">Photos:</h3>
                <div className="flex gap-2 overflow-x-auto">
                  {event.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Farewell Photo ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Videos Section */}
            {event.videos && event.videos.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold">Videos:</h3>
                <div className="flex gap-2 overflow-x-auto">
                  {event.videos.map((video, index) => (
                    <video key={index} className="w-32 h-32 rounded-lg" controls>
                      <source src={video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              </div>
            )}

            {/* Show Delete & Edit icons only if user is logged in */}
            {isLoggedIn && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => confirmDelete(event._id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <AiOutlineDelete size={24} />
                </button>
                <button
                  onClick={() => toast.info(`Editing Event: ${event._id}`)}
                  className="text-blue-500 hover:text-blue-700 p-2"
                >
                  <AiOutlineEdit size={24} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Farewell;
