const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: String,
    type: String,
    resident: String,
    worker_name: String,
    worker_id: String,
});

module.exports = mongoose.model("item", ItemSchema);