import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";

const Alumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch alumni data from API
  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/alumni"); // Update API URL
        if (!response.ok) throw new Error("Failed to fetch alumni data");
        const data = await response.json();
        setAlumni(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlumni();
  }, []);

  return (
    <Layout>
      <h2 className="text-center my-6 text-2xl font-bold">Our Alumni</h2>

      {loading && <p className="text-center text-lg">Loading alumni data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {alumni.map((alum) => (
            <div
              key={alum._id}
              className="bg-white p-5 shadow-md rounded-lg flex flex-col items-center text-center"
            >
              <img
                src={alum.coverImageURL || "/uploads/default.png"}
                alt={alum.fullName}
                className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
              />
              <h5 className="font-bold text-lg">{alum.fullName}</h5>
              <p className="text-gray-600 text-sm"><strong>Email:</strong> {alum.email}</p>
              <p className="text-gray-600 text-sm"><strong>Contact:</strong> {alum.contactNumber}</p>
              <p className="text-gray-600 text-sm"><strong>Enrollment No:</strong> {alum.enrollmentNo}</p>
              <p className="text-gray-600 text-sm"><strong>Gender:</strong> {alum.gender}</p>
              <p className="text-gray-600 text-sm"><strong>Department:</strong> {alum.department}</p>
              <p className="text-gray-600 text-sm"><strong>Graduation Year:</strong> {alum.graduationYear}</p>
              <p className="text-gray-600 text-sm"><strong>Company:</strong> {alum.company || "N/A"}</p>
              <p className="text-gray-600 text-sm"><strong>Address:</strong> {alum.address || "N/A"}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Alumni;
