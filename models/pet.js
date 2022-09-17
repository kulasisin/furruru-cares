const mongoose = require("mongoose");
const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("pet", petSchema);
