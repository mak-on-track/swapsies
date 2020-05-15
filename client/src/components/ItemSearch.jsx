import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ItemSearch extends Component {
  state = {
    search: "",
    category: "",
    type: "",
    userList: [],
  };

  componentDidMount() {
    axios
      .get("/api/user")
      .then((response) => {
        this.setState({
          userList: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const userId = this.props.user._id;
    console.log(this.state.userList);
    const filteredItems = this.props.itemsList.filter((item) => {
      //All Filter Functions Here
      return item;
    });

    const filteredThings = filteredItems.filter((thing) => {
      return thing.type === "Thing";
    });

    const filteredServices = filteredItems.filter((thing) => {
      return thing.type === "Service";
    });

    const itemOwner = (postedBy) =>
      this.state.userList.map((owner) => {
        if (postedBy === owner._id) return owner.username;
      });

    const displayThings = filteredThings.map((thing) => {
      return (
        <div>
          <hr />
          <ul>
            {thing.owner === userId && <li>This is your item</li>}

            <li>Photo (need to start cloudinary)</li>
            <li>Category: {thing.category}</li>
            <li>Name: {thing.name}</li>
            <li>Description: {thing.description}</li>
            <li>Status: {thing.status}</li>
            <li>Favourites: {thing.favourites}</li>
            <li>
              <button type="button">Add to Favourites</button>
            </li>
            <li>Posted by: {itemOwner(thing.owner)} <Link to={`/user/${thing.owner}`}>Visit Page</Link></li>
          </ul>
        </div>
      );
    });

    /* const filteredService = */
    console.log(this.props.itemsList);
    /* const itemService =  */

    /*     const itemThing =

    //Do overall filtered list, then filter logic and then two lists to display

     */ return (
      <div>
        <h2>What are you looking for?</h2>
        <div>
          <h4>Things</h4>
          <div className="itemslist">{displayThings}</div>
        </div>
        <div>
          <h4>Services</h4>
          <div className="serviceList"></div>
        </div>
      </div>
    );
  }
}

export default ItemSearch;
