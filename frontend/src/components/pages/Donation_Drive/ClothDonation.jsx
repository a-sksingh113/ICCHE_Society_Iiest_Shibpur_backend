import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

const ClothDonation = () => {
  const [clothDonations, setClothDonations] = useState([]);

  useEffect(() => {
    const fetchClothDonations = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/donation-drive/cloth-donations");
        console.log("API Response:", response.data); // Debugging
        setClothDonations(response.data);
      } catch (error) {
        console.error("Error fetching cloth donations:", error.message);
      }
    };

    fetchClothDonations();
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", marginBottom: "20px", color: "#333" }}>Cloth Donation Events</h2>
        {clothDonations.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
            {clothDonations.map((event) => (
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
                  padding: "15px",
                }}
              >
                {event.coverImageURL && (
                  <img
                    src={`http://localhost:8000${event.coverImageURL}`}
                    alt={event.title}
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                  />
                )}
                <h3 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#007bff" }}>{event.title}</h3>
                <p style={{ fontSize: "0.95rem", marginBottom: "10px", color: "#555" }}>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p> {/* ✅ Display location name */}
                <p><strong>Students Received:</strong> {event.studentsReceived}</p>
                <p><strong>Volunteers Present:</strong> {event.volunteerPresent}</p>
                <p><strong>Parents Received:</strong> {event.parentsReceived}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "1rem", color: "#666" }}>Loading cloth donation events...</p>
        )}
      </div>
    </Layout>
  );
};

export default ClothDonation;
