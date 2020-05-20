const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const User = require("../models/User"); //needed for .populate("owner")
const uploadCloud = require("../configs/cloudinary");
const multer = require("multer");

//add item
router.post("/upload", uploadCloud.single("itemImageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

router.post("/", (req, res) => {
  console.log("req body", req.body);
  console.log("req file", req.file);
  const {
    name,
    description,
    type,
    category,
    location,
    owner,
    favourites,
    status,
    itemImgPath,
  } = req.body;

  Item.create({
    name,
    description,
    location,
    type,
    category,
    owner,
    favourites,
    status,
    itemImgPath,
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
  // console.log("this is the id", req.params.id);
  Item.findById(req.params.id)
    .populate("owner")
    .then((item) => {
      if (!item) {
        res.status(404).json(item);
      } else {
        // console.log(item);
        res.json(item);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/", (req, res) => {
  console.log("got it", req.body);

  const {
    id,
    name,
    category,
    location,
    description,
    type,
    status,
    itemImgPath,
  } = req.body;

  Item.findByIdAndUpdate(
    id,
    {
      status,
      name,
      description,
      location,
      type,
      category,
      itemImgPath,
      //profileImgPath: req.body.profileImgPath,
    },
    { new: true } //to make sure we are getting  document AFTER updating it in the .then callback
  )
    .then((user) => {
      res.status(200).json(user);
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
      console.log(item);
      return User.findByIdAndUpdate(
        item.owner,
        {
          $pull: { inventory: id },
        },
        { new: true }
      )
        .populate("inventory")
        .then((user) => {
          res.status(200).json(user);
        });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
