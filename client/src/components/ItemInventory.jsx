import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemInventory extends Component {
  state = {
    user: this.props.user,
    loggedInUser: this.props.loggedInUser,
  };

  componentDidUpdate(prevProps) {
    if (this.state.user !== prevProps.user) {
      this.setState({ user: this.props.user });
      this.setState({ loggedInUser: this.props.loggedInUser });
    }
  }

  render() {
    const itemsList = this.state.user.inventory;

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

              {this.state.user._id === this.state.loggedInUser._id ? (
                <>
                  <label>Status: </label>
                  <select
                    name="status"
                    value={thing.status}
                    onChange={this.handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Swapped">Swapped</option>
                  </select>
                  <br />
                  {/* <button>Edit</button> */}
                  <button id={thing._id} onClick="function(this.id)">
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <li>Status: {thing.status}</li>
                  <button id={thing._id} onClick="function(this.id)">
                    Offer Swap
                  </button>
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
