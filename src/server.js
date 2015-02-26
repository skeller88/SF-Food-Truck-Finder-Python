var console = require('console');
var express = require('express');
var http = require('http');

var foodTrucks = require('./routes/food-truck');

var app = express();

var db = require('./config/db');

require('./config/express')(app);

// Routes
app.get('/foodtrucks/closest', foodTrucks.findClosest);

http.createServer(app).listen(app.get('port'), function() {
    console.info('Server now listening on port', app.get('port'));
});

exports.app = app;