import React, { useState } from "react";
import Layout from "../../layout/Layout";
import Style from "../../cssFiles/signup.module.css";
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <Layout>
      <div className={`${Style.container}`}>
        <div className={`${Style.content}`}>
          <h1 className="text-center">Signup</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label className={`form-label`}>Full Name <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="fullName" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
            </div>

            <div>
              <label className={`form-label`}>Email <span style={{ color: "red" }}>*</span></label>
              <input type="email" name="email" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
            </div>

            <div>
              <label className={`form-label`}>Password <span style={{ color: "red" }}>*</span></label>
              <input type="password" name="password" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
            </div>

            <div>
              <label className={`form-label`}>Contact Number <span style={{ color: "red" }}>*</span></label>
              <input type="text" name="contactNumber" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
            </div>

            <div>
              <label className={`form-label`}>Profile Image</label>
              <input type="file" name="profileImageURL" className={`form-control ${Style.inputs}`} onChange={handleChange} />
            </div>

            <div>
              <label className={`form-label`}>Gender <span style={{ color: "red" }}>*</span></label>
              <select name="gender" className={`form-control ${Style.inputs}`} required onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className={`form-label`}>Role <span style={{ color: "red" }}>*</span></label>
              <select name="role" className={`form-control ${Style.inputs}`} required onChange={handleChange}>
                <option value="">Select Role</option>
                <option value="PIC">PIC</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            {/* Unique ID for PIC */}
            {formData.role === "PIC" && (
              <div>
                <label className={`form-label`}>Unique ID <span style={{ color: "red" }}>*</span></label>
                <input type="text" name="uniqueId" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
              </div>
            )}

            {/* Fields for Volunteers */}
            {formData.role === "Volunteer" && (
              <>
                <div>
                  <label className={`form-label`}>Year <span style={{ color: "red" }}>*</span></label>
                  <input type="number" name="year" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
                </div>

                <div>
                  <label className={`form-label`}>Department <span style={{ color: "red" }}>*</span></label>
                  <input type="text" name="department" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
                </div>

                <div>
                  <label className={`form-label`}>Residence Type <span style={{ color: "red" }}>*</span></label>
                  <select name="residenceType" className={`form-control ${Style.inputs}`} required onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Hall">Hall</option>
                    <option value="Day Scholar">Day Scholar</option>
                  </select>
                </div>

                {/* Conditional fields for Residence Type */}
                {formData.residenceType === "Hostel" && (
                  <div>
                    <label className={`form-label`}>Hostel Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="hostelName" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
                  </div>
                )}

                {formData.residenceType === "Hall" && (
                  <div>
                    <label className={`form-label`}>Hall Name <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="hallName" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
                  </div>
                )}

                {formData.residenceType === "Day Scholar" && (
                  <div>
                    <label className={`form-label`}>Address <span style={{ color: "red" }}>*</span></label>
                    <input type="text" name="address" className={`form-control ${Style.inputs}`} required onChange={handleChange} />
                  </div>
                )}
              </>
            )}

            <button type="submit" className={`btn mt-3 mb-3 ${Style.button} ${Style.inputs}`}>Signup</button>
            <p>
              Already registered?
              <Link to="/login" className={`ms-2 ${Style.login}`}>Login</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
