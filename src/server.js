var console = require('console');
var express = require('express');
var http = require('http');

var foodTruckHelpers = require('./util/foodTruckHelpers');
var foodTrucks = require('./routes/foodTrucks');

var app = express();

require('./config/express')(app);
app.get('/foodtrucks/closest', foodTrucks.findClosest);

foodTruckHelpers.connectToDatabase(function() {
    http.createServer(app).listen(app.get('port'), function() {
        console.info('Server now listening on port', app.get('port'));
    });
});

exports.app = app;