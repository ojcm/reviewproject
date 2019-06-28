var express = require("express"),
    router  = express.Router(),
    Feedback = require("../models/feedback.js");

//==========================
// FEEDBACK ROUTES
//==========================
router.get("/new", function(req, res) {
    res.render("feedback/new");
});

router.post("/", function(req, res){
    Feedback.create(req.body.feedback, function(err, feedback){
        if (err) {
            console.log(err);
            req.flash("error", "Error submitting feedback. Please try again.");
            res.render("feedback/new");
        } else {
            req.flash("success", "Thank you for your feedback.");
            res.redirect("/companies");
        }
    });
});

module.exports = router;