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
import NotFound from "./components/NotFound";
import axios from "axios";
import OtherUser from "./components/OtherUser";
import Messages from "./components/Messages";
import OfferSwap from "./components/OfferSwap";
//const uploadCloud = require("../config/cloudinary.js");

class App extends Component {
  state = {
    user: this.props.user,
    allItems: [],
  };

  componentDidMount() {
    axios
      .get("/api/items")
      .then((response) => {
        this.setState({
          allItems: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  componentDidUpdate(prevProps) { //Added when posting a message to update user.
/*     if (this.state.user !== prevProps.user) {
      const userId = this.state.user._id;
      console.log('userid', userId)
      return axios
        .get(`/api/user/${userId}`)
        .then((response) => {
          console.log('response', response)
          this.setUser(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } */
  }


  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  getData = () => {
    axios
      .get("/api/items")
      .then((response) => {
        this.setState({
          allItems: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
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
              <EditProfile
                user={this.state.user}
                setUser={this.setUser}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/signup"
            render={(props) => <Signup setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/messages/:id"
            render={(props) => <Messages setUser={this.setUser}  user={this.state.user}  {...props} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => <Login setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/add"
            render={(props) => (
              <AddItem
                user={this.state.user}
                setUser={this.setUser}
                getData={this.getData}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/swap/:item"
            render={(props) => <OfferSwap user={this.state.user}  setUser={this.setUser} {...props} />}
          />

          <Route
            exact
            path="/finduser"
            render={(props) => <FindUser {...props} />}
          />
          <Route
            exact
            path="/user/:userId"
            render={(props) => <OtherUser user={this.state.user} setUser={this.setUser} {...props} />}
          />
          <Route
            exact
            path="/search"
            render={(props) => (
              <ItemSearch
                itemsList={this.state.allItems}
                user={this.state.user}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/myfavs"
            render={(props) => <Favourites {...props} />}
          />
          <Route
            exact
            path="/dashboard"
            render={(props) => (
              <Dashboard
                setUser={this.setUser}
                itemsList={this.state.allItems}
                user={this.state.user}
              />
            )}
          />
          <Route exact path="/:notfound" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
