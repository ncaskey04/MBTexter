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

  // console.log(req.query.inputURL);
  // var jpUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Lifestyle/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url= " + query + " &output=json";
  // var result = '{"version": "1.00","success": true,"statusCode": 2000, "errorMessage": "","cls1": {"Judging": 0.420306,"Perceiving": 0.579694}}';

  var query = req.query.inputURL;
  var ieUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Attitude/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=http%3a%2f%2fblog.uclassify.com&output=json";
  var snUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Perceiving%20Function/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=http%3a%2f%2fblog.uclassify.com&output=json";
  var tfUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Judging%20Function/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=http%3a%2f%2fblog.uclassify.com&output=json";
  var jpUrl = "http://uclassify.com/browse/prfekt/Myers%20Briggs%20Lifestyle/ClassifyUrl?readkey=14KCtAbIA3D5KNDRIHYu0dUEOg&url=vajrapani666.tumblr.com&output=json";

    request(ieUrl, function (error,response,body){
    var attitudeData = JSON.parse(body);
    console.log(attitudeData);
    // res.render('results', {attitudeData: attitudeData});

      request(snUrl, function (error,response,body){
        var perceivingData = JSON.parse(body);
        console.log(perceivingData);
        // res.render('results', {attitudeData: attitudeData, perceivingData: perceivingData});

        request(tfUrl, function (error,response,body){
          var  judgingData = JSON.parse(body);
          console.log(judgingData);
          // res.render('results', {attitudeData: attitudeData, perceivingData: perceivingData, judgingData: judgingData});

          request(jpUrl, function (error, response, body){
            var lifestyleData = JSON.parse(body);
            console.log(lifestyleData);
            // res.render('results', {attitudeData: attitudeData, perceivingData: perceivingData, judgingData: judgingData, lifestyleData: lifestyleData});
          });

        });
      });
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
