const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    profileImg: String,
    bio: String,
    wishList: [String],
    location: {
      type: String,
      enum: ["Prenzlauer Berg", "Mitte", "Kreuzberg"],
    },
    inventory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Items",
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
