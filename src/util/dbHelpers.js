// Run using `node src/util/dbHelpers.js`

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');

var FoodTruck = require('../models/foodtruck');

var DEVELOPMENT_ADDRESS = 'mongodb://127.0.0.1:';
var DEVELOPMENT_PORT = 27017;
var DEVELOPMENT_DATABASE = 'foodtruckstest';
var CONNECTION_STRING = DEVELOPMENT_ADDRESS + DEVELOPMENT_PORT +
'/' + DEVELOPMENT_DATABASE;

mongoose.connect(CONNECTION_STRING);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    f = new FoodTruck({
        name: 'test food truck',
        address: '123 jimbo lane',
        fooditems: 'cheese, tomatoes',
        loc: [37.12341234, -36.12341234]
    });

    f.save(function(err, f) {
        if (err) {
            return console.error(err);
        }
        console.log(f);
    });
});