const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ItemSchema = new Schema({
  name: String,
  img: String,
/*   type: enum[("Service", "Item")],
 *//*   category: enum[("Furniture", "Plants", "Food")],
 */  description: String,
/*   status: enum[("Available", "Pending", "Sold")],
 */  favourites: Number,
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  // Optional:
  // Comments from other Users
});

const Item = model("Item", ItemSchema);

module.exports = Item;
