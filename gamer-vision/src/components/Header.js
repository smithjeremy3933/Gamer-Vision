import React from "react";
import { Link } from "react-router-dom";
// import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Gamer Vision
      </Link>
      <div className="right menu">
        <Link to="/projects" className="item">
          All Game Projects
        </Link>
        <Link to="/" className="item">
          Sign Up
        </Link>
        <Link to="/signin" className="item">
          Sign In
        </Link>
        <Link to="/signout" className="item">
          Sign Out
        </Link>
        {/* <GoogleAuth /> */}
      </div>
    </div>
  );
};

export default Header;
