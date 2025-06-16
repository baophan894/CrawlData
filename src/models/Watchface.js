const mongoose = require("mongoose");

const watchfaceSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  detailUrl: String,
  downloadLink: String,
});

module.exports = mongoose.model("Watchface", watchfaceSchema);
