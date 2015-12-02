var express = require('express');
var passport = require('passport');

function findById(id,fn) {
  var idx = id -1;
  if (userAccounts[idx]) {
    fn(null,userAccounts[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUserName(name,fn) {
  for(var i = 0, len = userAccounts.length; i < len; i++) {

    var user = userAccounts[i];
  
    if (user.username === name) {
      return fn(null, user);
    }
  }

  return fn(null,null);
}

passport.serializeUser(function(user,done) {
  done(null,user.id);
});

passport.deserializeUser(function(id,done) {
  findById(id,function(err,user) {
    done(err,user);
  });
});

passport.use(new LocalStrategy(
  function(username,password,done) {
    process.nextTick(function() {
      findByUserName(username,function(err,user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Error with user ' + username }); }
        if (user.password != password) { return done(null,false, {message: 'Invalid password'}); }
        return done(null,user);
      })
    });
  }
));

module.exports = passport;