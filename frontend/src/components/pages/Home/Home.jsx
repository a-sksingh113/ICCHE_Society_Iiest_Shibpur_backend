import React from "react";
import Layout from "../../layout/Layout";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center p-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-400 drop-shadow-lg">
          Welcome to ICCHE
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8">
          A non-profit society at IIEST Shibpur dedicated to empowering 
          underprivileged students by providing not just knowledge but also 
          fostering their overall development.
        </p>

        {/* Two Boxes Just Below the Welcome Message */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl">
          {/* Card 1 */}
          <div className="p-6 w-80 md:w-96 rounded-2xl shadow-xl bg-gray-700 border border-gray-600 hover:shadow-2xl transition text-center">
            <h2 className="text-2xl font-semibold text-blue-300">Our Mission</h2>
            <p className="text-gray-300 mt-2">
              Providing education, mentorship, and support to shape a brighter future.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 w-80 md:w-96 rounded-2xl shadow-xl bg-gray-700 border border-gray-600 hover:shadow-2xl transition text-center">
            <h2 className="text-2xl font-semibold text-blue-300">Get Involved</h2>
            <p className="text-gray-300 mt-2">
              Join our community and contribute to making a meaningful impact.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
