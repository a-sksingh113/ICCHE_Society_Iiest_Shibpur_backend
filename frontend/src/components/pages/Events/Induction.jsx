import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

const Induction = () => {
  const [inductionEvents, setInductionEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInductionEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/freshersInductions"); // Replace with actual API endpoint
        setInductionEvents(response.data);
      } catch (err) {
        setError("Failed to fetch induction events");
      } finally {
        setLoading(false);
      }
    };

    fetchInductionEvents();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-center">Induction Events</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && inductionEvents.length === 0 && (
        <p className="text-center">No induction events found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inductionEvents.map((event) => (
          <div key={event._id} className="border rounded-lg p-4 shadow-md bg-white">
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
            <p><strong>Chief Guest:</strong> {event.chiefGuest}</p>
            <p><strong>Freshers Present:</strong> {event.fresherPresent}</p>
            <p><strong>Volunteers Present:</strong> {event.volunteerPresent}</p>

            {/* Photos Section */}
            {event.photos && event.photos.length > 0 && (
              <div className="mt-3">
                <h3 className="font-semibold">Photos:</h3>
                <div className="flex gap-2 overflow-x-auto">
                  {event.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Induction Photo ${index + 1}`}
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
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Induction;
