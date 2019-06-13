var express = require("express"),
    router  = express.Router(),
    Company = require("../models/company.js");

// INDEX route
router.get("/", function(req, res){
    Company.find({}, function(err, companies){
        if (err){
            console.log("Error");
        } else {
            res.render("companies/index", {companies:companies});
        }
    });
});

// NEW route
router.get("/new", function(req, res){
    res.render("companies/new");
});

// CREATE route
router.post("/", function(req, res){
    Company.create(req.body.company, function(err, company){
        if (err) {
          res.render("companies/new");
          console.log("ERROR");
        } else {
          res.redirect("/companies");
        }
    });
});

// SHOW route
router.get("/:id", function(req, res){
    // find company in DB
    Company.findById(req.params.id).populate("reviews").exec(function(err, foundCompany){
        if (err) {
            console.log("ERROR");
            res.redirect("/companies");
        } else {
            res.render("companies/show", {company: foundCompany});
        }
    });
});

// EDIT route
router.get("/:id/edit", function(req, res){
    // find review in DB
    Company.findById(req.params.id, function(err, foundCompany){
        if (err) {
            console.log("ERROR");
            res.redirect("/companies/" + req.params.id);
        } else {
            res.render("companies/edit", {company: foundCompany});
        }
    });
});

// UPDATE route
router.put("/:id", function(req, res){
    Company.findByIdAndUpdate(req.params.id, req.body.company, function(err, foundCompany){
        if (err) {
            console.log("ERROR");
            res.redirect("/companies/");
        } else {
            res.redirect("/companies/" + req.params.id);
        }
    });
});

// DESTROY route
router.delete("/:id", function (req, res){
    // Find and delete by id
    Company.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           console.log("ERROR");
           res.redirect("/companies");
       } else {
           res.redirect("/companies");
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