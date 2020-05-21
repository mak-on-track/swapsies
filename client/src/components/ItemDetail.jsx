import React, { Component } from "react";
import "./style.css";
import "./style/ItemDetail.css"
import axios from "axios";

class ItemDetail extends Component {
  _isMounted = false;

  state = {
    item: null,
    type: "",
    category: "",
    name: "",
    description: "",
    status: "",
    location: "",
    itemImgPath: "",
    selectedImage: null,
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
      "Prenzlauer Berg",
      "Wedding",
      "Wilmersdorf",
      "Janz weit draußen",
    ],
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

  getData = () => {
    const id = this.props.match.params.id;
    // console.log(id);
    axios
      .get(`/api/items/${id}`)
      .then((response) => {
        // console.log(response.data);
        const {
          location,
          type,
          description,
          name,
          category,
          status,
          itemImgPath,
        } = response.data;

        if (this._isMounted) {
          this.setState({
            item: response.data,
            location,
            type,
            description,
            name,
            category,
            status,
            itemImgPath,
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          this.setState({ error: "Item not found" });
        }
      });
  };

  componentDidMount = () => {
    this._isMounted = true;

    this.getData();
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      //   itemImgPath: this.state.itemImgPath,
    });
  };

  handleImageChange = (event) => {
    console.log("this is the event.target.files[0]", event.target.files[0]);
    this.setState({
      selectedImage: event.target.files[0],
    });
  };

  handleSubmit = async (event) => {
    console.log("running");
    console.log(this.state.selectedImage);
    event.preventDefault();
    let image;
    if (this.state.selectedImage) {
      const uploadData = new FormData();
      // console.log(
      //   this.state.selectedImage,
      //   "this state selected image before upload append"
      // );
      uploadData.append("itemImageUrl", this.state.selectedImage);
      const uploadedImage = await axios.post(`/api/items/upload`, uploadData);
      image = uploadedImage.data.secure_url;
    } else {
      image = this.state.itemImgPath;
    }

    let { name, category, location, description, type, status } = this.state;

    //    console.log(name, category, location, description, type, status);
    console.log("this is the image", image);
    if (type === "Service") {
      category = "None";
      status = "Available";
    }

    return axios
      .put(`/api/items/`, {
        id: this.state.item._id,
        status,
        name,
        description,
        location,
        type,
        category,
        itemImgPath: image,
      })
      .then((res) => {
        console.log(res);

        this.setState({
          name: "",
          description: "",
          // itemImgPath: this.state.itemImgPath,
          selectedImage: null,
          type: "",
          category: "",
          status: "",
          location: "",
        });
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
            <div className="field">
              <label class="label">Edit {item.name}</label>
            </div>

            {/* Dropdown for selecting thing or service */}
            <div className="field">
              <label class="label">Is this a service or thing?</label>
              <div className="control">
                <div className="select">
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

            <div className="field">
              <label className="label">Update photo</label>
              <div className="file has-name">
                <label className="file-label">
                  <input 
                    className="file-input" 
                    type="file" 
                    name="itemImageUrl" 
                    onChange={this.handleImageChange}
                  />
                  <span className="file-cta">
                    <span className="file-label">
                      Choose a file
                    </span>
                  </span>
                  <span className="file-name">
                    {this.state.selectedImage ? this.state.selectedImage.name : "No file chosen"}
                  </span>
                </label>
              </div>
            </div>

            {/* Only displays when selected type is "thing" */}
            {this.state.type !== "Service" && (
              <>
                {/* Dropdown for selecting category */}
                <div className="field">
                  <label class="label">Category</label>
                  <div className="control">
                    <div className="select">
                      <select
                        id="category"
                        name="category"
                        onChange={this.handleChange}
                        value={this.state.category}
                        required
                      >
                        {categoryOptions.map((selectedCategory) => {
                          return (
                            <option
                              value={selectedCategory}
                              key={selectedCategory}
                            >
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
            <div className="field">
              <label htmlFor="name" class="label">
                Name
              </label>
              <div className="control">
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
            <div className="field">
              <label htmlFor="description" class="label">
                Description
              </label>
              <div className="control">
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

            <label class="label">Location</label>
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
                {/*  <div className="field">
              <label class="label">Add photos</label>
              <div className="control">
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
                <label htmlFor="status" class="label">
                  Status
                </label>
                <div className="select">
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
            <div className="control">
              <button 
                type="submit"
                value="add"
                className="button is-link is-light gimmespace"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      );
  }
}

export default ItemDetail;
