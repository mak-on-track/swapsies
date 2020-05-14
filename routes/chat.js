// const express = require("express");
// const router = express.Router();
// const Chat = require("../models/Chat");
// const Item = require("../models/Item");

// router.post("/", (req, res) => {
//   const subject = req.body.subject;
//   const messages = req.body.messages;

//   Chat.create({
//     subject,
//     messages,
//   })
//     .then((chat) => {
//       res.status(201).json(chat); //http status code 'created'
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

// module.exports = router;
