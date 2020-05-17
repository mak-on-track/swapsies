const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  name: String,
  itemImgName: String, //name on cloudinary
  itemImgPath: String, //name on cloudinary
  type: {
    type: String,
    enum: ["Service", "Thing"],
  },

  category: {
    type: String,
    enum: ["None", "Furniture", "Plants", "Food"],
  },
  description: String,
  status: {
    type: String,
    enum: ["Available", "Reserved", "Swapped"],
  },
  favourites: Number,
  location: String,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  // Optional:
  // Comments from other Users
});

const Item = model("Item", ItemSchema);

module.exports = Item;
