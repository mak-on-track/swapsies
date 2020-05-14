import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from './services/AuthService';



const handleLogout = props => {

  logout().then(() => {
    console.log('loggedout', props)
    props.setUser(null);
  });
}


class Navbar extends Component {

  render() {
    if (this.props.user) {
      return (
        <nav>
          <ul>
            <li>Welcome, {this.props.user.username}</li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
              <Link to="/search">Search for Item/Search</Link> 
              </li>
              <li>
              <Link to="/finduser">Find a User</Link> {/* Could this also be a search bar? */}
              </li>
              <li>
              <Link to="/add">Add Item</Link>
            </li>
            <li>
              <Link to="/myfavs">Favourites</Link>
            </li>
              <li>
              <Link to='/' onClick={() => handleLogout(this.props)}>
              Logout
            </Link>
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
