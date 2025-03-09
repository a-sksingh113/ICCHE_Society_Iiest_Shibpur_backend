import React from "react";
import Layout from "../../layout/Layout";
import img from "../../assets/img.jpg";
import "./Home.css"

const Home = () => {
  return (
    <Layout>
      <div className="section">
        <div className="first">
          <h1> Welcome to ICCHE </h1>
          <p>
            A non-profit society at IIEST Shibpur dedicated to empowering
            underprivileged students by providing not just knowledge but also
            fostering their overall development.
          </p>
        </div>
        <div className="second">
          <img src={img} className="bg" alt="img" />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
