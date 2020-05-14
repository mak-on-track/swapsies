const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ChatSchema = new Schema(
  {
    subject: String,
    participant1: { type: Schema.Types.ObjectId, ref: "User" },
    participant2: { type: Schema.Types.ObjectId, ref: "User" },
   /*  type: {enum[("Service", "Item")], */
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        msg: String,
        time: { type: Date, default: Date.now },
      },
    ],
  }
  // {
  //   timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, //to be able to sort by most recent messaage
  // }
);

const Chat = model("Chat", ChatSchema);

module.exports = Chat;
