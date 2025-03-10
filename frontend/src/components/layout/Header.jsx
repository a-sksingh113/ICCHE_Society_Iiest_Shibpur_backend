import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userImage from "./../assets/user.png";
import Logo from "./../assets/logo.png";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown1, setShowDropdown1] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
  }, []);

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <Link
            to="/"
            className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
          >
            <img src={Logo} alt="logo" width="100" height="70" />
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 link-secondary">
                Home page
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="nav-link px-2 link-body-emphasis">
                Gallery
              </Link>
            </li>

            {/* Dropdown for Events */}
            <li
              className="nav-item"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
              style={{ position: "relative" }}
            >
              <span
                className="nav-link px-2 link-body-emphasis"
                style={{ cursor: "pointer" }}
              >
                Events
              </span>

              {showDropdown && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    listStyle: "none",
                    padding: "10px",
                    margin: 0,
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    top: "100%",
                    left: 0,
                    minWidth: "150px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                  }}
                >
                  <li>
                    <Link to="/activities" className="dropdown-item">
                      Activities
                    </Link>
                  </li>
                  <li>
                    <Link to="/farewell" className="dropdown-item">
                      Farewell
                    </Link>
                  </li>
                  <li>
                    <Link to="/festival" className="dropdown-item">
                      Festival
                    </Link>
                  </li>
                  <li>
                    <Link to="/induction" className="dropdown-item">
                      Induction
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link to="/donation" className="nav-link px-2 link-body-emphasis">
                Donation Drive
              </Link>
            </li>
            <li
              className="nav-item"
              onMouseEnter={() => setShowDropdown1(true)}
              onMouseLeave={() => setShowDropdown1(false)}
              style={{ position: "relative" }}
            >
              <span
                className="nav-link px-2 link-body-emphasis"
                style={{ cursor: "pointer" }}
              >
                About us
              </span>

              {showDropdown1 && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "white",
                    listStyle: "none",
                    padding: "10px",
                    margin: 0,
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    top: "100%",
                    left: 0,
                    minWidth: "150px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    zIndex: 1000,
                  }}
                >
                  <li>
                    <Link to="/volunteers" className="dropdown-item">
                      Volunteers
                    </Link>
                  </li>
                  <li>
                    <Link to="/students" className="dropdown-item">
                      Students
                    </Link>
                  </li>
                  <li>
                    <Link to="/alumni" className="dropdown-item">
                      Alumni
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="dropdown-item">
                      About Icche
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>

          <div className="dropdown text-end">
            <Link
              to="/AdminProfile"
              className="d-block link-body-emphasis text-decoration-none"
              aria-expanded="false"
            >
              <img
                src={userImage}
                alt="user"
                width="32"
                height="32"
                className="rounded-circle"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
