import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class ItemSearch extends Component {
  state = {
    search: "",
    category: "",
    type: "",
    userList: [],
    availableCheck: true,
    reservedCheck: true,
    swappedCheck: true,
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

  handleAvailableCheck = (event) => {
    this.setState({
      availableCheck: event.target.checked,
    });
  };

  handleReservedCheck = (event) => {
    this.setState({
      reservedCheck: event.target.checked,
    });
  };

  handleSwappedCheck = (event) => {
    this.setState({
      swappedCheck: event.target.checked,
    });
  };

  handleSearchChange = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleTypeSelect = (event) => {
    this.setState({
      type: event.target.value,
    });
  };

  handleCategorySelect = (event) => {
    this.setState({
      category: event.target.value,
    });
  };

  render() {
    const userId = this.props.user._id;

    const filteredItems = this.props.itemsList.filter((item) => {
      if (item.name.toLowerCase().includes(this.state.search.toLowerCase()))
        return item;
      if (item.category.toLowerCase().includes(this.state.search.toLowerCase()))
        return item;
      if (
        item.description.toLowerCase().includes(this.state.search.toLowerCase())
      )
        return item;
    });

    const filteredThings = filteredItems.filter((thing) => {
      if (this.state.category === "") return thing.type === "Thing";
      return thing.type === "Thing" && thing.category === this.state.category;
    });

    const isAvailable = (thing) => {
      if (this.state.availableCheck) {
        return thing.status === "Available";
      } else return false;
    };

    const isReserved = (thing) => {
      if (this.state.reservedCheck) {
        return thing.status === "Reserved";
      } else return false;
    };

    const isSwapped = (thing) => {
      if (this.state.swappedCheck) {
        return thing.status === "Swapped";
      } else return false;
    };

    const statusThings = filteredThings.filter((thing) => {
      if (isAvailable(thing)) return true;
      if (isReserved(thing)) return true;
      if (isSwapped(thing)) return true;

      return false;
    });

    const filteredServices = filteredItems.filter((thing) => {
      return thing.type === "Service";
    });

    const itemOwner = (postedBy) =>
      this.state.userList.map((owner) => {
        if (postedBy === owner._id) return owner.username;
      });

    const displayThings = statusThings.map((thing) => {
      return (
        <div>
          <hr />
          <ul>
            <li>Photo (need to start cloudinary)</li>
            <li>Category: {thing.category}</li>
            <li>Name: {thing.name}</li>
            <li>Description: {thing.description}</li>
            <li>Status: {thing.status}</li>
            <li>Favourites: {thing.favourites}</li>
            <li>
              <button type="button">Add to Favourites</button>
            </li>
            {thing.owner === userId ? (
              <li>Posted by You!</li>
            ) : (
              <li>
                Posted by: {itemOwner(thing.owner)}{" "}
                <Link to={`/user/${thing.owner}`}>Visit Page</Link>
              </li>
            )}
          </ul>
        </div>
      );
    });

    const displayServices = filteredServices.map((service) => {
      return (
        <div>
          <hr />
          <ul>
            <li>Name: {service.name}</li>
            <li>Description: {service.description}</li>
            <li>Favourites: {service.favourites}</li>
            <li>
              <button type="button">Add to Favourites</button>
            </li>
            {service.owner === userId ? (
              <li>Posted by You!</li>
            ) : (
              <li>
                Posted by: {itemOwner(service.owner)}
                <Link to={`/user/${service.owner}`}>Visit Page</Link>
              </li>
            )}
          </ul>
        </div>
      );
    });

    /* const filteredService = */
    /* const itemService =  */

    /*     const itemThing =

    //Do overall filtered list, then filter logic and then two lists to display

     */ return (
      <div>
        <h2>What are you looking for?</h2>
        <select id="type" onChange={this.handleTypeSelect}>
          <option value="">Select Thing or Service</option>
          <option value="Thing">Thing</option>
          <option value="Service">Service</option>
        </select>

        {this.state.type === "Thing" && (
          <>
            <h2>Find by Category</h2>
            <select id="category" onChange={this.handleCategorySelect}>
              <option value="">All</option>
              <option value="Plants">Plants</option>
              <option value="Furniture">Furniture</option>
            </select>
          </>
        )}

        {this.state.type !== "" && (
          <>
            <form>
              <input
                type="text"
                placeholder="Search"
                name="search"
                id="search"
                value={this.state.search}
                onChange={this.handleSearchChange}
              />
            </form>
          </>
        )}

        {this.state.type === "Thing" && (
          <>
            <label htmlFor="available">Available</label>
            <input
              type="checkbox"
              name="Available"
              id="available"
              checked={this.state.availableCheck}
              onChange={this.handleAvailableCheck}
            />
            <label htmlFor="reserved">Reserved</label>
            <input
              type="checkbox"
              name="Reserved"
              id="reserved"
              checked={this.state.reservedCheck}
              onChange={this.handleReservedCheck}
            />
            <label htmlFor="swapped">Swapped</label>
            <input
              type="checkbox"
              name="Swapped"
              id="swapped"
              checked={this.state.swappedCheck}
              onChange={this.handleSwappedCheck}
            />
          </>
        )}

        <hr />
        <div>
          {this.state.type === "Thing" && (
            <>
              <h4>Things</h4>
              <div className="itemslist">{displayThings}</div>
            </>
          )}
        </div>
        <hr />
        <div>
          {this.state.type === "Service" && (
            <>
              {" "}
              <h4>Services</h4>
              <div className="serviceList">{displayServices}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ItemSearch;
