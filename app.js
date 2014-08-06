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

  // console.log(req.query.inputURL);
  // var jpUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Lifestyle/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url= " + query + " &output=json";
  // var result = '{"version": "1.00","success": true,"statusCode": 2000, "errorMessage": "","cls1": {"Judging": 0.420306,"Perceiving": 0.579694}}';

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
      function(url, done){
        request(url, function (error,response,body){
          var data = JSON.parse(body);
          done(null, data);
        });
      }, 
      function(err, results){
        res.render('results', {attitudeData: results[0], perceivingData: results[1], judgingData: results[2], lifestyleData: results[3]});
    });
});


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
app.listen(process.env.PORT || 3000, function (req,res){
	console.log('SERVER IS STARTING UP!');
});
