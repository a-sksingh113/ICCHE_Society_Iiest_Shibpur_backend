import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import { FaMapMarkerAlt } from "react-icons/fa";
import Hero from "./Hero1";
import Hero2 from "./Hero2";
import Hero3 from "./Hero3";

const Home = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/homePageImage")
      .then((response) => {
        console.log("Fetched Images:", response.data);
        setImages(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [images.length]);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-white text-center p-6 overflow-hidden">
        {/* Skeleton Loader while loading */}
        {loading ? (
          <div className="absolute inset-0 w-full h-full bg-gray-300 animate-pulse"></div>
        ) : images.length > 0 ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: `url(${images[currentIndex]?.coverImageURL})`,
              filter: "brightness(50%)",
            }}
          ></div>
        ) : null}

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-500 drop-shadow-lg">
            Welcome to ICCHE
          </h1>

          {/* Location Section */}
          <div className="flex items-center justify-center space-x-2 text-gray-300 text-lg md:text-xl">
            <FaMapMarkerAlt className="text-red-400" />
            <p>Slatter Hall, IIEST, Shibpur, Howrah, West Bengal</p>
          </div>

          {!loading && (
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mt-4">
              A non-profit society at IIEST Shibpur dedicated to empowering underprivileged students.
            </p>
          )}
        </div>
      </div>
<hr/>
    
      <Hero/><hr/>
      <Hero2/><hr/>
      <Hero3/>
    </Layout>
  );
};

export default Home;
