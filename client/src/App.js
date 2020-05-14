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
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    console.log('is this working')

    return (
      <div className="App">
        <Navbar userInSession={this.state.loggedInUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/create" component={CreateProfile} />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />

          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
