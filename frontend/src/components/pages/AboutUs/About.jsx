import React from "react";
import Layout from "../../layout/Layout";
import img1 from "../../../assets/3907.jpg";
const About = () => {
  return (
    <Layout>
      <div>
        <div className="relative w-full">
          <img src={img1} className="opacity-40 w-full" alt="image" />
          <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center">
            <div className="w-[90%] max-w-4xl text-center">
              <p className="text-md sm:text-xl md:text-2xl lg:text-5xl font-extrabold leading-tight">
                ICCHE – A Student-Led Non-Profit Initiative from IIEST Shibpur
              </p>
              <p className="font-medium text-xs sm:text-sm md:text-base lg:text-xl mt-4">
                ICCHE is a non-profit organization founded by the students of
                IIEST Shibpur with a mission to educate and uplift
                underprivileged children. Run with dedication and passion, ICCHE
                provides free education and helps in the overall development of
                these children by nurturing their skills, confidence, and
                aspirations.
              </p>
            </div>
          </div>
        </div>

        <div className="ms-3 lg:ms-5">
  <div className="container col-xxl-8 px-4 py-5">
    <div className="row flex-lg-row-reverse align-items-center g-5">
      <div className="col-10 col-sm-8 col-lg-6">
        <img
          src={img1}
          className="d-block mx-lg-auto img-fluid"
          alt="image loading"
          width="700"
          height="500"
          loading="lazy"
        />
      </div>
      <div className="col-lg-6">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
          Responsive left-aligned hero with image
        </h1>
        <p className="text-xs md:text-lg lg:text-xl">
          Quickly design and customize responsive mobile-first sites with
          Bootstrap, the world's most popular front-end open source toolkit,
          featuring Sass variables and mixins, responsive grid system,
          extensive prebuilt components, and powerful JavaScript plugins.
        </p>
      </div>
    </div>
  </div>
</div>


        <div className="ms-3 lg:ms-5">
          <div className="container col-xxl-8 px-4  py-5">
            <div className="row flex-lg-row-reverse align-items-center g-5 ">
              <div className="col-lg-6">
                <h1 className="display-5  fw-bold text-body-emphasis lh-1 mb-3">
                  Responsive left-aligned hero with image
                </h1>
                <p className="text-xs md:text-lg lg:text-xl">
                  Quickly design and customize responsive mobile-first sites
                  with Bootstrap, the world's most popular front-end open source
                  toolkit, featuring Sass variables and mixins, responsive grid
                  system, extensive prebuilt components, and powerful JavaScript
                  plugins.
                </p>
              </div>
              <div className="col-10 col-sm-8 col-lg-6">
                <img
                  src={img1}
                  className="d-block mx-lg-auto img-fluid"
                  alt="image loading"
                  width="700"
                  height="500"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
