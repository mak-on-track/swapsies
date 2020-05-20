import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class ItemDetail extends Component {
  state = {
    item: null,
    type: "",
    category: "",
    name: "",
    description: "",
    status: "",
    location: "",
    error: null,
    locationOptions: [
      "Select Kiez",
      "All",
      "Charlottenburg",
      "Friedrichshain",
      "Kreuzberg",
      "Mitte",
      "Moabit",
      "Neukölln",
      "Schöneberg",
      "Wedding",
      "Wilmersdorf",
      "Janz weit draußen",
    ],
    categoryOptions: [
      "Select",
      "Plants",
      "Furniture",
      "Kitchen supplies",
      "Electronics",
      "Gardening tools",
      "Collectables & Memorabilia",
      "Bike stuff",
      "Clothes",
      "Other",
    ],
  };

  getData = () => {
    const id = this.props.match.params.id;
    const itemId = this.props.params;
    // console.log(id);
    axios
      .get(`/api/items/${id}`)
      .then((response) => {
        // console.log(response.data);
        const { location, type, description, name, category, status } = response.data;
        this.setState({
          item: response.data,
          location,
          type,
          description,
          name,
          category,
          status,
        });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Item not found" });
        }
      });
  };

  componentDidMount = () => {
    this.getData();
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log("running");
    let { name, category, location, description, type, status } = this.state;

    console.log(name, category, location, description, type, status);


    if (type === "Service") {
      category = "None";
      status = "Available";
    }
    /* if(type === "Service") {IMAGE IS NULL} */

    return axios
      .put("/api/items/", {
        id: this.state.item._id,
        status,
        name,
        description,
        location,
        type,
        category,
        //itemImgPath: "",
      })
      .then((data) => {
        this.setState({
          name: "",
          description: "",
          //itemImgPath: "",
          type: "",
          category: "",
          status: "",
          location: "",
        });
     //   this.props.setUser(data.data);

      })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { item, locationOptions, categoryOptions } = this.state;

    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.item) return <div></div>;
    else
      return (
        <div className="main">
          <form onSubmit={this.handleSubmit}>
            <div class="field">
              <label class="label">Edit {item.name}</label>
            </div>

            {/* Dropdown for selecting thing or service */}
            <div class="field">
              <label class="label">Is this a service or thing?</label>
              <div class="control">
                <div class="select">
                  <select
                    id="type"
                    value={this.state.type}
                    name="type"
                    onChange={this.handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Thing">Thing</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Only displays when selected type is "thing" */}
            {this.state.type !== "Service" && (
              <>
                {/* Dropdown for selecting category */}
                <div class="field">
                  <label class="label">Category</label>
                  <div class="control">
                    <div class="select">
                      <select
                        id="category"
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category}
                        required
                      >
                          {categoryOptions.map((selectedCategory) => {
                      return (
                        <option value={selectedCategory} key={selectedCategory}>
                          {selectedCategory}
                        </option>
                      );
                    })}
                      </select>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Name of item */}
            <div class="field">
              <label htmlFor="name" class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  id="name"
                  placeholder="Name of item"
                  required
                />
              </div>
            </div>

            {/* Description of item */}
            <div class="field">
              <label htmlFor="description" class="label">Description</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  id="description"
                  placeholder="Add a description"
                  required
                />
              </div>
            </div>

            <label class="label">Location:</label>
            <div className="select">
              <select
                name="location"
                value={this.state.location}
                onChange={this.handleChange}
                required
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
            {/* Check for whether type is thing to have functionality of adding image */}
            {item.type !== "Service" && (
              <>
                {/*  <div class="field">
              <label class="label">Add photos</label>
              <div class="control">
                <input
                  type="file"
                  name="itemImageUrl"
                  //value={itemImgPath}
                  onChange={this.handleImageChange}
                />
              </div>
            </div> */}
              </>
            )}

            {item.type !== "Service" && (
              <>
            <label htmlFor="status" class="label">Status</label>
            <div class="select">
              <select
                id="status"
                name="status"
                onChange={this.handleChange}
                value={this.state.status}
                required
              >
                <option value="Available">Available</option>
                <option value="Reserved">Reserved</option>
                <option value="Swapped">Swapped</option>
              </select>
            </div>
            </>
            )}
            <div class="control">
              <button type="submit" value="add" class="button is-link is-light">
                Edit
              </button>
            </div>
          </form>
        </div>
      );
  }
}

export default ItemDetail;
