var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require('mongoose'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    Review           = require("./models/review"),
    Company          = require("./models/company"),
    seedDB           = require("./seed");

mongoose.connect("mongodb://localhost:27017/reviewsite", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

seedDB();

app.get("/", function(req, res){
    console.log("Render landing");
    res.render("landing");
});

// INDEX route
app.get("/companies", function(req, res){
    Company.find({}, function(err, companies){
        if (err){
            console.log("Error");
        } else {
            res.render("companies/index", {companies:companies});
        }
    });
});

// NEW route
app.get("/companies/new", function(req, res){
    res.render("companies/new");
});

// CREATE route
app.post("/companies", function(req, res){
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
app.get("/companies/:id", function(req, res){
    // find company in DB
    Company.findById(req.params.id, function(err, foundCompany){
        if (err) {
            console.log("ERROR");
            res.redirect("/companies");
        } else {
            res.render("companies/show", {company: foundCompany});
        }
    });
});

// EDIT route
app.get("/companies/:id/edit", function(req, res){
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
app.put("/companies/:id", function(req, res){
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
app.delete("/companies/:id", function (req, res){
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

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Company Server has started.")
});
