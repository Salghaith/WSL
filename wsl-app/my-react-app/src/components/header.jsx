import React, { useState, useContext, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faStore,
  faHome,
  faLaptop,
  faBolt,
  faCarCrash,
  faCarOn,
  faPlug,
  faHammer,
  faShirt,
  faSprayCanSparkles,
  faBroomBall,
  faFan,
  faTree,
  faTruck,
  faOilCan,
  faMobileScreen,
  faFaucetDrip,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logoWSL.svg";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../components/util/context";

export default function Header(props) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser, logout } = useContext(UserContext);
  const [test, setTest] = useState("");

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenList(false); // Close the dropdown
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  let isBusiness = false;
  if (loggedInUser) {
    isBusiness = loggedInUser.isBusiness ? true : false;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleSearchMenu = (val) => {
    setTest(val);
    console.log(test);
    setOpenList(false);
    navigate("/business/search");
  };
  const [openList, setOpenList] = useState(false);
  const openSearchList = () => {
    setOpenList(true);
  };
  const closeSearchList = () => {
    setOpenList(false);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    toggleSearchMenu(event.target.value);
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
                  onFocus={openSearchList}
                  value={test}
                  onChange={(e) => {
                    setTest(e.target.value);
                  }}
                />
                <button className="search-button">Search</button>
              </div>

              <div
                className={`search-list ${!openList && "hideList"}`}
                ref={dropdownRef}
              >
                <ul className="search-menu">
                  <li
                    onClick={() => {
                      toggleSearchMenu("Movers");
                    }}
                    className="dropdown-item"
                  >
                    Movers
                  </li>
                </ul>
              </div>
            </div>

            <div className="nav-links">
              {!loggedInUser && (
                <div className="authentication-links">
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
                )}{" "}
                {/* Added link */}
                <Link
                  onClick={() => {
                    navigate("/");
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

          <div
            className={`services-icons ${props.withoutSearch && "hideSearch"}`}
          >
            <label
              className={`service-icon ${
                selectedCategory === "Auto Repair" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Auto Repair"
                checked={selectedCategory === "Auto Repair"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faCarCrash} size="lg" />
              <p>Auto Repair</p>
            </label>

            <label
              className={`service-icon ${
                selectedCategory === "Electricians" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Electricians"
                checked={selectedCategory === "Electricians"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faPlug} size="lg" />
              <p>Electricians</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Contractors" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Contractors"
                checked={selectedCategory === "Contractors"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faHammer} size="lg" />
              <p>Contractors</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Dry Cleaning" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Dry Cleaning"
                checked={selectedCategory === "Dry Cleaning"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faShirt} size="lg" />
              <p>Dry Cleaning</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Home Cleaners" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Home Cleaners"
                checked={selectedCategory === "Home Cleaners"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faBroomBall} size="lg" />
              <p>Home Cleaners</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "HVAC" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="HVAC"
                checked={selectedCategory === "HVAC"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faFan} size="lg" />
              <p>HVAC</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Landscaping" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Landscaping"
                checked={selectedCategory === "Landscaping"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faTree} size="lg" />
              <p>Landscaping</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Movers" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Movers"
                checked={selectedCategory === "Movers"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faTruck} size="lg" />
              <p>Movers</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Oil Change" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Oil Change"
                checked={selectedCategory === "Oil Change"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faOilCan} size="lg" />
              <p>Oil Change</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Phone Repair" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Phone Repair"
                checked={selectedCategory === "Phone Repair"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faMobileScreen} size="lg" />
              <p>Phone Repair</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Plumbers" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Plumbers"
                checked={selectedCategory === "Plumbers"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faFaucetDrip} size="lg" />
              <p>Plumbers</p>
            </label>
            <label
              className={`service-icon ${
                selectedCategory === "Car Wash" ? "clicked" : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value="Car Wash"
                checked={selectedCategory === "Car Wash"}
                onChange={handleCategoryChange}
              />
              <FontAwesomeIcon icon={faCarOn} size="lg" />
              <p>Car Wash</p>
            </label>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
