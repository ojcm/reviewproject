var express = require("express"),
    router  = express.Router(),
    Company = require("../models/company.js");

// INDEX route
router.get("/", function(req, res){
    var filter = {};
    if (req.query.search) {
        filter.name = { $regex: ".*" + req.query.search + ".*", "$options": "i" };
    }
    if (req.query.category) {
        filter.category = req.query.category;
    }
    if (req.query.suburb) {
        filter.suburb = req.query.suburb;
    }
    if (req.query.state) {
        filter.state = req.query.state;
    }
    if (req.query.postalcode) {
        filter.postalcode = req.query.postalcode;
    }
    Company.find(filter, function(err, companies){
        if (err){
            console.log(err);
        } else {
            res.render("companies/index", {companies:companies, searchValue: req.query.search});
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
            console.log(err);
            req.flash("error", "Error creating company. Please try again.");
            res.render("companies/new");
        } else {
            req.flash("success", "New company created.");
            res.redirect("/companies");
        }
    });
});

// SHOW route
router.get("/:id", function(req, res){
    // find company in DB
    Company.findById(req.params.id).populate("reviews").exec(function(err, foundCompany){
        if (err) {
            console.log(err);
            res.redirect("/companies");
        } else {
            res.render("companies/show", {company: foundCompany});
        }
    });
});

// // EDIT route
// router.get("/:id/edit", function(req, res){
//     // find review in DB
//     Company.findById(req.params.id, function(err, foundCompany){
//         if (err) {
//             console.log(err);
//             res.redirect("/companies/" + req.params.id);
//         } else {
//             res.render("companies/edit", {company: foundCompany});
//         }
//     });
// });

// // UPDATE route
// router.put("/:id", function(req, res){
//     Company.findByIdAndUpdate(req.params.id, req.body.company, function(err, foundCompany){
//         if (err) {
//             console.log(err);
//             res.redirect("/companies/");
//         } else {
//             res.redirect("/companies/" + req.params.id);
//         }
//     });
// });

// // DESTROY route
// router.delete("/:id", function (req, res){
//     // Find and delete by id
//     Company.findByIdAndRemove(req.params.id, function(err){
//       if (err) {
//           console.log(err);
//           res.redirect("/companies");
//       } else {
//           res.redirect("/companies");
//       }
//     });
// });

// Middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;