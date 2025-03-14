import React from "react";
import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Layout>
        <div className="text-center">
      <h1 className="">ERROR 404!</h1>
      <h3>Page not found!</h3>

      <Link to="/" className="btn btn-outline-primary">
        Go to Home
      </Link>
      </div>
    </Layout>
  );
};

export default Error;
