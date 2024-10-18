import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessRegister from "./pages/BusinessRegister";
import Auth from "./pages/Auth";
import Footer from "./components/footer";
import Nav from "./components/nav";
import axios from "axios";
import { UserProvider } from "./components/util/context";
import SearchForBusinesses from "./pages/SearchForBusinesses";
import Header from "./components/header";
import UserProfile from "./pages/UserProfile";
import EditBusinessInfo from "./pages/EditBusinessInfo";

const App = () => {
  const [formValidity, setFormValidity] = useState({});
  const handleValidity = (inputId, isValid) => {
    setFormValidity((prevValidity) => ({
      ...prevValidity,
      [inputId]: isValid,
    }));
  };

  return (
    <UserProvider>
      <div className="WSL-app">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <React.Fragment>
                  <Header />
                  <HomePage />
                  <Footer />
                </React.Fragment>
              }
            />
            <Route
              path="/client/login"
              element={
                <Auth
                  onValidityChange={handleValidity}
                  formValidity={formValidity}
                />
              }
            />
            <Route
              path="/client/profile"
              element={
                <React.Fragment>
                  <Header />
                  <UserProfile />
                  <Footer />
                </React.Fragment>
              }
            />
            <Route
              path="/business/register"
              element={
                <React.Fragment>
                  <Header />
                  <BusinessRegister
                    onValidityChange={handleValidity}
                    formValidity={formValidity}
                  />
                  <Footer />
                </React.Fragment>
              }
            />
            <Route
              path="/business/profile"
              element={
                <React.Fragment>
                  <Header />
                  <EditBusinessInfo />
                  <Footer />
                </React.Fragment>
              }
            />
            <Route
              path="/business/search"
              element={
                <React.Fragment>
                  <Header />
                  <SearchForBusinesses
                    title="Saleh"
                    posts={[{ title: "Moh" }, { title: "Siu" }]}
                  />
                  <Footer />
                </React.Fragment>
              }
            />
            
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
};

export default App;
