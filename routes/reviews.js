var express = require("express"),
    router  = express.Router({mergeParams: true}),
    Company = require("../models/company.js"),
    Review  = require("../models/review.js");

// NEW route
router.get("/new", function(req, res){
    Company.findById(req.params.id, function(err, foundCompany){
        if (err) {
            console.log(err);
        } else {
            res.render("reviews/new", {company: foundCompany});
        }
    });
});

// CREATE route
router.post("/", function(req, res){
    var dataComplete = true;
    var error_message = "";
    if ((req.body.review.ratingPay == "" || 
         req.body.review.ratingAtmosphere == "" || 
         req.body.review.ratingStaff == "" ||
         req.body.review.ratingSafety == "")) {
        dataComplete = false;
        error_message = "Please add ratings and try again.";
    } else if (req.body.review.accomodationProvided == "") {
        dataComplete = false;
        error_message = "Please add accomodation details and try again.";
    } else if (req.body.review.accomodationProvided == "1" &&
               (req.body.review.accomodationCost == "" ||
                req.body.review.accomodationCostRate == "" ||
                req.body.review.ratingAccomodation == "")) {
        dataComplete = false;
        error_message = "Please complete accomodation details and try again.";
    }
    
    if (!dataComplete) {
        req.flash("error", error_message);
        res.redirect("/companies/" + req.params.id + "/reviews/new");
    } else {
        Company.findById(req.params.id, function(err, company){
            if (err) {
                req.flash("error", "Error submitting review. Please try again.");
                console.log(err);
                res.redirect("/companies/" + req.params.id + "/reviews/new");
            } else {
                Review.create(req.body.review, function(err, newReview){
                    if (err) {
                        console.log(err);
                        req.flash("error", "Error submitting review. Please try again.");
                        res.redirect("/companies/" + req.params.id + "/reviews/new");
                    } else {
                        company.reviews.push(newReview);
                        updateCompanyRatings(company, newReview);
                        company.save();
                        req.flash("success", "Review submitted.");
                        res.redirect("/companies/" + req.params.id);
                    }
                });
            }
        });
    }
});

// EDIT route
// router.get("/:reviewid/edit", function(req, res){
//     // find review in DB
//     Review.findById(req.params.reviewid, function(err, foundReview){
//         if (err) {
//             console.log(err);
//             res.redirect("/companies/" + req.params.id);
//         } else {
//             res.render("reviews/edit", {review: foundReview, company_id: req.params.id});
//         }
//     });
// });

// UPDATE route
// router.put("/:reviewid", function(req, res){
//     Review.findByIdAndUpdate(req.params.reviewid, req.body.review, function(err, foundReview){
//         if (err) {
//             console.log(err);
//             res.redirect("/companies/" + req.params.id);
//         } else {
//             res.redirect("/companies/" + req.params.id);
//         }
//     });
// });

// DESTROY route
// router.delete("/:reviewid", function (req, res){
//     // Find and delete by id
//     Review.findByIdAndRemove(req.params.reviewid, function(err){
//       if (err) {
//           console.log(err);
//           res.redirect("/companies" + req.params.id);
//       } else {
//           res.redirect("/companies" + req.params.id);
//       }
//     });
// });

function updateCompanyRatings(company, review){
    company.ratingOverall    = ((company.ratingOverall * company.reviewCount) + review.ratingOverall) / 
                               (company.reviewCount + 1);
    company.ratingPay        = ((company.ratingPay * company.reviewCount) + review.ratingPay) / 
                               (company.reviewCount + 1);
    company.ratingAtmosphere = ((company.ratingAtmosphere * company.reviewCount) + review.ratingAtmosphere) / 
                               (company.reviewCount + 1);
    company.ratingStaff      = ((company.ratingStaff * company.reviewCount) + review.ratingStaff) / 
                               (company.reviewCount + 1);
    company.ratingSafety     = ((company.ratingSafety * company.reviewCount) + review.ratingSafety) / 
                               (company.reviewCount + 1);
    
    // company.ratingAccomodation = ((company.ratingAccomodation * company.ratingAccomodationCount) + newReview.ratingAccomodation) / company.ratingAccomodationCount + 1;
    
    company.reviewCount = company.reviews.length;
}

module.exports = router;