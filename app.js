// Get Environment Variables
var dotenv = require('dotenv');
dotenv.load()

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var LocalStrategy = require('passport-local').Strategy;

var userAccounts = [
  { id: 1, username: process.env.ADMIN, password: process.env.PASS, email: process.env.EMAIL}
];

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


// Setting up DB
var db = require('./db');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var admin = require('./routes/admin');

var app = express();




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up passport
app.use( session({ 
  secret: 'thisismyfirstsessionsecretvariable',
  resave: true,
  saveUninitialized: false
 })
);
app.use( passport.initialize() );
app.use( passport.session() );
app.use( flash() );

app.use(function(req,res,next){
  req.db = db;
  next();
});





app.use('/', routes);
app.use('/api', api);
app.use('/admin', admin);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});




module.exports = app;
