import React, { Component } from "react";
import "./style.css";
import "./style/ItemSearch.css";

class ItemSearch extends Component {
  state = {
    search: "",
    type: "",
    availableCheck: true,
    reservedCheck: true,
    swappedCheck: false,
    location: "Filter by Kiez",
    locationOptions: [
      "Filter by Kiez",
      "All",
      "Charlottenburg",
      "Friedrichshain",
      "Kreuzberg",
      "Mitte",
      "Moabit",
      "Neukölln",
      "Prenzlauer Berg",
      "Schöneberg",
      "Wedding",
      "Wilmersdorf",
      "Janz weit draußen",
    ],
    category: "",
    categoryOptions: [
      "Select",
      "Bike stuff",
      "Clothes",
      "Collectables & Memorabilia",
      "Electronics",
      "Food",
      "Furniture",
      "Gardening tools",
      "Kitchen supplies",
      "Plants",
      "Other",
    ],
  };

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
    console.log(event.target.value);
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

  handleKiezSelect = (event) => {
    console.log("target value", event.target.value);
    this.setState({
      location: event.target.value,
    });
  };

  render() {
    const userId = this.props.user._id;
    const location = this.state.location;
    const locationOptions = this.state.locationOptions;
    const category = this.state.category;
    const categoryOptions = this.state.categoryOptions;

    const filteredItems = this.props.itemsList.filter((item) => {
      if (
        item.location !== this.state.location &&
        this.state.location !== "Filter by Kiez" &&
        this.state.location !== "All"
      )
        return false;

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

    const displayThings = statusThings.map((thing) => {
      return (
        <div className="card card-itemsearch">
          <div className="card-content">
            <div
              className="media-content"
              style={{ marginBottom: "0.7rem" }}
            >
              <div className="media-left">
                <figure className="item-image">
                  <img src={thing.itemImgPath} alt="picture of thing" />
                </figure>
              </div>
            </div>

            <div className="content">
              
              <p className="title is-4 is-size-5-mobile">{thing.name}</p>
              <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                {thing.location}
              </p>
              <p className="subtitle is-7" style={{ marginBottom: "0.5rem" }}>
                Favourites: {thing.favourites}
              </p>
              {thing.description}
              <br />
              Status: {thing.status}
              {thing.owner._id === userId ? (
                <p>My post</p>
              ) : (
                <p>
                  Post by<> </>
                  <a href={`/user/${thing.owner._id}`}>
                    {thing.owner.username}
                  </a>
                </p>
              )}
            </div>
          </div>
          <footer className="card-footer">
            <a href="#" class="card-footer-item">
              Add to Favourites
            </a>
            <a href={`/swap/${thing._id}`} class="card-footer-item">
              Offer Swap
            </a>
          </footer>
        </div>
      );
    });

    const displayServices = filteredServices.map((service) => {
      /*       console.log(service); */
      return (
        <div className="card">
          <div className="card-content">
            <div
              className="media-content"
              style={{ marginBottom: "0.7rem" }}
            >
              <div className="media-left">
                {/* <div class="boxed-in"> */}
                <figure className="item-image">
                  <img src={service.itemImgPath} alt="picture of service" />
                </figure>
                {/* </div> */}
              </div>
            </div>

            <div className="content">
              <p className="title is-4 is-size-5-mobile">{service.name}</p>
              <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                {service.location}
              </p>
              <p className="subtitle is-6" style={{ marginBottom: "0.5rem" }}>
                Favourites: {service.favourites}
              </p>
              {service.description}
              {service.owner._id === userId ? (
                <p>My post</p>
              ) : (
                <p>
                  Post by<> </>
                  <a href={`/user/${service.owner._id}`}>
                    {service.owner.username}
                  </a>
                </p>
              )}
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">
              Add to Favourites
            </a>
            <a href={`/swap/${service._id}`} class="card-footer-item">
              Offer Swap
            </a>
          </footer>
        </div>
      );
    });

    return (
      <div className="main">
        <label className="label">What are you looking for?</label>
        <div className="field">
          <div className="control">
            <div className="select">
              <select
                id="itemtype"
                name="itemtype"
                onChange={this.handleTypeSelect}
              >
                <option value="">Select</option>
                <option value="Thing">Thing</option>
                <option value="Service">Service</option>
              </select>
            </div>
          </div>
        </div>

        {this.state.type === "Thing" && (
          <>
            <label className="label">Find by Category</label>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    id="category"
                    name="category"
                    value={category}
                    onChange={this.handleCategorySelect}
                  >
                    {categoryOptions.map((selectedCategory) => {
                      return (
                        <option value={selectedCategory} key={selectedCategory}>
                          {selectedCategory}
                        </option>
                      );
                    })}
                  </select>

                  {/* <select id="category" onChange={this.handleCategorySelect}>
                    <option value="">All</option>
                    <option value="Plants">Plants</option>
                    <option value="Furniture">Furniture</option>
                  </select> */}
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.type !== "" && (
          <>
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  name="search"
                  type="text"
                  placeholder="Search"
                  id="search"
                  value={this.state.search}
                  onChange={this.handleSearchChange}
                />
              </div>
            </div>
          </>
        )}

        {this.state.type !== "" && (
          <>
            <label className="label">Location:</label>
            <div className="field">
              <div className="control">
                <div className="select">
                  <select
                    id="location"
                    name="location"
                    value={location}
                    onChange={this.handleKiezSelect}
                  >
                    {locationOptions.map((option) => {
                      return (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {this.state.type === "Thing" && (
          <>
            <label className="checkbox" style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                name="Available"
                id="available"
                checked={this.state.availableCheck}
                onChange={this.handleAvailableCheck}
              />
              Available
            </label>

            <label className="checkbox" style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                name="Reserved"
                id="reserved"
                checked={this.state.reservedCheck}
                onChange={this.handleReservedCheck}
              />
              Reserved
            </label>

            <label className="checkbox" style={{ marginRight: "1rem" }}>
              <input
                type="checkbox"
                name="Swapped"
                id="swapped"
                checked={this.state.swappedCheck}
                onChange={this.handleSwappedCheck}
              />
              Swapped
            </label>
          </>
        )}

        <div>
          {this.state.type === "Thing" && (
            <div className="flex-container">{displayThings}</div>
          )}
        </div>
        <div>
          {this.state.type === "Service" && (
            <>
              {/* <h4>Services</h4> */}
              <div className="flex-container">{displayServices}</div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ItemSearch;
