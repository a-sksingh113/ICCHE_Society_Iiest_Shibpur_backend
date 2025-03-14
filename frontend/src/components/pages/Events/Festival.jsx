import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

const Festival = () => {
  const [festivalEvents, setFestivalEvents] = useState([]);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events/festivals");
        if (response.data.success) {
          setFestivalEvents(response.data.data);
        } else {
          console.error("Failed to fetch festival events");
        }
      } catch (error) {
        console.error("Error fetching festival events:", error);
      }
    };

    fetchFestivals();
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>Festival Events</h2>
        {festivalEvents.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {festivalEvents.map((event) => (
              <div
                key={event._id}
                style={{
                  width: "320px",
                  background: "#ffffff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  textAlign: "left",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                }}
              >
                {event.coverImageURL && (
                  <img
                    src={event.coverImageURL}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "180px", // Rectangular shape
                      objectFit: "cover",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                    }}
                  />
                )}
                <div style={{ padding: "15px" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#007bff" }}>{event.title}</h3>
                  <p style={{ fontSize: "0.95rem", marginBottom: "10px", color: "#555" }}>{event.description}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                  <p><strong>Students Present:</strong> {event.studentsPresent}</p>
                  <p><strong>Volunteers Present:</strong> {event.volunteersPresent}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "1rem", color: "#666" }}>Loading festival events...</p>
        )}
      </div>
    </Layout>
  );
};

export default Festival;
