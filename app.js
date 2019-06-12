var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require('mongoose'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    seedDB           = require("./seed"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    User             = require("./models/user");
      
var companyRoutes    = require("./routes/companies");

mongoose.connect("mongodb://localhost:27017/reviewsite", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "ObviouslyThisIsntTheSecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass current user to every route.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/companies/", companyRoutes);

app.get("/", function(req, res){
    console.log("Render landing");
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Company Server has started.")
});
