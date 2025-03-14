import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/activities"); // Replace with actual API endpoint
        setActivities(response.data);
      } catch (err) {
        setError("Failed to fetch activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Activities</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <div key={activity._id} className="border rounded-lg p-4 shadow-md">
              <img
                src={activity.coverImageURL}
                alt={activity.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2">{activity.title}</h2>
              <p className="text-gray-600">{activity.description}</p>
              <p><strong>Date:</strong> {new Date(activity.date).toLocaleDateString()}</p>
              <p><strong>Type:</strong> {activity.activityType}</p>
              <p><strong>Chief Guest:</strong> {activity.chiefGuest}</p>
              <p><strong>Venue:</strong> {activity.venue}</p>
              <p><strong>Students Present:</strong> {activity.studentsPresent}</p>
              <p><strong>Volunteers Present:</strong> {activity.volunteersPresent}</p>

              {/* Photos Section */}
              {activity.photos && activity.photos.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold">Photos:</h3>
                  <div className="flex gap-2 overflow-x-auto">
                    {activity.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Activity Photo ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Videos Section */}
              {activity.videos && activity.videos.length > 0 && (
                <div className="mt-3">
                  <h3 className="font-semibold">Videos:</h3>
                  <div className="flex gap-2 overflow-x-auto">
                    {activity.videos.map((video, index) => (
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
      )}
    </Layout>
  );
};

export default Activities;
