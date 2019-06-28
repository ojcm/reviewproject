var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require('mongoose'),
    methodOverride   = require('method-override'),
    expressSanitizer = require('express-sanitizer'),
    seedDB           = require("./seed"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    User             = require("./models/user"),
    flash            = require("connect-flash");
      
var companyRoutes    = require("./routes/companies"),
    reviewRoutes     = require("./routes/reviews"),
    indexRoutes      = require("./routes/index"),
    feedbackRoutes   = require("./routes/feedback");

mongoose.connect("mongodb://localhost:27017/reviewsite", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(flash());

// seedDB();

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

// Pass current user and err/success messages to every route.
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/companies/", companyRoutes);
app.use("/companies/:id/reviews", reviewRoutes);
app.use("/", indexRoutes);
app.use("/feedback/", feedbackRoutes);

app.get("/", function(req, res){
    res.render("landing");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Company Server has started.")
});
