var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    rating: Number,
    created: {type: Date, default: Date.now()}
});
module.exports = mongoose.model("Review", reviewSchema);