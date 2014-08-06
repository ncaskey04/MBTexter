// setting up requires
var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    flash = require('connect-flash'),
    request = require('request'),
    app = express();
    // db = require('./models/index');

// Middleware for handling forms and ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


// Set up cookieSession: encrypts and names cookies, sets timeout


// start passport, session, and flash


// serialize function (store id at user login)


// deserialize function (check user id for login, if not logged in end session...cookie explodes)


// INDEX ROUTES
app.get('/', function (req, res){
  res.render('index');
});


// HOME ROUTES
app.get('/submit', function (req,res){

  //console.log(req.query.inputURL);
  var query = req.query.inputURL;
//  var jpUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Lifestyle/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url= " + query + " &output=json";
  var jpUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Lifestyle/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=vajrapani666.tumblr.com&output=json";

  //var result = '{"version": "1.00","success": true,"statusCode": 2000, "errorMessage": "","cls1": {"Judging": 0.420306,"Perceiving": 0.579694}}';
  
  request(jpUrl, function(error,response,body){
    //console.log(body);
    var data = JSON.parse(body);
    res.render('results', {typeResult: data});
  });
  
  
});

// "defines an express route for a GET request to the path /submit, whose handler is"
// " "
// RESULTS ROUTES
app.get('/results', function (req,res){
  res.render('results');
});


// SIGNUP ROUTES
app.get('/signup', function (req,res){
  res.render('signup');
});

app.post('/signup', function (req,res){
  res.render('signup');
});


// LOGIN ROUTES
app.get('/login', function (req,res){
  res.render('login');
});

app.post('/login', function (req,res){
  res.render('home');
});


// LOGOUT ROUTES


// 404 ROUTES
app.get('*', function (req, res){
  res.render('404');
});


// SERVER LISTENING EVENT
app.listen(3000, function(req,res){
	console.log('LISTENING ON localhost:3000');
});
