var console = require('console');
var express = require('express');
var http = require('http');

var foodTrucks = require('./routes/food-truck');

var app = express();

var db = require('./config/db');

require('./config/express')(app);

// Routes
app.get('/foodtrucks', foodTrucks.find);

http.createServer(app).listen(app.get('port'), function() {
    console.info('Server now listening on port', app.get('port'));
});

// From Node docs: Emitted when an exception bubbles all the way back to
// the event loop. Since a listener is added for this exception, the default
// action (which is to print a stack trace and exit) will not occur.
// This is a last resort safety mechanism.
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

exports.app = app;