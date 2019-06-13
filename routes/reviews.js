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
    console.log("CREATE ROUTE");
    Company.findById(req.params.id, function(err, company){
        if (err) {
            console.log(err);
            res.redirect("/companies/" + req.params.id + "/reviews/new");
        } else {
            Review.create(req.body.review, function(err, newReview){
                if (err) {
                  res.render("reviews/new");
                  console.log("ERROR");
                } else {
                    console.log(newReview);
                    company.reviews.push(newReview);
                    company.save();
                  res.redirect("/companies/" + req.params.id);
                }
            });
        }
    })
});

// EDIT route
router.get("/:reviewid/edit", function(req, res){
    // find review in DB
    Review.findById(req.params.reviewid, function(err, foundReview){
        if (err) {
            console.log("ERROR");
            res.redirect("/companies/" + req.params.id);
        } else {
            res.render("reviews/edit", {review: foundReview, company_id: req.params.id});
        }
    });
});

// UPDATE route
router.put("/:reviewid", function(req, res){
    Review.findByIdAndUpdate(req.params.reviewid, req.body.review, function(err, foundReview){
        if (err) {
            console.log("ERROR");
            res.redirect("/companies/" + req.params.id);
        } else {
            res.redirect("/companies/" + req.params.id);
        }
    });
});

// DESTROY route
router.delete("/:reviewid", function (req, res){
    // Find and delete by id
    Review.findByIdAndRemove(req.params.reviewid, function(err){
       if (err) {
           console.log("ERROR");
           res.redirect("/companies" + req.params.id);
       } else {
           res.redirect("/companies" + req.params.id);
       }
    });
});

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;