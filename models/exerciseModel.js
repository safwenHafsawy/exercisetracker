const mongoose = require("mongoose");
const { Schema } = mongoose;

const exerciseSchema = Schema({
  username: String,
  description: String,
  duration: Number,
  date: String,
  userID: String,
});

module.exports = mongoose.model("exerciseModel", exerciseSchema);
