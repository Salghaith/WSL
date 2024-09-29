import React, { useContext } from "react";
import "./nav.css";
import logo from "../assets/logoWSL.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../components/util/context";

function Nav() {
  const { loggedInUser, logout } = useContext(UserContext);

  return (
    <div className="navBar">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              {!loggedInUser ? (
                <Link to="/business/register">Register Your Business</Link>
              ) : (
                <Link>Edit Your Profile</Link>
              )}
            </li>
          </ul>
        </nav>
        <div className="auth">
          {/* Check if the user is logged in */}
          {loggedInUser ? (
            <>
              <span>Hello, {loggedInUser.name}</span>
              <button onClick={logout} className="logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/client/login" className="login">
                Login
              </Link>
              <Link to="/client/login">
                <button className="signup">Signup Free</button>
              </Link>
            </>
          )}
        </div>
      </header>
      <hr />
    </div>
  );
}

export default Nav;
