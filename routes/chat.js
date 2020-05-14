const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const Item = require("../models/Item");

router.post("/", (req, res) => {
  const subject = req.body.subject;

  Chat.create({
    subject,
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
  console.log("this is the id", req.params.id);
  Chat.findById(req.params.id)
    .then((chat) => {
      if (!chat) {
        res.status(404).json(chat);
      } else {
        res.json(chat);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
