var console = require('console');
var express = require('express');
var http = require('http');

var foodTruckHelpers = require('./util/foodTruckHelpers');
var foodTrucks = require('./routes/foodTrucks');

var app = express();

var db = require('./config/db');
db.connect();

require('./config/express')(app);

// Routes
app.get('/foodtrucks/closest', foodTrucks.findClosest);

http.createServer(app).listen(app.get('port'), function() {
    console.info('Server now listening on port', app.get('port'));
});

exports.app = app;