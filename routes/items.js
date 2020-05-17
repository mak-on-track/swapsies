const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const User = require("../models/User"); //needed for .populate("owner")

//add item
router.post("/", (req, res) => {
  const {
    name,
    description,
    type,
    category,
    location,
    owner,
    favourites,
    status,
  } = req.body;

  //Can add required logic here

  Item.create({
    name,
    description,
    location,
    type,
    category,
    owner,
    favourites,
    status,
  })
    .then((item) => {
      console.log(`adding item to user: ${item}`);
      User.findByIdAndUpdate(
        item.owner,
        { $push: { inventory: item } },
        { new: true }
      ).then((user) => {
        console.log(user);
        res.status(201).json(user);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

//return all items
router.get("/", (req, res) => {
  Item.find()
    .populate("owner")
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

//delete specific item
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id)
    .then((item) => {
      return User.findByIdAndUpdate(item.owner, { $pull: { user: id } }).then(
        () => {
          res.status(200).json({ message: "ok" });
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
