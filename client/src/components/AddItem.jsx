import React, { Component } from "react";
import axios from "axios";
import "./style.css";

class AddItem extends Component {
  state = {
    name: "",
    itemImgPath: "https://images.unsplash.com/photo-1429087969512-1e85aab2683d", //could put a "insert image" thing here as a default
    selectedImage: null,
    type: "",
    category: "",
    description: "",
    location: this.props.user.location,
    locationOptions: [
      "Select Kiez",
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
    selectedCategory: "",
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

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      itemImgPath: this.state.itemImgPath,
    });
  };

  handleImageChange = (event) => {
    console.log("this is the event.target.files[0]", event.target.files[0]);
    this.setState({
      selectedImage: event.target.files[0],
    });
    console.log(
      "this.state.selectedImage before upload: ",
      this.state.selectedImage
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    let image;
    if (this.state.selectedImage) {
      const uploadData = new FormData();
      console.log(
        this.state.selectedImage,
        "this state selected image before upload append"
      );
      uploadData.append("itemImageUrl", this.state.selectedImage);
      const uploadedImage = await axios.post(`/api/items/upload`, uploadData);
      image = uploadedImage.data.secure_url;
    } else {
      image = this.state.itemImgPath;
    }

    let { name, category, location, description, type } = this.state;

    if (type === "Service") {
      category = "None";
    }

    return axios
      .post("/api/items", {
        owner: this.props.user._id,
        favourites: 0,
        status: "Available",
        name,
        description,
        location,
        type,
        category,
        itemImgPath: image,
      })
      .then((res) => {
        console.log(res);
        const userData = res.data;
        this.props.setUser(userData);

        this.setState({
          name: "",
          description: "",
          itemImgPath: "",
          type: "",
          category: "",
          selectedCategory: "",
          location: this.props.user.location,
        });
      })
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => {
        console.log("Error adding item", err);
      });
  };

  // checkUploadResult = (resultEvent) => {
  //   if (resultEvent.event === "success") {
  //     console.log("owner id", this.props.user._id);
  //     this.props.selectedImage({
  //       owner_id: this.props.user._id,
  //       caption: "",
  //       url: resultEvent.info.secure_url,
  //     });
  //   }
  // };

  // showWidget = (widget) => {
  //   ////widget.open(null, { files: this.state.selectedImage });
  //   window.cloudinary.openUploadWidget(
  //     {
  //       cloudName: "dsxr5ymph",
  //       uploadPreset: "swapsies",
  //       sources: ["local", "url", "google_drive", "dropbox"],
  //     },
  //     { files: this.state.selectedImage },
  //     (error, result) => {}
  //   );
  // };

  render() {
    console.log(this.props);

    // let widget = window.cloudinary.createUploadWidget(
    //   {
    //     cloudName: "dsxr5ymph",
    //     uploadPreset: "swapsies",
    //   },
    //   (error, result) => {
    //     this.checkUploadResult(result);
    //   }
    // );

    const {
      name,
      description,
      location,
      locationOptions,
      itemImgPath,
      category,
      selectedCategory,
      categoryOptions,
      type,
    } = this.state;
    return (
      <div className="main">
        {/* <button onClick={this.showWidget}>Upload multiple photos</button> */}

        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Add new item</label>
          </div>

          {/* Dropdown for selecting thing or service */}
          <div className="field">
            <label className="label">Is this a service or thing?</label>
            <div className="control">
              <div className="select">
                <select
                  id="type"
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
          {type !== "Service" && (
            <>
              {/* Dropdown for selecting category */}
              <div className="field">
                <label className="label">Category</label>
                <div className="control">
                  <div className="select">
                    <select
                      name="category"
                      value={category}
                      onChange={this.handleChange}
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
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
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
            <label class="label">Description</label>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <textarea
                    className="textarea"
                    type="text"
                    name="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    id="description"
                    placeholder="Add a description"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Location:</label>
            <div className="control">
              <div className="select">
                <select
                  name="location"
                  value={location}
                  onChange={this.handleChange}
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
          {/* Check for whether type is thing to have functionality of adding image */}
          {/* {type !== "Service" && ( */}
          <div className="field">
            <label className="label">Add a photo</label>
            <div className="file has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  name="itemImageUrl"
                  onChange={this.handleImageChange}
                />
                <span className="file-cta">
                  <span className="file-label">Choose a file</span>
                </span>
                <span className="file-name">
                  {this.state.selectedImage
                    ? this.state.selectedImage.name
                    : "No file chosen"}
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Choose a file</span>
                </span>
                {/* <span className="file-name"></span> */}
              </label>
            </div>
          </div>

          {/* Submit button */}
          <div className="control">
            <button type="submit" value="add" class="button is-link is-light">
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddItem;
