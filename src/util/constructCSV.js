var _ = require('underscore');
var async = require('async');
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
var FOOD_TRUCK_PATH = '/resource/jjew-r69b.json';

var numRecords = 5;
var queryString1 = '?$limit=' + numRecords + '&$order=:id';
var queryString2 = '?$limit=' + numRecords + '&$order=:id&$offset='
    + numRecords;

var firstEndpointOptions = {
    headers: {
        'X-App-Token': APP_TOKEN
    },
    host: FOOD_TRUCK_HOST,
    path: FOOD_TRUCK_PATH + queryString1
};

var secondEndpointOptions = {
    headers: {
        'X-App-Token': APP_TOKEN
    },
    host: FOOD_TRUCK_HOST,
    path: FOOD_TRUCK_PATH + queryString2
};

// Two requests are enough to get all of the food truck data (~55k records)
// given that only 50k records can be returned per API call.
// TODO(shane): create requests programmatically so that this logic scales
// if the dataset grows > 100K.
async.parallel([
    function(callback) {
        http.get(firstEndpointOptions, function(res) {
            collectData(res, callback);
        })
    },
    function(callback) {
        var body = '';

        http.get(secondEndpointOptions, function(res) {
            collectData(res, callback);
        })
    }
], function(err, results) {
    //TODO(shane): figure out why JSON.parse(results) throws an error
    var firstFoodTrucks = JSON.parse(results[0]);
    var secondFoodTrucks = JSON.parse(results[1]);

    allFoodTrucks = firstFoodTrucks.concat(secondFoodTrucks);
    console.log(allFoodTrucks.length)
});

// for use in async.parallel()
function collectData(res, callback) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('error', function(err) {
        console.error('error', err)
    });

    res.on('end', function() {
        callback(null, body)
    });
}

function addToDatabase(res) {

//    try {
//        foodTrucks = JSON.parse(body);
//        console.log('inside************************', body);
//    } catch(err) {
//        res.statusCode = 400;
////        res.send('error parsing JSON: ' + err.message);
//    }

    var foodTruckDocs = convertDataToDocs(foodTrucks);

    console.log(foodTruckDocs.length);

    mongoose.connect(CONNECTION_STRING);

    var db = mongoose.connection;

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

//    db.once('open', function() {
//        createFoodTrucks(foodTruckDocs)
//        .then(findNearbyFoodTrucks)
//        .then(cleanup);
//    });

    db.on('error', console.error.bind(console, 'connection error:'));
}


function cleanup() {
    FoodTruck.remove(function(err, removedCount) {
        console.log('Removed ', removedCount, ' food truck models.');
        mongoose.disconnect();
    });
}

// Given an array of objects, maps the objects to the foodTruckSchema in
// src/models/foodtruck.js
function convertDataToDocs(foodTrucksData) {
    console.log('convert data', foodTrucksData);
    return _.map(foodTrucksData, function(foodTruck) {
        var latitude = parseFloat(foodTruck.latitude);
        var longitude = parseFloat(foodTruck.longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            latitude = longitude = 0;
        }

        return {
            address: foodTruck.address,
            coordinates: [longitude, latitude],
            fooditems: foodTruck.fooditems,
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

function findNearbyFoodTrucks() {
    var point = {
        coordinates: [-121.2416406, 37.7813239],
        type: 'Point'
    };

    return  FoodTruck.aggregate([{
        $geoNear: {
            distanceField: 'distance',
            // radius of Earth to convert radians --> miles
            distanceMultiplier: 1/3963.192,
            near: point,
            spherical: true
        }
    }], function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log('\n', '---------Nearby Food Trucks---------', '\n', result);
    });
}
