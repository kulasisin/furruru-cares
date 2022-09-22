const express = require("express");
const Pet = require("../models/pet");
const router = express.Router();

//user route
router.get("/", checkAuthenticated, (req, res) => {
  res.render("user-pages/user");
});

//pets route
router.get("/pets", (req, res) => {
  res.render("pets/pets-index", { pet: new Pet() });
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
});
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/login");
}
module.exports = router;
