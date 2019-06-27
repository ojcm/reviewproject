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
            res.render("feedback/new");
        } else {
            res.redirect("/companies");
        }
    });
});

module.exports = router;