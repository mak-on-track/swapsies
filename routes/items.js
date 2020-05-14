const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const owner = req.user._id;

  Item.create({
    name,
    description,
    owner,
  });
});

module.exports = router;
