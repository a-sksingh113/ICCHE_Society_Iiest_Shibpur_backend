import React from "react";
import { BsFacebook } from "react-icons/bs";
import { FaSquareInstagram, FaTwitter, FaLinkedin } from "react-icons/fa6";
const FooterDemo = () => {
  return (
    <footer className="bg-gray-100 border-top p-8 ">
      {/* Contact Us Section */}
      <div className="text-center mb-6  sm:mt-10">
        <h1 className="text-2xl font-extrabold">CONTACT US</h1>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis,
          quia!
        </p>
      </div>

      {/* Three Sections Row */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
        {/* Our Office */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center justify-center  p-4">
          <h2 className="text-lg font-extrabold mb-2">Our Office</h2>
          <p className="text-gray-700">+91 465858588</p>
          <p className="text-gray-700">Slater Hall</p>
          <p className="text-gray-700">IIEST, Shibpur, Howrah, West Bengal</p>
        </div>

        {/* Follow Us */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col items-center justify-center p-4">
          <h2 className="text-lg font-semibold mt-40">Follow Us</h2>

          <ul className="flex sm:gap-10 gap-4 mt-3 me-8">
            <li>
              <a href="#">
                <BsFacebook className="size-7 text-blue-900" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaSquareInstagram className="size-7 text-pink-800" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaTwitter className="size-7 text-blue-700" />
              </a>
            </li>
            <li>
              <a href="#">
                <FaLinkedin className="size-7 text-blue-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Feedback Form */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-center mb-4">
            Feedback Form
          </h2>
          <form className="space-y-3 ">
            <input
              type="text"
              name="fullName"
              placeholder="Your Name"
              className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition mt-3"
              required
            />
            <input
              type="text"
              name="contact"
              placeholder="Your Contact Number"
              className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition mt-3"
              required
            />
            <textarea
              name="message"
              rows="3"
              placeholder="Your Message"
              className="w-full p-2 rounded-md bg-gray-200 text-gray-700 outline-none focus:bg-gray-300 transition mt-3"
              required
            ></textarea>
            <div className="mt-3">
              <button
                type="submit"
                className="w-full bg-gray-700 text-white font-extrabold py-2  hover:bg-gray-900 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default FooterDemo;
