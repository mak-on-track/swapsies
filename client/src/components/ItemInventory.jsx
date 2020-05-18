import React, { Component } from "react";
import { Link } from "react-router-dom";

class ItemInventory extends Component {
  render() {
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
