const express = require("express");
const User = require("../models/User");
const Items = require("../models/Item");
const router = express.Router();

//get all items posted by a user
router.get("/:id", (req, res) => {
  User.findbyId(reqs.params.id)
    .populate("inventory")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
