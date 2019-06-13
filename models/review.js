var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: String,
    body: String,
    image: String,
    rating: Number,
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Review", reviewSchema);