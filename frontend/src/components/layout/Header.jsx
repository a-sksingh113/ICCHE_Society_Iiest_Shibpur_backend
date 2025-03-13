import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./../assets/logo.png";
import user from "../assets/user.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link to="/" className="size-28 ms-10">
          <img src={Logo} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="no-underline text-black ms-12 text-[18px]">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/gallery"
                className="no-underline text-black ms-12 text-[18px]"
              >
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/events"
                className="no-underline text-black ms-12 text-[18px]"
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/donation"
                className="no-underline text-black ms-12 text-[18px]"
              >
                Donation Drive
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="no-underline text-black ms-12 text-[18px]"
              >
                About Us
              </Link>
            </li>
          </ul>

          {/* User Icon */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="border-0 bg-transparent"
            >
              <img
                src={user}
                className="size-10 ms-12 cursor-pointer"
                alt="User"
              />
            </button>

            {/* Dropdown Menu - Adjusted for Mobile */}
            {dropdownOpen && (
              <div className="absolute sm:right-0 sm:left-auto left-1/2 -translate-x-1/2 sm:translate-x-0 mt-2 w-60 bg-white shadow-md rounded-lg border z-10">
                <ul className="py-2">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link
                          to="/admin/adminProfile"
                          className="block px-4 py-2 no-underline hover:bg-gray-200 text-black"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 hover:bg-gray-200 no-underline text-black"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => console.log("Logout clicked")} // Replace with your logout function
                          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        to="/admin/login"
                        className="block px-4 py-2 no-underline hover:bg-gray-200 text-black"
                      >
                        Log In
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
