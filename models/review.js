var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    body: {type: String, required: true},
    imageUrls: [String],
    ratingOverall: {type: Number}, 
    ratingPay: {type: Number, required: true},
    ratingAtmosphere: {type: Number, required: true},
    ratingStaff: {type: Number, required: true},
    ratingSafety: {type: Number, required: true},
    ratingAccomodation: {type: Number},
    hoursPerWeek: Number,
    daysPerWeek: Number,
    salary: Number,
    salaryRate: String, // perDay, perHour, perWeek
    accomodationProvided: Boolean,
    accomodationCost: Number,
    accomodationCostRate: String, // perNight, perWeek
    created: {type: Date, default: Date.now()}
});

// reviewSchema.pre('validate', function (next) {
//     var ratingTotal = (this.ratingPay + this.ratingAtmosphere + 
//                       this.ratingStaff + this.ratingSafety);
//     var ratingFields = 4;
//     if (this.ratingAccomodation){
//         ratingTotal += this.ratingAccomodation;
//         ratingFields += 1;
//     }
//     this.ratingOverall = (ratingTotal / ratingFields);
//     next();
// }); 

module.exports = mongoose.model("Review", reviewSchema);