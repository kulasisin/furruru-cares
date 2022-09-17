const express = require("express");
const router = express.Router();
const pet = require("../models/pet");

//all pets route
router.get("/", (req, res) => {
  res.render("pets/pets-index");
});

//new pet route
router.get("/new", (req, res) => {
  res.render("pets/pets-new");
});

//create pet route
router.post("/", (req, res) => {
  res.send("Create");
});

module.exports = router;
