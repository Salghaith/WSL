import React, { useState, useContext, useEffect } from "react";
import "../UserPages/UserProfile.css";
import "./editCard.css";
import { UserContext } from "../../components/util/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MessageBanner from "../../components/Shared/MessageBanner.jsx";
import Input from "../../components/FormElement/Input";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { sendOTP, verifyOTP } from "../../components/util/OTP.js";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { loggedInUser, login, apiBaseUrl } = useContext(UserContext);

  //   useEffect(() => {
  //     if (!loggedInUser) {
  //       navigate("/");
  //     }
  //   }, [loggedInUser, navigate]);

  const [email, setEmail] = useState(loggedInUser ? loggedInUser.email : "");

  const [password, setPassword] = useState("password");
  const [OTP, setOTP] = useState();

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [phase, setPhase] = useState(1);

  const handleSaveClick = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${apiBaseUrl}/user/reset`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      setLoading(false);

      setErrors({}); // Clear errors on successful submission

      alert("Password updated successfully!");
      navigate("/client/login");
    } catch (error) {
      setLoading(false);
      setErrors({ general: "Failed to update password" });
    }
  };

  const handleEmail = () => {
    setPhase(2);
    sendOTP(email, apiBaseUrl);
  };
  const handleOTP = () => {
    const otpStatus = verifyOTP(email, OTP);
    console.log(otpStatus);
    if (otpStatus) {
      setPhase(3);
    } else {
      setPhase(1);
      setOTP("");
      setEmail("");
      alert("Wrong OTP");
    }
  };

  return (
    <div className="profile-page">
      <div>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
          onClick={() => {}}
        >
          <CircularProgress color="black" />
        </Backdrop>
      </div>
      <div className="profile-container">
        <h2 className="profile-title">Reset Password</h2>
        <div className={`profile-field ${phase != 1 && "disable"}`}>
          <label htmlFor="email">Email</label>
          <Input
            element="input"
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={"editable"}
          />
          <div className="button-container">
            <button className="save-btn" onClick={handleEmail}>
              Send OTP
            </button>
          </div>
        </div>

        <div className={`profile-field ${phase != 2 && "disable"}`}>
          <label htmlFor="OTP">OTP</label>
          <Input
            element="input"
            type="text"
            id="OTP"
            onChange={(e) => setOTP(e.target.value)}
            className={"editable"}
          />
          <div className="button-container">
            <button className="save-btn" onClick={handleOTP}>
              Submit
            </button>
          </div>
        </div>

        <div className={`profile-field ${phase != 3 && "disable"}`}>
          <label htmlFor="password">New Password</label>
          <Input
            element="input"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className={"editable"}
          />
          <div className="button-container">
            <button className="save-btn" onClick={handleSaveClick}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
