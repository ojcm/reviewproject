var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");
    // mongoose   = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/reviewsite", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", function(req, res){
    console.log("Render landing");
    res.render("landing");
});

// INDEX route
app.get("/reviews", function(req, res){
    res.send("REVIEWS");
});

// NEW route
app.get("/reviews/new", function(req, res){
    res.send("NEW FORM");
});

// CREATE route
app.post("/reviews", function(req, res){
    // store new review in DB
    
    // show all reviews
    res.redirect("/reviews");
});

// SHOW route
app.get("/reviews/:id", function(req, res){
    // find review in DB
    var review = null;
    
    // show review
    res.render("show", {review:review});
});

// EDIT route
app.get("/review/:id/edit", function(req, res){
    // find review in DB
    
    // show review edit form
    res.show("edit", {review: review});
});

// UPDATE route
app.put("/review/:id", function(req, res){
    // find review in DB
    
    // update with data from form
    
    // show review
    res.render("show", {review: review});
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Review Server has started.")
});
