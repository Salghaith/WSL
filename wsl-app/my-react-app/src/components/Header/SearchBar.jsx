import React, { useState, useContext, useEffect } from "react";
import "./SearchBar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

const SearchBar = ({ apiBaseUrl, setPrompt, prompt }) => {
  const navigate = useNavigate();
  const [openList, setOpenList] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]); // Clear suggestions
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiBaseUrl}/business/search?name=${query}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching business suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  const openSearchList = () => {
    setOpenList(true);
  };
  const closeSearchList = () => {
    setOpenList(false);
  };
  const handleInputChange = (e) => {
    const query = e.target.value;
    setPrompt(query);
    fetchSuggestions(query);
    setOpenList(true);
  };
  const handleSuggestionClick = (business) => {
    setPrompt(business.businessName);
    setOpenList(false);
    navigate(`/business/${business.businessName}/info`, {
      state: { businessData: business },
    }); // Navigate to the business details page
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          placeholder="plumbers, movers, HVAC"
          className="search-field"
          onFocus={openSearchList}
          value={prompt}
          onChange={handleInputChange}
        />
        <button className="search-button" disabled>
          Search
        </button>
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
                <li className="dropdown-item">Loading...</li>
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
  );
};
export default SearchBar;
