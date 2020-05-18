const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ChatSchema = new Schema(
  {
    subject: String,
    userSend: { type: Schema.Types.ObjectId, ref: "User" },
    UserReceive: { type: Schema.Types.ObjectId, ref: "User" },
    item: { type: Schema.Types.ObjectId, ref: "Item" },
    messages: [
      {
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
