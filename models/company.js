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
    ratingOverall: {type: Number, default: 0},
    ratingPay: {type: Number, default: 0},
    ratingAtmosphere: {type: Number, default: 0},
    ratingStaff: {type: Number, default: 0},
    ratingSafety: {type: Number, default: 0},
    ratingAccomodation: {type: Number, default: 0},
    created: {type: Date, default: Date.now()}
});

companySchema.index({name: 'text', address: 'text', suburb: 'text', state: 'text'}); //, {name: 'blah', weights: {name: 400, address: 300, suburb: 200, state: 100}});

module.exports = mongoose.model("Company", companySchema);