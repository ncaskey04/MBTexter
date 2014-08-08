// setting up requires
var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    flash = require('connect-flash'),
    request = require('request'),
    async = require('async'),
    app = express();
    db = require('./models/index');

// Middleware for handling forms and ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// serves static files in public folder, like css
app.use(express.static(__dirname + '/public'));


// Set up cookieSession: encrypts and names cookies, sets timeout
app.use(cookieSession({
  secret: 'thisismysecretkey',
  name: 'Nicks cookie',
  maxage: 3600000
}));

// start passport, session, and flash
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// serialize function (store id at user login)
passport.serializeUser(function(user, done){
  console.log("SERIALIZE JUST RAN");
  done(null, user.id);
});

// deserialize function (check user id for login, if not logged in end session...cookie explodes)
passport.deserializeUser(function(id, done){
  console.log('deserialize just ran');
  db.user.find({
    where: {
      id: id,
    }
  }).complete(function (error, user){
    done(error, user);
  });
});


// INDEX ROUTES
app.get('/', function (req, res){
  if(!req.user){
  res.render('index');
  } else {
    res.render('home');
  }
});


// SIGNUP ROUTES
app.get('/signup', function (req,res){
  if(!req.user){
    res.render('signup', {username: ""});
  } else {
    res.render('home');
  }
});

// create new user on sign up using form values
app.post('/signup', function (req,res){
  db.user.createNewUser(req.body.email, req.body.username, req.body.password, function(err){
    res.render('signup',{message: err.message, email: req.body.email,username: req.body.username});
  },
  function(success){
    res.render('index', {message: success.message});
  }); // end success message
});


// LOGIN ROUTES
app.get('/login', function (req,res){
  if(!req.user){
    res.render('login', {message: req.flash('Please log in'), username: ""});
  } else {
  res.render('home');
  }
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}));


// HOME ROUTES
app.get('/home', function (req,res){
  res.render('home', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
    });
});

// API data handler
app.get("/submit", function (req,res){

  var query = req.query.inputURL;
  var ieUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Attitude/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=" + query + "&output=json";
  var snUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Perceiving%20Function/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=" + query + "&output=json";
  var tfUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Judging%20Function/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=" + query + "&output=json";
  var jpUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Lifestyle/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=" + query + "&output=json";

    // refactored api request using async
    async.map([
        ieUrl,
        snUrl,
        tfUrl,
        jpUrl
      ], 
      function (url, done){
        request(url, function (error,response,body){
          var data = JSON.parse(body);
          done(null, data);
        });
      }, 
      function(err, results){
        
        var attitude = results[0].cls1,
            perceiving = results[1].cls1,
            judging = results[2].cls1,
            lifestyle = results[3].cls1,
            result = "";

            if(attitude.Introversion > attitude.Extraversion){
              result += "I";
            } else { result += "E"; }

            if(perceiving.Sensing > perceiving.iNtuition){
              result += "S";
            } else { result += "N"; }

            if(judging.Thinking > judging.Feeling) {
              result += "T";
            } else { result += "F"; }

            if(lifestyle.Judging > lifestyle.Perceiving){
              result += "J";
            } else { result += "P"; }
              console.log(attitude, perceiving, judging, lifestyle, result);
            res.render('results', {
              classification: result,
              isAuthenticated: req.isAuthenticated() 
            });
        }
    ); // ends async function
}); // ends app.get for Home Route


// RESULTS ROUTES
app.get('/results', function (req,res){
  res.render('results', {
    isAuthenticated: req.isAuthenticated(),
    user: req.user
  });
});


// LOGOUT ROUTE
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});


// 404 ROUTE
app.get('*', function (req, res){
  res.status(404);
  res.render('404');
});


// SERVER LISTENING EVENT
app.listen(process.env.PORT || 3000, function (req,res){
	console.log('SERVER IS STARTING UP!');
});
