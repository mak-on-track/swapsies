import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }
  render() {
    if (this.state.loggedInUser) {
      return (
        <nav>
          <ul>
            <li>Welcome, {this.state.loggedInUser.username}</li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      );
    } else {
      return (
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Log In</Link>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

export default Navbar;
