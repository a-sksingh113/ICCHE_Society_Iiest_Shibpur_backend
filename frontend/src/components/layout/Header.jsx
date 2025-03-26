import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { Sun, Moon, BellRing } from "lucide-react";
import user from "../../assets/user.png";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [notifications, setNotifications] = useState(2);
  const timeoutRef = useRef(null);

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

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

  const openDropdown = (setDropdown) => {
    clearTimeout(timeoutRef.current);
    setDropdown(true);
  };

  const closeDropdown = (setDropdown) => {
    timeoutRef.current = setTimeout(() => {
      setDropdown(false);
    }, 200);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setUserDropdownOpen(false);
      }
      if (!event.target.closest(".about-dropdown-container")) {
        setAboutDropdownOpen(false);
      }
      if (!event.target.closest(".events-dropdown-container")) {
        setEventsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary text-[14px] sm:text-[16px] ">

      {/* logo */}
      <div className="container-fluid  border-bottom shadow-md">
        <Link to="/" className="size-20 ms-8">
          <img src={Logo} alt="Logo" />
        </Link>


        {/* menu */}
        <button
          className="navbar-toggler duration-300"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`navbar-collapse ${
            isOpen ? "d-block" : "d-none"
          } d-lg-flex justify-content-between`}
          id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/"
                className="no-underline text-black ms-12  sm:text-[18px]   transition-colors duration-200   home-link"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/gallery"
                className="no-underline text-black ms-12 text-[14px] sm:text-[16px] home-link"
              >
                Gallery
              </Link>
            </li>

            {/* Events Dropdown */}
            <li className="nav-item relative events-dropdown-container">
              
              <Link className="no-underline text-black ms-12 text-[14px] sm:text-[16px] flex home-link" onClick={() => setEventsDropdownOpen((prev) => !prev)}>
                Events{" "}
                <IoIosArrowDown
                  className="mt-1.5 sm:ms-2 ml-auto "
                  
                />
              </Link>
              {eventsDropdownOpen && (
                <div
                  className="absolute  left-1/4 mt-2 w-32 sm:w-40 bg-white shadow-md rounded-lg border z-10"
                  onClick={() => setEventsDropdownOpen((prev) => !prev)}
                >
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/events/festivals"
                        className="inline-block px-0 py-2 no-underline text-black home-link"
                      >
                        Festival
                      </Link>
                      
                    </li>
                   
                    <li>
                      <Link
                        to="/events/activities"
                        className="block px-0  py-2 no-underline text-black home-link"
                      >
                        Activities
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/events/farewell"
                        className="block px-0  py-2 no-underline  text-black home-link"
                      >
                        Farewell
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/events/induction"
                        className="block px-0  py-2 no-underline  text-black home-link"
                      >
                        Induction
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li className="nav-item">
              <Link
                to="/cloth-donations"
                className="no-underline text-black ms-12 text-[14px] sm:text-[16px] home-link"
              >
                Donation Drive
              </Link>
            </li>

            {/* About Us Dropdown */}
            <li className="nav-item relative about-dropdown-container">
              <Link className="no-underline flex text-black ms-12 text-[14px] sm:text-[16px] home-link"   onClick={() => setAboutDropdownOpen((prev) => !prev)}>
                About Us{" "}
                <IoIosArrowDown
                  className="mt-1.5  ml-auto sm:ms-2"
                
                />
              </Link>
              {aboutDropdownOpen && (
                <div className="absolute left-1/4 mt-2 w-32 sm:w-40 bg-white shadow-md rounded-lg border z-10 ">
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/about"
                        className="block  px-0  py-2 no-underline text-black home-link"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about/students"
                        className="block px-0  py-2 no-underline text-black home-link"
                      >
                        Students
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about/alumni"
                        className="block px-0 py-2 no-underline text-black home-link"
                      >
                        Alumni
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/about/volunteers"
                        className="block px-0  py-2 no-underline  text-black home-link"
                      >
                        Volunteers
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>

          <div className="ms-12 ">
            <Link to="/home/notification" className="relative m-4  ">
              <BellRing className="size-6 sm:size-8 cursor-pointer text-gray-700" />
              {notifications > 0 && (
                <span className="absolute top-2 lg:top-2.5 -right-3   bg-red-500 text-white text-[10px] sm:text=[14px] px-2 py-0.5 rounded-full">
                  {notifications}
                </span>
              )}
            </Link>
          </div>

          {/* User Icon Dropdown */}
          <div className="relative dropdown-container ">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="border-0 bg-transparent"
            >
              <img
                src={user}
                className="size-7 sm:size-10 ms-12 cursor-pointer"
                alt="User"
              />
            </button>

            {userDropdownOpen && (
              <div className="absolute  sm:right-0 sm:left-auto left-1/4 -translate-x-1/2 sm:translate-x-0 mt-0 sm:w-44 w-32 bg-white shadow-md rounded-lg border z-10">
                <ul className="py-2">
                  {isLoggedIn ? (
                    <>
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="block px-0  py-2 no-underline text-black home-link"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/admin/profile"
                          className="block px-0  py-2 no-underline text-black home-link"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-0  py-2 text-red-600 home-link "
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <Link
                        to="/admin/login"
                        className="block px-0 py-2 no-underline text-black home-link"
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
