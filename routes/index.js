const express = require("express");
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  //res.send('API is working');
  res.render("index");
});

module.exports = router;
