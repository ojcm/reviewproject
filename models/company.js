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
    reviewCount: {type: Number, default: 0},
    created: {type: Date, default: Date.now()}
});

companySchema.pre('validate', function (next) {
  this.reviewCount = this.reviews.length;
  next();
});

module.exports = mongoose.model("Company", companySchema);