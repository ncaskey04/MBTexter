
var bcrypt = require("bcrypt");
var passport = require("passport");
var passportLocal = require("passport-local");
var salt = bcrypt.genSaltSync(10);

module.exports = function (sequelize, DataTypes){
   var User = sequelize.define('user', {
     username: { 
        type: DataTypes.STRING, unique: true, allowNull: false, validate: {
          len: [6, 30]
        }
    },
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    },
    
  {
    classMethods: {
      associate: function(db) {
        User.belongsTo(db.mbtype);
      },
      encryptPass: function(password) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
    }, 
      comparePass: function(userpass, dbpass) {
      // don't salt twice when you compare....watch out for this
        return bcrypt.compareSync((userpass), dbpass);  
    },
      createNewUser:function(email, username, password, err, success ) {
        if(password.length < 6) {
          err({message: "Password should be more than six characters"});
        }
        else{
        User.create({ 
            email: email,
            username: username,
            password: this.encryptPass(password),
          }).error(function(error) {
            console.log(error);
            if(error.username){
              err({message: 'Your username should be at least 6 characters long', username: username});
            }
            else{
              err({message: 'An account with that username already exists', username: username});
              }
          }).success(function(user) {
            success({message: 'Account created, please log in now'});
          });
        }
      },  
    
      } // close classMethods
    } //close classMethods outer 

  ); // close define user

  passport.use(new passportLocal.Strategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback : true
    },

    function(req, username, password, done) {
      // find a user in the DB
      User.find({
          where: {
            username: username
          }
        })
        // when that's done, 
        .done(function(error,user){
          if(error){
            console.log(error);
            return done (err, req.flash('loginMessage', 'Oops! Something went wrong.'));
          }
          if (user === null){
            return done (null, false, req.flash('loginMessage', 'Username does not exist.'));
          }
          if ((User.comparePass(password, user.password)) !== true){
            return done (null, false, req.flash('loginMessage', 'Invalid Password'));
          }
          done(null, user); 
        });
    }));
      
  return User;
}; // close User function

