const express = require('express');
const router  = express.Router();
const Item    = require('../models/Item');

router.post('/', (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const owner = req.user._id;
})

Item.create({
  title,
  description,
  owner,
})
