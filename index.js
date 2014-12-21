var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:myCRM1@ds027771.mongolab.com:27771/heroku_app32701444', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var clients = require('./routes/clients');
app.use('/clients', clients);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

