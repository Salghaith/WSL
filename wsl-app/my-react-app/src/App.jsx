import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/Shared/HomePage";
import BusinessRegister from "./pages/BusinessPages/BusinessRegister";
import Auth from "./pages/Shared/Auth";
import Footer from "./components/footer";
import { UserProvider } from "./components/util/context";
import SearchForBusinesses from "./pages/BusinessPages/SearchForBusinesses";
import Header from "./components/header";
import UserProfile from "./pages/UserPages/UserProfile";
import EditBusinessInfo from "./pages/BusinessPages/EditBusinessInfo";

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
                  <UserProfile
                    onValidityChange={handleValidity}
                    formValidity={formValidity}
                  />
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
