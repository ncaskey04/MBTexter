// setting up requires
var express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    cookieParser = require('cookie-parser'),
    cookieSession = require('cookie-session'),
    flash = require('connect-flash'),
    app = express();
    // db = require('./models/index');

// Middleware for handling forms and ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


// Set up cookieSession: encrypts and names cookies, sets timeout


// start passport, session, and flash


// serialize function (store id at user login)


// deserialize function (check user id for login)


// HOME ROUTES
app.get('/', function (req, res){
  res.render('home');
});


// RESULTS ROUTES


// SIGNUP ROUTES


// LOGIN ROUTES


// LOGOUT ROUTES


// 404 ROUTES


// SERVER LISTENING EVENT
app.listen(3000, function(req,res){
	console.log('LISTENING ON localhost:3000');
});
