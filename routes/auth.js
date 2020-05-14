const bcrypt = require("bcryptjs");
const express = require("express");
const passport = require("passport");
const authRoutes = express.Router();
const User = require("../models/User");

authRoutes.post("/signup", (req, res) => {
  const { username, password } = req.body;
  // console.log("this is req.body", req.body);
  console.log("this is the password", password);
  if (!password || password.length < 8) {
    return res
      .status(400)
      .json({ message: "Your password must be 8 char. min." });
  }
  if (!username) {
    return res.status(400).json({ message: "Your username cannot be empty" });
  }

  User.findOne({ username: username })
    .then((found) => {
      if (found) {
        return res
          .status(400)
          .json({ message: "This username is already taken" });
      }

      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      return User.create({ username: username, password: hash }).then(
        (dbUser) => {
          req.login(dbUser, (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error while attempting to login" });
            }
            res.json(dbUser);
          });
        }
      );
    })
    .catch((err) => {
      res.json(err);
    });
});

authRoutes.post("/login", (req, res) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error while attempting to login" });
      }
      return res.json(user);
    });
  })(req, res);
});

authRoutes.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

// returns the logged in user
authRoutes.get("/loggedin", (req, res) => {
  res.json(req.user);
});

module.exports = authRoutes;
