var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var pjson = require('./package.json');

var routes = require('./routes/index');
var clients = require('./routes/clients');
var users = require('./routes/users');
var projects = require('./routes/projects');

var passport = require('passport');
var authController = require('./routes/auth');

var mongoose = require('mongoose');
mongoose.connect(pjson.mongodburi, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Authorization, Content-Type,      Accept");
    
 // intercept OPTIONS method
 if ('OPTIONS' == req.method) {
   res.status(200).end();
 }
 else {
   next();
 }
 
};
app.use(allowCrossDomain);
app.set('port', (process.env.PORT || 5000));

// Use the passport package in our application
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));





app.use('/', routes);
app.use('/clients',authController.isAuthenticated, clients);
app.use('/users',authController.isAuthenticated, users);
app.use('/projects',authController.isAuthenticated, projects);


//routes

// route to test if the user is logged in or not 
app.get('/loggedin', function(req, res) { res.send(req.isAuthenticated() ? req.user : '0'); }); 

// route to log in 
app.post('/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user); }); 

// route to log out 
app.post('/logout', function(req, res){ req.logOut(); res.send(200); }); 


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* error handlers

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

*/

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;



