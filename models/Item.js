const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  name: String,
  itemImg: String,
  type: {
    type: String,
    enum: ["Service", "Thing"],
  },

  category: {
    type: String,
    enum: ["Furniture", "Plants", "Food"],
  },
  description: String,
  status: {
    type: String,
    enum: ["Available", "Pending", "Sold"],
  },
  favourites: Number,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  // Optional:
  // Comments from other Users
});

const Item = model("Item", ItemSchema);

module.exports = Item;
