import React from "react";
import { Link } from "react-router-dom";
// import GoogleAuth from "./GoogleAuth";
import { connect } from "react-redux";

class Header extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to="/signout" className="item">
            Sign Out
          </Link>
          <Link to="/projects" className="item">
            All Game Projects
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/" className="item">
            Sign Up
          </Link>
          <Link to="/signin" className="item">
            Sign In
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          Gamer Vision
        </Link>
        <div className="right menu">
          {this.renderLinks()}

          {/* <GoogleAuth /> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
