import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const AdminProfile = () => {
  return (
    <Layout>
      <div>
        <h2>Admin Profile</h2>
        <p>
          <strong>Name:</strong> Satish singh
        </p>
        <p>
          <strong>Email:</strong> i.sksingh113@gmail.com
        </p>
        <p>
          <strong>Role:</strong>Volunteer
        </p>
        <p>
          <strong>Contact:</strong> 8112590073
        </p>
        <p>
          <strong>Residence Type:</strong> Hostel
        </p>
        <p>
          <strong>Hostel 14:</strong>{" "}
        </p>
        <p>
          <strong>Hall:</strong>{" "}
        </p>
        <p>
          <strong>Address:</strong>
        </p>
      <div >
                <Link to="" >
                </Link> 
              </div>
      </div>
    </Layout>
  );
};
export default AdminProfile;
