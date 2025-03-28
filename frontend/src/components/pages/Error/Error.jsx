import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold">ERROR 404!</h1>
      <h3 className="text-4xl md:text-5xl lg:text-6xl mt-2">Page not found!</h3>

      <Link to="/" className=" mt-3 text-black link transition-colors duration-300 no-underline border-2 border-gray-600  md:h-11 flex justify-center items-center md:text-xl rounded-2xl  min-w-36 md:w-44 hover:bg-gray-800 ">
        Go to Home
      </Link>
      </div>
  
  );
};

export default Error;
