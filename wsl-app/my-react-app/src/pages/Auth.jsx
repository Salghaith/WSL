import React, { useContext, useState } from "react";
import "./Auth.css";
import axios from "axios";
import logo from "../assets/logoWSL.svg";
import userIcon from "../assets/username-icon.svg";
import emailIcon from "../assets/email-icon.svg";
import lockIcon from "../assets/lock-icon.svg";
import homePic from "../assets/home-picture2.svg";
import Input from "../components/FormElement/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../components/util/validators";
import { Link, useNavigate } from "react-router-dom";

// import { AuthContext } from "../../shared/context/Auth-context";

const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const navigate = useNavigate();
  //   const auth = useContext(AuthContext);

  const switchModeHandler = () => {
    setIsLoginMode((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    let username = "";
    if (!isLoginMode) {
      username = event.target.username.value;
    }
    let email = event.target.email.value;
    let password = event.target.password.value;

    try {
      if (isLoginMode) {
        // Login Mode
        const response = await axios.post('http://localhost:3001/api/auth/login', {
          email,
          password
        },
        { withCredentials: true}
      );
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        navigate("/");
        console.log('Login successful:', response.data);
        // Save the JWT token or session data
        // localStorage.setItem('token', response.data.token);
        // Redirect user to the dashboard or home page
      } else {
        // Register Mode
        const res = await axios.post('http://localhost:3001/api/auth/register', {
          name: username,
          email,
          password
        },
        { withCredentials: true}
      );
        navigate("/");
        // Handle post-registration logic (e.g., auto-login, redirect)
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // If the server sends a meaningful error message
        console.log(error);
        console.log("here")
      } else {
        // General error
        console.log(error);
      }
      // Display error message to the user
    }


    //After checking
    // auth.login(); => Login success!
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="WSL Logo" />
          </Link>
        </div>
        <div className="content">
          <div className="header">
            {isLoginMode ? "Login into" : "Register"} your account
          </div>
          <form className="form-content" onSubmit={authSubmitHandler}>
            {!isLoginMode && (
              <React.Fragment>
                <label htmlFor="username">Username</label>
                <div className="input-group">
                  <Input
                    element="input"
                    type="text"
                    id="username"
                    placeholder="Mohammed"
                    validators={[
                      VALIDATOR_MINLENGTH(3),
                      VALIDATOR_MAXLENGTH(8),
                    ]}
                    errorText="Please Enter A Valid Username!"
                  />
                  <span className="icon-container">
                    <img src={userIcon} alt="icon" />
                  </span>
                </div>
              </React.Fragment>
            )}

            <label htmlFor="email">Email Address</label>
            <div className="input-group">
              <Input
                element="input"
                type="email"
                id="email"
                placeholder="alex@gmail.com"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please Enter A Valid Email!"
              />
              <span className="icon-container">
                <img src={emailIcon} alt="icon" />
              </span>
            </div>
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <Input
                element="input"
                type="password"
                id="password"
                placeholder="Enter your password"
                validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(16)]}
                errorText="Please Enter A Valid Password!"
              />
              <span className="icon-container">
                <img src={lockIcon} alt="icon" />
              </span>
            </div>

            {isLoginMode && (
              <React.Fragment>
                <div className="link-container">
                  <a href="/">Forgot Password?</a>
                </div>
              </React.Fragment>
            )}
            <button
              type="submit"
              className={`form-btn ${!isLoginMode && "register"}`}
            >
              {isLoginMode ? "Login" : "Register"}
            </button>
            <div className="divider">OR</div>
            <button
              type="button"
              onClick={switchModeHandler}
              className="form-btn signup"
            >
              {!isLoginMode ? "Login" : "Signup"}
            </button>
          </form>
        </div>
      </div>
      <div className="right-section">
        <img src={homePic} alt="icon" />
      </div>
    </div>
  );
};

export default Auth;
