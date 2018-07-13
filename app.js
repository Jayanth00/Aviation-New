var express     = require("express"),
    app         = express(),
    passport = require("passport"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
     User = require("./models/auth"),
     Flight=require("./models/model"),
     Ticket=require("./models/ftype");
    mongoose.connect("mongodb://localhost:27017/aviation");

 app.use(express.static(__dirname + "/public"));
 
 app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret: "Rusty",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.get("/", function(req, res){
    res.render("home");
});


// var array=[
//     {
//      image:"asia.png",
//  	name1:"G8-503",
//  	name2:"Air Asia",
//  	arrival:"Canada",
//  	arrtime:"18:40",
//  	departure:"Delhi",
//  	deptime:"19:10",
//     duration:"24h 30m",
//     detail:"Non Stop",
//  	price:"Rs 35500"
//     },
//     {
//     image:"airindia.png",
//   	name1:"G8-503",
//  	name2:"Air India",
//  	arrival:"Canada",
//  	arrtime:"20:40",
//  	departure:"Delhi",
//  	deptime:"21:10",
//     duration:"24h 30m",
//     detail:"Non Stop",
//  	price:"Rs 32500"

//     },
//     {
//      image:"emirates.jpg",
//  	name1:"G8-503",
//  	name2:"Fly Emirates",
//  	arrival:"Canada",
//  	arrtime:"21:40",
//  	departure:"Delhi",
//  	deptime:"22:10",
//     duration:"24h 30m",
//     detail:"Non Stop",
//  	price:"Rs 28500"
//     },
//     {
//      image:"airindia.png",
//  	name1:"G8-503",
//  	name2:"Air India",
//  	arrival:"Canada",
//  	arrtime:"10:40",
//  	departure:"Delhi",
//  	deptime:"7:20",
//     duration:"20h 40m",
//     detail:"Non Stop",
//  	price:"Rs 52500"
//     },
//     {
//      image:"british.png",
//  	name1:"G8-503",
//  	name2:"British airways",
//  	arrival:"Canada",
//  	arrtime:"21:40",
//  	departure:"Delhi",
//  	deptime:"22:30",
//     duration:"24h 50m",
//     detail:"Non Stop",
//  	price:"Rs 42500"
//     }
//     ];
    
    
// Flight.create(array,function(err, flight){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED Service: ");
//           console.log(flight);
//       }
//     });

// app.get("/booking",function(req,res){
// 	res.render("flight");
// });


//  ===========
// AUTH ROUTES
//  ===========


//}
app.get("/final",function(req, res) {
   res.render("final"); 
});
app.get("/details",function(req,res){
    res.render("details");
});
app.post("/details", function(req, res){
    var name1 = req.body.arrival;
	var name2= req.body.departure;
	console.log(name1);
    Flight.find({arrival:name2,departure:name1}, function(err, allFlights){
      if(err){
          console.log(err);
      } else {
          res.render("flight",{flights:allFlights});
      }
    });
});

app.get("/register", function(req, res){
   res.render("register"); 
});
app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/details"); 
        });
    });
});
// app.get("/flight",function(req,res){
// 	var name1 = req.body.arrival;
// 	var name2= req.body.departure;
// 	console.log
//  Flight.find({arrival:name1,departure:name2}, function(err, allFlights){
//       if(err){
//           console.log(err);	
//       } else {
//           res.render("flight",{flights:allFlights});
//       }
//     });

// });
app.get("/login",function(req,res){
	res.render("login");

});
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/details",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res){
   req.logout();
   res.redirect("/home");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




app.listen(8000, function(){
   console.log("The Aviation Server Has Started!");
});








