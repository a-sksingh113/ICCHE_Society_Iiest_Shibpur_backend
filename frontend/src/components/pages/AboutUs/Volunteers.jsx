import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Volunteers from API
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/volunteers"); // Update API URL
        if (!response.ok) throw new Error("Failed to fetch volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  return (
    <Layout>
      <h2 className="text-center my-6 text-2xl font-bold">Our Volunteers</h2>

      {loading && <p className="text-center text-lg">Loading volunteers...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer._id}
              className="bg-white p-5 shadow-md rounded-lg flex flex-col items-center text-center"
            >
              <img
                src={volunteer.coverImageURL}
                alt={volunteer.fullName}
                className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
              />
              <h5 className="font-bold text-lg">{volunteer.fullName}</h5>
              <p className="text-gray-600 text-sm">Email: {volunteer.email}</p>
              <p className="text-gray-600 text-sm">Contact: {volunteer.contactNumber}</p>
              <p className="text-gray-600 text-sm">Enrollment No: {volunteer.enrollmentNo}</p>
              <p className="text-gray-600 text-sm">Gender: {volunteer.gender}</p>
              <p className="text-gray-600 text-sm">Year: {volunteer.year}</p>
              <p className="text-gray-600 text-sm">Department: {volunteer.department}</p>
              <p className="text-gray-600 text-sm">Residence: {volunteer.residenceType}</p>
              {volunteer.residenceType === "Hostel" && <p className="text-gray-600 text-sm">Hostel: {volunteer.hostelName}</p>}
              {volunteer.residenceType === "Hall" && <p className="text-gray-600 text-sm">Hall: {volunteer.hallName}</p>}
              {volunteer.residenceType === "Day Scholar" && <p className="text-gray-600 text-sm">Address: {volunteer.address}</p>}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Volunteers;
