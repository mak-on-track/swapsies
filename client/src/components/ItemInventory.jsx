import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import "./style/Inventory.css";

class ItemInventory extends Component {
  deleteItem = (event) => {
    axios
      .delete(`/api/items/${event.target.value}`)
      .then((res) => {
        this.props.setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const itemsList = this.props.user.inventory;

    const filteredThings = itemsList.filter((thing) => {
      if (thing.type === "Thing") return true;
    });

    const displayThings = filteredThings.map((thing) => {
      console.log(thing.itemImgPath, "thing.itemimgpath");
      return (
        <>
          <div className="card inventory-card" key={thing._id}>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                  <figure class="image is-96x96">
                    <img src={thing.itemImgPath} alt="picture of thing" />
                  </figure>
                </div>

                <div className="content">
                  <p className="title is-5 has-margin-bottom-1">{thing.name}</p>

                  <p className="has-margin-bottom-1">
                    Category: {thing.category}
                  </p>
                  <p className="has-margin-bottom-1">
                    Location: {thing.location}
                  </p>
                  <p className="has-margin-bottom-1">
                    Description: {thing.description}
                  </p>

                  {this.props.user._id === this.props.loggedInUser._id ? (
                    <>
                      <p className="has-margin-bottom-1">Status: {thing.status}</p>
                      <div className="buttons are-small inventory-button">
                        <Link to={`/items/${thing._id}`}>
                          <button className="button">Edit</button>
                        </Link>
                        <button
                          id={thing._id}
                          name={thing}
                          value={thing._id}
                          onClick={this.deleteItem}
                          className="button"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="has-margin-bottom-1">Status: {thing.status}</p>
                       <div className="buttons are-small inventory-button">
                      <Link to={`/swap/${thing._id}`}>
                        <button className="button" id={thing._id}>Offer Swap</button>
                      </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });

    /*   const thingsList = allItems.map(thing => thing) */

    // console.log("logged in user", this.props.loggedInUser._id);
    // console.log("user", this.props.user._id);

    return (
      <div>
        {displayThings.length < 1 &&
        this.props.loggedInUser._id === this.props.user._id ? (
          <></>
        ) : (
          <div>
            <h4 className="title is-4 has-margin-top-1">List of Things</h4>
            <div className="inventory-container"> {displayThings}</div>
          </div>
        )}
      </div>

      // <div>
      //   {displayThings.length < 1 ? (
      //     this.props.loggedInUser._id === this.props.user._id ? (
      //       <p></p>
      //     ) : (
      //       ""
      //     )
      //   ) : (
      //     <>
      //       {" "}
      //       <h4>List of Things</h4>
      //       {displayThings}
      //     </>
      //   )}
      // </div>
    );
  }
}

export default ItemInventory;
