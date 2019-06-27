var mongoose = require("mongoose");

var feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model("Feedback", feedbackSchema);