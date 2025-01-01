import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logoWSL.svg";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../util/context";
import SearchBar from "./SearchBar";
import ServicesIcons from "./ServicesIcons";

export default function Header(props) {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser, logout, apiBaseUrl } = useContext(UserContext);

  const [prompt, setPrompt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  let isBusiness = false;
  if (loggedInUser) {
    isBusiness = loggedInUser.isBusiness ? true : false;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropDown = () => {
    //Should be implemented with clickAwayListener
    setDropdownOpen(false);
  };
  const toggleSearchMenu = (val) => {
    setPrompt(val);
    // setOpenList(false); //I believe this unnecessary
    navigate(`/business/search?category=${val}`);
  };

  useEffect(() => {
    if (location.pathname !== "/business/search") {
      setSelectedCategory(null); // Reset selected button
      setPrompt("");
    }
  }, [location.pathname]);
  return (
    <>
      <div className="h">
        <div className="header">
          {/* Logo Section */}
          <Link to="/" className="logo">
            <img src={logo} alt="WSL" />
          </Link>

          <div className="search-container">
            <SearchBar
              apiBaseUrl={apiBaseUrl}
              prompt={prompt}
              setPrompt={setPrompt}
            />
          </div>

          <div className="nav-links">
            {!loggedInUser && (
              <div className="authentication-links">
                <Link className="nav-item" to="/business/register">
                  Business
                </Link>
                <Link className="nav-item" to="/client/login">
                  Signup
                </Link>
              </div>
            )}

            {loggedInUser && (
              <div className="profile-icon" onClick={toggleDropdown}>
                <FontAwesomeIcon
                  icon={isBusiness ? faStore : faUserCircle}
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

          {dropdownOpen && (
            <ClickAwayListener
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
              onClickAway={closeDropDown}
            >
              <div className="dropdown-menu">
                {!isBusiness ? (
                  <>
                    <Link
                      to="/client/profile"
                      onClick={toggleDropdown}
                      className="dropdown-item"
                    >
                      Profile
                    </Link>
                    <Link onClick={toggleDropdown} className="dropdown-item">
                      My Reviews
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/business/profile"
                      onClick={toggleDropdown}
                      className="dropdown-item"
                    >
                      Edit Business Info
                    </Link>
                    <Link
                      to="/"
                      onClick={toggleDropdown}
                      className="dropdown-item"
                    >
                      Business Reviews
                    </Link>
                  </>
                )}
                {/* {" "} */}
                <Link
                  onClick={() => {
                    navigate("/client/login");
                    logout();
                    toggleDropdown();
                  }}
                  className="dropdown-item"
                >
                  Logout
                </Link>
              </div>
            </ClickAwayListener>
          )}
        </div>

        <div className={`services-icons ${props.withoutIcons && "hideIcons"}`}>
          <ServicesIcons
            toggleSearchMenu={toggleSearchMenu}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>
    </>
  );
}
