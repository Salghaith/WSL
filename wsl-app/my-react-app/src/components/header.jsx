import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logoWSL.svg";
import "./header.css";
import { Link } from "react-router-dom";
import { UserContext } from "../components/util/context";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser, logout } = useContext(UserContext);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <React.Fragment>
        <div className="h">
          <div className="header">
            {/* Logo Section */}
            <Link to="/" className="logo">
              <img src={logo} alt="WSL" />
            </Link>

            {/* Search Section */}
            <div className="search-container">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="plumbers, movers, HVAC"
                  className="search-bar"
                />

                <button className="search-button">Search</button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="nav-links">
              {!loggedInUser && (
                <div>
                  <Link className="nav-item" to="/business/register">
                    Register Business
                  </Link>
                  <Link className="nav-item" to="/client/login">
                    Login
                  </Link>
                </div>
              )}

              {loggedInUser && (
                <div className="profile-icon" onClick={toggleDropdown}>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    size="2x"
                    style={{ color: "black", cursor: "pointer" }}
                  />
                  <FontAwesomeIcon
                    icon={faBars}
                    size="2x"
                    style={{
                      color: "black",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link
                  to="/client/profile"
                  onClick={toggleDropdown}
                  className="dropdown-item"
                >
                  Profile
                </Link>
                <Link onClick={toggleDropdown} className="dropdown-item">
                  User Reviews
                </Link>
                <Link
                  to="/business/profile"
                  onClick={toggleDropdown}
                  className="dropdown-item"
                >
                  Edit Business Info
                </Link>{" "}
                {/* Added link */}
                <Link
                  onClick={() => {
                    logout();
                    toggleDropdown();
                  }}
                  className="dropdown-item"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          <hr className="header-divider" />
        </div>
      </React.Fragment>
    </>
  );
}
