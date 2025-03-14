import React, { useState } from "react";
import Layout from "../../layout/Layout";

import { Link } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
      ...(name === 'profileImageURL' && files.length > 0 ? { residenceType: '' } : {})
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="lg:w-1/3 sm:w-[400px] border border-slate-500 rounded-xl p-6 shadow-lg ">
          <h1 className="text-center">Admin Signup</h1>
          <form onSubmit={handleSubmit}>
            {/* Basic Information Fields */}
            <div>
              <label className="form-label">Full Name <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="fullName" className="form-control" required onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Email <span style={{ color: "red" }}>*</span></label>
              <input type="email" name="email" className="form-control" required onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Password <span style={{ color: "red" }}>*</span></label>
              <input type="password" name="password" className="form-control" required onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Contact Number <span style={{ color: "red" }}>*</span></label>
              <input type="tel" name="contactNumber" className="form-control" required onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Gender <span style={{ color: "red" }}>*</span></label>
              <select name="gender" className="form-control" required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">Role <span style={{ color: "red" }} >*</span></label>
              <select name="role" className="form-control" required onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="PIC">PIC</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>
            <div>
              <label className="form-label">Unique ID <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="uniqueId" className="form-control" required onChange={handleChange} />
            </div>
            <div>
              <label className="form-label">Profile Image</label>
              <input type="file" name="profileImageURL" className="form-control" onChange={handleChange} />
            </div>

            {/* Conditional Fields for Volunteer */}
            {formData.role === "Volunteer" && (
              <>
                <div>
                  <label className="form-label">Year <span style={{ color: "red" }}>*</span></label>
                  <input type="number" name="year" className="form-control" required onChange={handleChange} />
                </div>
                <div>
                  <label className="form-label">Department <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="department" className="form-control" required onChange={handleChange} />
                </div>
                {!formData.profileImageURL && (
                  <div>
                    <label className="form-label">Residence Type <span style={{ color: "red" }}>*</span></label>
                    <select name="residenceType" className="form-control" required onChange={handleChange}>
                      <option value="">Select Residence Type</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Hall">Hall</option>
                      <option value="Day Scholar">Day Scholar</option>
                    </select>
                  </div>
                )}
                {formData.residenceType === "Hostel" && (
                  <div>
                    <label className="form-label">Hostel Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="hostelName" className="form-control" required onChange={handleChange} />
                  </div>
                )}
                {formData.residenceType === "Hall" && (
                  <div>
                    <label className="form-label">Hall Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="hallName" className="form-control" required onChange={handleChange} />
                  </div>
                )}
                {formData.residenceType === "Day Scholar" && (
                  <div>
                    <label className="form-label">Address <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="address" className="form-control" required onChange={handleChange} />
                  </div>
                )}
              </>
            )}

            <button type="submit" className="btn btn-outline-primary w-full mt-4">Signup</button>
            <p className="text-center mt-3">
              Already registered?
              <Link to="/admin/login" className="no-underline ms-2">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
