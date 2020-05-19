import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ItemInventory extends Component {
  deleteItem = (event) => {
    console.log("event target value", event.target.value);
    axios
      .delete(`/api/items/${event.target.value}`)
      .then((res) => {
        console.log(res.data);
        this.props.setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    // console.log(this.props.user.inventory[0]._id);
    
    console.log(this.props)
    const itemsList = this.props.user.inventory;

    const filteredThings = itemsList.filter((thing) => {
      if (thing.type === "Thing") return true;
    });

    const displayThings = filteredThings.map((thing) => {
      return (
        <>
          <div className="main" key={thing._id}>
            <ul>
              <li>Name: {thing.name}</li>
              <li>
                <img src="" alt="image here" />
              </li>
              <li>Category: {thing.category}</li>
              <li>Description: {thing.description}</li>

              {this.props.user._id === this.props.loggedInUser._id ? (
                <>
                <li>Status: {thing.status}</li>
                {/*   <label>Status: </label>
                  <select
                    name="status"
                    value={thing.status}
                    onChange={this.handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Swapped">Swapped</option>
                  </select> */}
                  <br />
                  <Link to={`/items/${thing._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    id={thing._id}
                    name={thing}
                    value={thing._id}
                    onClick={this.deleteItem}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <li>Status: {thing.status}</li>
                  <Link to={`/swap/${thing._id}`}>
                    <button id={thing._id}>Offer Swap</button>
                  </Link>
                </>
              )}
            </ul>
            <hr />
          </div>
        </>
      );
    });

    /*   const thingsList = allItems.map(thing => thing) */

    return (
      <div>
        <h4>List of Things</h4>
        {displayThings.length < 1 ? (
          <Link to="/add">Add an Item</Link>
        ) : (
          displayThings
        )}
      </div>
    );
  }
}

export default ItemInventory;
