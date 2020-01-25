const mongoose = require("mongoose");

const ResidentSchema = new mongoose.Schema({
  name: String,
  parcelHistory: [String],
});

// compile model from schema
module.exports = mongoose.model("resident", ResidentSchema);