// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BusinessLogin from "./pages/BusinessLogin";
import BusinessRegister from "./pages/BusinessRegister";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/client/login" element={<Auth />} />
        <Route path="/client/register" element={<Auth />} />
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/register" element={<BusinessRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
