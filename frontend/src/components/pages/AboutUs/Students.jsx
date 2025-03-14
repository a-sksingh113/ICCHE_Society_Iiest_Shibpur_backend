import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/students"); // Update with actual API
        if (!response.ok) throw new Error("Failed to fetch students");
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Layout>
      <h2 className="text-center my-6 text-2xl font-bold">Our Students</h2>

      {loading && <p className="text-center text-lg">Loading students...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <div
              key={student.uniqueId}
              className="bg-white p-5 shadow-md rounded-lg flex flex-col items-center text-center"
            >
              <img
                src={student.coverImageURL || "/uploads/default.png"}
                alt={student.fullName}
                className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
              />
              <h5 className="font-bold text-lg">{student.fullName}</h5>
              <p className="text-gray-600 text-sm">ID: {student.uniqueId}</p>
              <p className="text-gray-600 text-sm">Gender: {student.gender}</p>
              <p className="text-gray-600 text-sm">Class: {student.studentClass}</p>
              <p className="text-gray-600 text-sm">Address: {student.address}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Students;
