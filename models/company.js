var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

var companySchema = new mongoose.Schema({
    name: String,
    address: String,
    suburb: String,
    state: String,
    postalcode: String,
    category: String,
    valid417: String, // Yes, No, Unknown
    valid462: String, // Yes, No, Unknown 
    description: String,
    reviews: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Review'
    }],
    reviewCount: {type: Number, default: 0},
    created: {type: Date, default: Date.now()}
});

companySchema.index({name: 'text', address: 'text', suburb: 'text', state: 'text'}); //, {name: 'blah', weights: {name: 400, address: 300, suburb: 200, state: 100}});

companySchema.pre('validate', function (next) {
  this.reviewCount = this.reviews.length;
  next();
});

module.exports = mongoose.model("Company", companySchema);