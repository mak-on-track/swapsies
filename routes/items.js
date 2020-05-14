const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const User = require("../models/User"); //needed for .populate("owner")

//add item
router.post("/", (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  //const owner = req.body.owner;
  Item.create({
    name,
    description,
  })
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((err) => {
      res.json(err);
    });
});

//return all items
router.get("/", (req, res) => {
  Item.find()
    //populate("owner") //need this step because otherwise it will only return a list of ids
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.json(err);
    });
});

//return specific item
router.get("/:id", (req, res) => {
  console.log("this is the id", req.params.id);
  Item.findById(req.params.id)
    .then((item) => {
      if (!item) {
        res.status(404).json(item);
      } else {
        res.json(item);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//edit a specific item
router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  console.log(req.body, "this is the req.body");
  console.log(req.params.id, "this is the id");
  Item.findByIdAndUpdate(
    req.params.id,
    { name, description },
    { new: true } //to make sure we are getting  document AFTER updating it in the .then callback
  )
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
