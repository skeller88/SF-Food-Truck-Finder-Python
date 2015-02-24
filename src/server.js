var console = require('console');
var express = require('express');
var http = require('http');

var foodTruckHelpers = require('./util/foodTruckHelpers');
var routes = require('./routes/routes');

var app = express();

require('./config/express')(app);

// expects a longitude and latitude query string
app.get('/foodtrucks/closest', routes.findClosestFoodTrucks);

foodTruckHelpers.connectToDatabase(function() {
    http.createServer(app).listen(app.get('port'), function() {
        console.info('Server now listening on port', app.get('port'));
    });
});

exports.app = app;