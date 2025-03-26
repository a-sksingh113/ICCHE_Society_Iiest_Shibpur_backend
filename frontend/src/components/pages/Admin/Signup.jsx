import React, { useState, useRef } from "react";
import Layout from "../../layout/Layout";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNumber: "",
    profileImageURL: "",
    gender: "",
    role: "",
    uniqueId: "",
    year: "",
    department: "",
    residenceType: "",
    hostelName: "",
    hallName: "",
    address: "",
  });

  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  // Ref for file input
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/admin/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form fields
      setFormData({
        fullName: "",
        email: "",
        password: "",
        contactNumber: "",
        profileImageURL: "",
        gender: "",
        role: "",
        uniqueId: "",
        year: "",
        department: "",
        residenceType: "",
        hostelName: "",
        hallName: "",
        address: "",
      });

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setRedirect(true);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen overflow-auto px-3 text-xs sm:text-base">
        <div className="lg:w-1/3 sm:w-[400px] border border-slate-500 rounded-xl p-6 shadow-lg mt-7 mb-7 ">
          <h1 className="text-center">Admin Signup</h1>
          <form onSubmit={handleSubmit}>
            {/* Basic Information Fields */}
            <div>
              <label className="form-label">
                Full Name <span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="fullName" className="form-control " required value={formData.fullName} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input type="password" name="password" className="form-control" required value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">
                Contact Number <span style={{ color: "red" }}>*</span>
              </label>
              <input type="tel" name="contactNumber" className="form-control" required value={formData.contactNumber} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">
                Gender <span style={{ color: "red" }}>*</span>
              </label>
              <select name="gender" className="form-control" required value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">
                Role <span style={{ color: "red" }}>*</span>
              </label>
              <select name="role" className="form-control" required value={formData.role} onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="PIC">PIC</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div>
              <label className="form-label">
                Unique ID <span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" name="uniqueId" className="form-control" required value={formData.uniqueId} onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Profile Image</label>
              <input type="file" name="profileImageURL" className="form-control" ref={fileInputRef} onChange={handleChange} />
            </div>

            {/* Conditional Fields for Volunteer */}
            {formData.role === "Volunteer" && (
              <>
                <div>
                  <label className="form-label">
                    Year <span style={{ color: "red" }}>*</span>
                  </label>
                  <input type="number" name="year" className="form-control" required value={formData.year} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">
                    Department <span style={{ color: "red" }}>*</span>
                  </label>
                  <input type="text" name="department" className="form-control" required value={formData.department} onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">
                    Residence Type <span style={{ color: "red" }}>*</span>
                  </label>
                  <select name="residenceType" className="form-control" required value={formData.residenceType} onChange={handleChange}>
                    <option value="">Select Residence Type</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Hall">Hall</option>
                    <option value="Day Scholar">Day Scholar</option>
                  </select>
                </div>
                {formData.residenceType === "Hostel" && (
                  <div>
                    <label className="form-label">
                      Hostel Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" name="hostelName" className="form-control" required value={formData.hostelName} onChange={handleChange} />
                  </div>
                )}
                {formData.residenceType === "Hall" && (
                  <div>
                    <label className="form-label">
                      Hall Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" name="hallName" className="form-control" required value={formData.hallName} onChange={handleChange} />
                  </div>
                )}
                {formData.residenceType === "Day Scholar" && (
                  <div>
                    <label className="form-label">
                      Address <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" name="address" className="form-control" required value={formData.address} onChange={handleChange} />
                  </div>
                )}
              </>
            )}

            <button type="submit" className=" border-2 border-gray-600 py-2 link w-full mt-4 rounded" disabled={loading}>
              {loading ? "Signing Up..." : "Signup"}
            </button>

            <p className="text-center mt-3">
              Already registered? <Link to="/admin/login" className='no-underline ms-2 home-link '>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
