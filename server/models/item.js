const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    title: String,
    category: String,
    resident: String,
    worker_name: String,
    worker_id: String,
    available: Boolean,
});

module.exports = mongoose.model("item", ItemSchema);