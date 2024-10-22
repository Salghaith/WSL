import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      if (user) {
        setLoggedInUser(user);
      }
    } catch (error) {
      console.error("Error retrieving user from localStorage:", error);
    }
  }, []);

  const login = (data) => {
    localStorage.setItem("currentUser", JSON.stringify(data));
    setLoggedInUser(data); // Update global state
  };

  const logout = async () => {
    try {
      await axios.post(
        `${apiBaseUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("currentUser");
      setLoggedInUser(null); // Update global state
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Error logging out. Please try again.");
    }
  };
  return (
    <UserContext.Provider value={{ loggedInUser, login, logout, apiBaseUrl }}>
      {children}
    </UserContext.Provider>
  );
};
