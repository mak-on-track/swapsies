const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
    profileImgName: String,
    profileImgPath: String,
    bio: String,
    wishList: [],
    location: String,
    inventory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat",
      },
    ],
    favourites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Items",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
