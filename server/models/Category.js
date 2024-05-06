const mongoose = require("mongoose");

const CategSchema = new mongoose.Schema({
  nameCategory: {
    type: String,
    default: "all",
  },
  color: {
    type: String,
    default: "green",
  }
});

module.exports = mongoose.model("Category", CategSchema);
