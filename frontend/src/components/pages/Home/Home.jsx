import React from "react";
import Layout from "../../layout/Layout";
import Style from "../../cssFiles/home.module.css";

const Home = () => {
  return (
    <Layout>
      <div className={Style.fullScreenContainer}>
        <div className={Style.content}>
          <div className={Style.imageContainer}>
            <img 
              src="/bootstrap-themes.png" 
              className={Style.image} 
              alt="Bootstrap Themes" 
            />
          </div>
          <div className={Style.textContainer}>
            <h1 className={Style.heading}>Welcome to ICCHE</h1>
            <p className={Style.paragraph}>
              A non-profit society at IIEST Shibpur dedicated to empowering
              underprivileged students by providing not just knowledge but also
              fostering their overall development.
            </p>
            <div className={Style.buttonContainer}>
              <button className={Style.primaryButton}>Learn More</button>
              <button className={Style.secondaryButton}>Get Involved</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
