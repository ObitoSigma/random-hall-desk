const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
    tracking: String,
    resident: String,
    worker_name: String,
    worker_id: String,
    delivered: Boolean,
});

module.exports = mongoose.model("parcel", ParcelSchema);