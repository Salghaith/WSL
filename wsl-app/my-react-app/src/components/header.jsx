import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faBars,
  faStore,
  faCarCrash,
  faCarOn,
  faPlug,
  faHammer,
  faShirt,
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
import axios from "axios";

export default function Header(props) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { loggedInUser, logout } = useContext(UserContext);
  const [test, setTest] = useState("");

  const [suggestions, setSuggestions] = useState([]); // store the search results
  const [loading, setLoading] = useState(false); // loading state for suggestions

  let isBusiness = false;
  if (loggedInUser) {
    isBusiness = loggedInUser.isBusiness ? true : false;
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropDown = () => {
    setDropdownOpen(false);
  };
  const toggleSearchMenu = (val) => {
    setTest(val);
    setOpenList(false);
    navigate(`/business/search?category=${val}`);
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
    const selected = event.target.value;
    setSelectedCategory(selected);
    toggleSearchMenu(selected);
    //navigate(`/business/search?category=${selected}`);
  };
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // Clear suggestions
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `https://wsl-app-backend.onrender.com/api/business/search?name=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching business suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setTest(query);
    fetchSuggestions(query);
  };

  const handleSuggestionClick = (business) => {
    setTest(business.businessName);
    setOpenList(false);
    navigate(`/`); // Navigate to the business details page
  };
  useEffect(() => {
    if (location.pathname !== "/business/search") {
      setSelectedCategory(null); // Reset selected button
      setTest("");
    }
  }, [location.pathname]);
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
                  onChange={handleInputChange}
                />
                <button className="search-button">Search</button>
              </div>
              <ClickAwayListener
                mouseEvent="onMouseDown"
                touchEvent="onTouchStart"
                onClickAway={closeSearchList}
              >
                <div className={`search-list ${!openList && "hideList"}`}>
                  {openList && suggestions.length > 0 && (
                    <ul className="search-menu">
                      {loading ? (
                        <li>Loading...</li>
                      ) : (
                        suggestions.map((business, index) => (
                          <li
                            key={index}
                            onClick={() => handleSuggestionClick(business)}
                            className="dropdown-item"
                          >
                            {business.businessName}
                          </li>
                        ))
                      )}
                    </ul>
                  )}
                </div>
              </ClickAwayListener>
            </div>

            <div className="nav-links">
              {!loggedInUser && (
                <div className="authentication-links">
                  <Link className="nav-item" to="/business/register">
                    Register Business
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
