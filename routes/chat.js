const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Item = require("../models/Item");
const User = require("../models/User");

router.post("/", (req, res) => {
  const { userSend, userReceive, item, messages } = req.body;
  console.log("this params", req.body);
  Chat.create({
    userSend,
    userReceive,
    item,
    messages,
  })
    .then((chat) => {
      res.status(201).json(chat); //http status code 'created'
    })
    .catch((err) => {
      res.json(err);
    });
});

//return specific chat
router.get("/:id", (req, res) => {
  Chat.find({ $or: [{userReceive: req.params.id}, {userSend: req.params.id} ]}  )
    .populate("userSend")
    .populate("userReceive")
    .populate("item")
    .then((chat) => {
      if (!chat) {
        res.status(404).json(chat);
      } else {
       // console.log(chat)
        res.json(chat);
      }
    })
    .catch((err) => {
      res.json(err);
    });  
});


//Adds additional chat conversations
router.put("/", (req, res) => {

  console.log(req.body);

  const {messages, id} = req.body
  
  Chat.findByIdAndUpdate(
    id,
    {
      $push: { messages: messages }},
    { new: true } //to make sure we are getting  document AFTER updating it in the .then callback
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
