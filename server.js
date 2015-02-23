var bodyParser = require('body-parser');
var console = require('console');
var express = require('express');
var http = require('http');
var serveStatic = require('serve-static');

var foodTruckHelpers = require('./src/util/foodTruckHelpers');
var routes = require('./src/routes/routes');

var app = express();

app.set('port', process.env.PORT || 3000);

console.log(__dirname);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(serveStatic(__dirname + '/app'));

app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/app/index.html');
});

// expects a longitude and latitude query string
app.get('/foodtrucks/closest', routes.findClosestFoodTrucks);

foodTruckHelpers.connectToDatabase(function() {
    http.createServer(app).listen(app.get('port'), function() {
        console.info('Server now listening on port', app.get('port'));
    });
});

exports.app = app;