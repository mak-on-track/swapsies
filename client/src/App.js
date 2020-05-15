import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import EditProfile from "./components/EditProfile";
import Dashboard from "./components/Dashboard";
import AddItem from "./components/AddItem";
import ItemSearch from "./components/ItemSearch";
import FindUser from "./components/FindUser";
import Favourites from "./components/Favourites";

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
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/edit"
            render={(props) => (
              <EditProfile user={this.state.user} {...props} />
            )}
          />
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
          <Route exact path="/add" render={(props) => <AddItem {...props} />} />
          <Route
            exact
            path="/finduser"
            render={(props) => <FindUser {...props} />}
          />
          <Route
            exact
            path="/search"
            render={(props) => <ItemSearch {...props} />}
          />
          <Route
            exact
            path="/myfavs"
            render={(props) => <Favourites {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard user={this.state.user} {...props} />} //Not yet working
          />
          {/*           Add Not found route
           */}{" "}
        </Switch>
      </div>
    );
  }
}

export default App;
