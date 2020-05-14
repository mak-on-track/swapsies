const express = require("express");
const User = require("../models/User");
const Items = require("../models/Item");
const router = express.Router();

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
  const { username, profileImg, bio, location, wishList } = req.body;
  console.log(req.body, "this is the req.body");
  console.log(req.params.id, "this is the id");
  User.findByIdAndUpdate(
    id,
    { username, profileImg, bio, location, wishList },
    { new: true } //to make sure we are getting  document AFTER updating it in the .then callback
  )
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
});

//return a specific user
router.get("/:id", (req, res) => {
  console.log("this is the id", req.params.id);
  User.findById(req.params.id)
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

//delete a specific user AND the items connected to the user (line 57-58)
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
