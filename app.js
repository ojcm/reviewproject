var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose         = require('mongoose'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer');

var Review = require("./models/review");

// mongoose.connect("mongodb://localhost:27017/reviewsite", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function(req, res){
    console.log("Render landing");
    res.render("landing");
});

// INDEX route
app.get("/reviews", function(req, res){
    Review.find({}, function(err, reviews){
        if (err){
            console.log("Error");
        } else {
            res.render("index", {reviews:reviews});
        }
    });
});

// NEW route
app.get("/reviews/new", function(req, res){
    res.render("new");
});

// CREATE route
app.post("/reviews", function(req, res){
   req.body.review.body = req.sanitize(req.body.review.body);
   Review.create(req.body.review, function(err, review){
       if (err) {
           res.render("new");
           console.log("ERROR");
       } else {
           res.redirect("/reviews");
       }
   });
});

// SHOW route
app.get("/reviews/:id", function(req, res){
    // find review in DB
    Review.findById(req.params.id, function(err, foundReview){
        if (err) {
            console.log("ERROR");
            res.redirect("/reviews");
        } else {
            res.render("show", {review: foundReview});
        }
    });
});

// EDIT route
app.get("/reviews/:id/edit", function(req, res){
    // find review in DB
    Review.findById(req.params.id, function(err, foundReview){
        if (err) {
            console.log("ERROR");
            res.redirect("/reviews/" + req.params.id);
        } else {
            res.render("edit", {review: foundReview});
        }
    });
});

// UPDATE route
app.put("/reviews/:id", function(req, res){
    req.body.review.body = req.sanitize(req.body.review.body);
    Review.findByIdAndUpdate(req.params.id, req.body.review, function(err, foundReview){
        if (err) {
            console.log("ERROR");
            res.redirect("/reviews/");
        } else {
            res.redirect("/reviews/" + req.params.id);
        }
    });
});

// DESTROY route
app.delete("/reviews/:id", function (req, res){
    // Find and delete by id
    Review.findByIdAndRemove(req.params.id, function(err){
       if (err) {
           console.log("ERROR");
           res.redirect("/reviews");
       } else {
           res.redirect("/reviews");
       }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Review Server has started.")
});
