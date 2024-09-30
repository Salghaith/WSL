import React, { useState, useEffect } from "react";
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
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <React.Fragment>
                <Nav />
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
            path="/business/register"
            element={
              <React.Fragment>
                <Nav />
                <BusinessRegister
                  onValidityChange={handleValidity}
                  formValidity={formValidity}
                />
                <Footer />
              </React.Fragment>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
