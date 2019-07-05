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

reviewSchema.pre('validate', function(next){
   var numRatings = 4;
   var totalRating = (this.ratingPay + this.ratingAtmosphere + this.ratingStaff + this.ratingSafety);
   if (this.accomodationProvided) {
       totalRating += this.ratingAccomodation;
       numRatings += 1;
   }
   this.ratingOverall = Math.round(2*totalRating / numRatings)/2;
   next(); 
});

module.exports = mongoose.model("Review", reviewSchema);