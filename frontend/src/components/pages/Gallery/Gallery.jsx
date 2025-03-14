import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import axios from "axios";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/gallery");
        console.log("Gallery API Response:", response.data);

        if (response.data && response.data.success) {
          setGalleryItems(response.data.data);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching gallery:", error.message);
      }
    };

    fetchGallery();
  }, []);

  return (
    <Layout>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "30px", color: "#333" }}>Gallery</h2>

        {galleryItems.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", // Responsive grid
            gap: "25px",
            justifyContent: "center",
          }}>
            {galleryItems.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#ffffff",
                  borderRadius: "12px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  textAlign: "left",
                  overflow: "hidden",
                  transition: "transform 0.3s ease",
                  padding: "20px",
                }}
              >
                <h3 style={{ fontSize: "1.6rem", marginBottom: "15px", color: "#007bff", textAlign: "center" }}>
                  {item.title}
                </h3>

                {/* 📸 Photos Section */}
                {item.photos && item.photos.length > 0 && (
                  <div style={{ marginTop: "15px" }}>
                    <h4 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#333", textAlign: "center" }}>
                      Photos
                    </h4>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "repeat(2, 1fr)", // 👈 **2 Photos Per Row**
                      gap: "15px",
                      justifyContent: "center",
                    }}>
                      {item.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt="Gallery Image"
                          style={{ 
                            width: "100%", 
                            height: "250px",
                            objectFit: "cover", 
                            borderRadius: "10px" 
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* 🎥 Videos Section */}
                {item.videos && item.videos.length > 0 && (
                  <div style={{ marginTop: "25px" }}>
                    <h4 style={{ fontSize: "1.2rem", marginBottom: "10px", color: "#333", textAlign: "center" }}>
                      Videos
                    </h4>
                    <div>
                      {item.videos.map((video, index) => (
                        <video
                          key={index}
                          controls
                          style={{ width: "100%", borderRadius: "10px", height: "250px" }}
                        >
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
        ) : (
          <p style={{ fontSize: "1.2rem", color: "#666" }}>Loading gallery...</p>
        )}
      </div>
    </Layout>
  );
};

export default Gallery;
