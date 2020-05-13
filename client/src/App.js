import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import CreateProfile from "./components/Createprofile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      this.service
        .loggedin()
        .then((response) => {
          this.setState({
            loggedInUser: response,
          });
        })
        .catch((err) => {
          this.setState({
            loggedInUser: false,
          });
        });
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    this.fetchUser();

    if (this.state.loggedInUser) {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create" component={CreateProfile} />
          </Switch>
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/signup"
              render={() => <Signup getUser={this.getTheUser} />}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/create" component={CreateProfile} />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
