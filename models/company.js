var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

var companySchema = new mongoose.Schema({
    name: String,
    address: String,
    suburb: String,
    state: String,
    postalcode: String,
    category: String,
    description: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review'
    }],
    reviewCount: {type: Number, default: 0},
    created: {type: Date, default: Date.now()}
});

companySchema.index({name: 'text'});

companySchema.pre('validate', function (next) {
  this.reviewCount = this.reviews.length;
  next();
});

module.exports = mongoose.model("Company", companySchema);