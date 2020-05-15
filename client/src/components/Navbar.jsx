import React, { Component } from "react";
import { logout } from './services/AuthService';
import './Navbar.css'
import "bulma/css/bulma.css"

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
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="/">
              <img src="/icon_swap.png" alt="" height="28" />
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              
              <div class="navbar-item">Welcome, {this.props.user.username}</div>
              <a class="navbar-item" href="/dashboard">Dashboard</a>
              <a class="navbar-item" href="/add">Add Item</a>
              <a class="navbar-item" href="/myfavs">Favourites</a>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Search</a>
                <div class="navbar-dropdown">
                  <a class="navbar-item" href="/search">Search an item</a>
                  <a class="navbar-item" href="/finduser">Find a User</a>
                </div>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item" href="/">
                <div class="buttons">
                  <a class="button is-light" href="/" onClick={() => handleLogout(this.props)}>Logout</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    } else {
      return (
        <div class="navbar-end">
          <div class="navbar-item" href="/">
            <div class="buttons">
              <a class="button is-primary" href="/signup"><strong>Sign up</strong></a>
              <a class="button is-light" href="/login">Log in</a>
            </div>
          </div>
        </div>
      )
    }
  }
}
   
export default Navbar;