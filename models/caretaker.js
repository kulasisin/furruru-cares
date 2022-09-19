const mongoose = require("mongoose");
const caretakerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: false,
  },
  pic: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  distance: {
    type: String,
    required: false,
  },
  service: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  commentNumber: {
    type: Number,
    required: false,
  },
  tag: {
    type: String,
    required: false,
  },
  clicked: {
    type: Number,
    require: false,
  },
});

module.exports = mongoose.model("caretaker", caretakerSchema);
