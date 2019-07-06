var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

var companySchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    suburb: {type: String, required: true},
    state: {type: String, required: true},
    postalcode: {type: String, required: true},
    category: {type: String, required: true},
    valid417: {type: String, required: true}, // Yes, No, Unknown
    valid462: {type: String, required: true}, // Yes, No, Unknown 
    description: {type: String, required: true},
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