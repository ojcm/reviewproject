var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");
    // mongoose   = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/reviewsite", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("*", function(req, res){
    console.log("Render landing")
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Review Server has started.")
});