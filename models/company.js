var mongoose = require('mongoose');

var companySchema = new mongoose.Schema({
    name: String,
    address: String,
    category: String,
    description: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review'
    }],
    created: {type: Date, default: Date.now()}
});
module.exports = mongoose.model("Company", companySchema);