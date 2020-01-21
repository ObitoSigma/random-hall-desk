const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
    tracking: String,
    worker_name: String,
    worker_id: String,
});

module.exports = mongoose.model("parcel", ParcelSchema);