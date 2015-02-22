var _ = require('underscore');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var parse = require('csv-parse');

var promise = require('./promise');
var FoodTruck = require('../models/foodtruck');

var CONNECTION_STRING = require('./dbHelpers').CONNECTION_STRING;

// TODO(shane): change token to food truck finder token.
// determine if necessary to encrypt or if cleartext ok.
APP_TOKEN = 'S9xZv2avu4REIdEZhsDGgglvS';
var FOOD_TRUCK_HOST = 'data.sfgov.org';
var FOOD_TRUCK_PATH = '/resource/jjew-r69b.csv';
var queryString1 = '?$limit=50&$order=:id';
var queryString2 = '?$limit=50&$order=:id&$offset=50';

var endpointOptions = {
    headers: {
        'X-App-Token': APP_TOKEN
    },
    host: FOOD_TRUCK_HOST,
    path: FOOD_TRUCK_PATH + queryString1
};

var csvText = '';

http.get(endpointOptions, function(res) {
    addToCSV(res, getRemainingCSVChunks);
});

function addToCSV(res, callback) {
    res.on('data', function(chunk) {
        csvText += chunk;
    });

    res.on('error', function(e) {
        console.log('error fetching data', e.message);
    });

    res.on('end', function() {
        callback(res);
    });
}

function addCSVToDatabase(res) {
    parse(csvText, function(err, foodTrucks) {
        if (err) {
            res.statusCode = 400;
            // res.send('error parsing csv: ' + err.message);
        }

        var foodTruckDocs = convertDataToDocs(foodTrucks);

        console.log(foodTruckDocs);

        mongoose.connect(CONNECTION_STRING);

        var db = mongoose.connection;

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', function() {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });

        db.once('open', function() {
            FoodTruck.remove(function() {
                createFoodTrucks(foodTruckDocs)
                .then(function() {
                    mongoose.disconnect();
                });
            });
        });

        db.on('error', console.error.bind(console, 'connection error:'));
    });
}

// Given an array of objects, maps the objects to the foodTruckSchema in
// src/models/foodtruck.js
function convertDataToDocs(foodTrucksData) {
    return _.map(foodTrucksData, function(foodTruck) {
        return {
            address: foodTruck.location,
            coordinates: [foodTruck.longitude, foodTruck.latitude],
            fooditems: foodTruck.optionaltext,
            name: foodTruck.applicant
        };
    });
}

function createFoodTrucks(foodTrucks) {
    return FoodTruck.create(foodTrucks, function(err, success) {
        if (err) {
            console.error(err);
            mongoose.disconnect();
        }
        var created = Array.prototype.slice.call(arguments, 1);
        console.log('Added', created.length, 'food trucks.');
    });
}

function getRemainingCSVChunks(res) {
    endpointOptions.path = FOOD_TRUCK_PATH + queryString2;

    http.get(endpointOptions, function(res) {
        addToCSV(res, addCSVToDatabase);
    });
}