const express = require("express");
const User = require("../models/User");
const Items = require("../models/Item");
const router = express.Router();
const uploadCloud = require("../configs/cloudinary");
const multer = require("multer");

//add info to user profile
// router.get("/:id", (req, res) => {
//   User.findbyId(reqs.params.id)
//     .populate("inventory")
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((err) => {
//       res.json(err);
//     });
// });

//edit user profile
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { username, bio, location, email, wishList } = req.body;
  User.findByIdAndUpdate(
    id,
    {
      username,
      bio,
      location,
      wishList,
      email,
      profileImgPath: req.body.profileImgPath,
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

router.post("/upload", uploadCloud.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

//return a specific user
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("inventory")
    .populate("messages")
    .then((user) => {
      if (!user) {
        res.status(404).json(user);
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

//get all users
router.get("/", (req, res) => {
  User.find()
    .populate("inventory")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.json(err);
    });
});

//delete a specific user AND the items connected to the user
router.delete("/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      return Item.deleteMany({ _id: { $in: user.inventory } }).then(() => {
        res.status(200).json({ message: "ok" });
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
