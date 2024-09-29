// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessLogin from "./pages/BusinessLogin";
import BusinessRegister from "./pages/BusinessRegister";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Footer from "./components/footer";
import Nav from "./components/nav";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<React.Fragment><Nav /><HomePage /><Footer/></React.Fragment>} />
        <Route path="/client/login" element={<Auth />} />
        <Route path="/client/register" element={<Auth />} />
        <Route path="/business/register" element={<React.Fragment><Nav /><BusinessRegister /><Footer/></React.Fragment>} />
      </Routes>
    </Router>
  );
};

export default App;
