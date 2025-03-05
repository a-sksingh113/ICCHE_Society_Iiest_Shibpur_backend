import React from "react";
import Layout from "../../layout/Layout";
import Style from "../../cssFiles/home.module.css";

const Home = () => {
  return (
    <Layout>
      <div className={`${Style.container1}`}>
        <h1> Welcom to ICCHE </h1>
        <p>
          A non-profit society at IIEST Shibpur dedicated to empowering
          underprivileged students by providing not just knowledge but also
          fostering their overall development.
        </p>
      </div>
      <div className={`${Style.container2}`}>
        <div>

        </div>
        <div>

        </div>
      </div>
    </Layout>
  );
};

export default Home;
