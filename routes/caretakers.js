const express = require("express");
const mongoose = require("mongoose");
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewURLparser: true,
});
const Caretakers = require("../models/caretaker");
const Careselect = require("../public/js/moreinfo");
const router = express.Router();
//all pets route
router.get("", async (req, res) => {
  try {
    const caretakers = await Caretakers.find({});

    res.render("caretakers", { caretakers: caretakers });
  } catch {
    res.redirect(``);
  }
});

//每個服務的資訊頁的連結建置
router.get("/:id", async (req, res) => {
  const caretaker = await Caretakers.find({ id: req.params.id });
  console.log(req.params.id);
  console.log(caretaker);
  let newcaretaker = caretaker[0];
  newcaretaker.clicked += 1;
  console.log(newcaretaker);
  await newcaretaker.save();
  res.render("caretaker-page", { caretaker: caretaker[0] });
});
module.exports = router;
