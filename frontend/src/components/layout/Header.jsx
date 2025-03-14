import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../assets/logo.png";
import user from "../assets/user.png";

const Header = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/admin/login");
  };

  // Delayed dropdown close to allow smooth hovering
  let timeout;

  const openAboutDropdown = () => {
    clearTimeout(timeout);
    setAboutDropdownOpen(true);
  };

  const closeAboutDropdown = () => {
    timeout = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 200); // Small delay to allow transition
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setUserDropdownOpen(false);
      }
      if (!event.target.closest(".about-dropdown-container")) {
        setAboutDropdownOpen(false);
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
              <Link to="/gallery" className="no-underline text-black ms-12 text-[18px]">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="no-underline text-black ms-12 text-[18px]">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/donation" className="no-underline text-black ms-12 text-[18px]">
                Donation Drive
              </Link>
            </li>

            {/* About Us Dropdown */}
            <li
              className="nav-item relative about-dropdown-container"
              onMouseEnter={openAboutDropdown}
              onMouseLeave={closeAboutDropdown}
            >
              <Link to="/about" className="no-underline text-black ms-12 text-[18px]">
                About Us
              </Link>
              {aboutDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-lg border z-10"
                  onMouseEnter={openAboutDropdown} // Keep open when hovering over submenu
                  onMouseLeave={closeAboutDropdown} // Close when leaving submenu
                >
                  <ul className="py-2">
                    <li>
                      <Link to="/about" className="block px-4 py-2 no-underline hover:bg-gray-200 text-black">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/students" className="block px-4 py-2 no-underline hover:bg-gray-200 text-black">
                        Students
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/alumni" className="block px-4 py-2 no-underline hover:bg-gray-200 text-black">
                        Alumni
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/volunteers" className="block px-4 py-2 no-underline hover:bg-gray-200 text-black">
                        Volunteers
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>

          {/* User Icon Dropdown */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="border-0 bg-transparent"
            >
              <img src={user} className="size-10 ms-12 cursor-pointer" alt="User" />
            </button>

            {userDropdownOpen && (
              <div className="absolute sm:right-0 sm:left-auto left-1/2 -translate-x-1/2 sm:translate-x-0 mt-2 w-60 bg-white shadow-md rounded-lg border z-10">
                <ul className="py-2">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link to="/admin/dashboard" className="block px-4 py-2 no-underline hover:bg-gray-200 text-black">
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link to="/admin/profile" className="block px-4 py-2 hover:bg-gray-200 no-underline text-black">
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link to="/admin/login" className="block px-4 py-2 no-underline hover:bg-gray-200 text-black">
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
