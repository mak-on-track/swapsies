import React, { Component } from "react";
import { logout } from "./services/AuthService";
import "./style.css";
import "bulma/css/bulma.css";

const handleLogout = (props) => {
  logout().then(() => {
    console.log("loggedout", props);
    props.setUser(null);
  });
};

class Navbar extends Component {
  state = {
    isActive: false,
  };
  toggle = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  };
  render() {
    let navbarClass = "navbar-menu";
    if (this.state.isActive) {
      navbarClass += " is-active";
    }
    if (this.props.user) {
      return (
        <>
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="/dashboard">
                <img src="/icon_swap.png" alt="" height="28" />
              </a>
              <div className="navbar-item">
                Welcome, {this.props.user.username} ❤️
              </div>
              <a
                role="button"
                className="navbar-burger burger"
                data-target="navMenu"
                aria-label="menu"
                aria-expanded="false"
                onClick={this.toggle}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div className={navbarClass} id="navMenu">
              <div className="navbar-start">
                <a className="navbar-item" href="/dashboard">
                  Dashboard
                </a>
                <a
                  className="navbar-item"
                  href={`/messages/${this.props.user._id}`}
                >
                  Messages
                </a>
                <a className="navbar-item" href="/add">
                  Add Item
                </a>
                <a className="navbar-item" href="/myfavs">
                  Favourites
                </a>
                <a className="navbar-item" href="/search">
                  Search
                </a>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a
                      className="button negative"
                      href="/"
                      onClick={() => handleLogout(this.props)}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </>
      );
    } else {
      return null;
    }
  }
}

export default Navbar;
