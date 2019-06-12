var express = require("express"),
    router  = express.Router(),
    Company = require("../models/company.js");
    
// ADMIN COMPANIES route
router.get("/companies", function(req, res){
    Company.find({}, function(err, companies){
        if (err){
            console.log("Error");
        } else {
            res.render("admin/companies/index", {companies:companies});
        }
    });
});

module.exports = router;