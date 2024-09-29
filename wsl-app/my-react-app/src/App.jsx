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
          <Route path="/client/login" element={<Auth />} />
          <Route
            path="/business/register"
            element={
              <React.Fragment>
                <Nav />
                <BusinessRegister />
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
