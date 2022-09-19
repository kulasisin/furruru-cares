const express = require("express");
const Pet = require("../models/pet");
const router = express.Router();

//all pets route
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find({});
    res.render("pets/pets-index", { pets: pets });
    console.log(pets);
  } catch {
    res.redirect(`/`);
  }
});

//new pet route
router.get("/new", (req, res) => {
  res.render("pets/pets-new", { pet: new Pet() });
});

//create pet route
router.post("/", async (req, res) => {
  const pet = new Pet({
    name: req.body.name,
    breed: req.body.breed,
    status: req.body.status,
    birthday: req.body.birthday,
  });
  try {
    const newPet = await pet.save();
    res.redirect(`pets/`);
  } catch {
    res.render("pets/pets-new", {
      pet: pet,
      _errorMessage: "出現錯誤再請確認",
    });
  }
  // pet.save((err, newPet) => {
  //   if (err) {
  //     res.render("pets/pets-new", {
  //       pet: pet,
  //       errorMessage: "error",
  //     });
  //   } else {
  //     // res.redirect(`pets/${newAuthor.id}`)
  //     res.redirect(`pets/`);
  //   }
  // });
});

module.exports = router;
