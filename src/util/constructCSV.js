var _ = require('underscore');
var async = require('async');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var parse = require('csv-parse');

var promise = require('./promise');
var FoodTruck = require('../models/foodtruck');
var foodTruckHelpers = require('./foodTruckHelpers');

// TODO(shane): change token to food truck finder token.
// determine if necessary to encrypt or if cleartext ok.
APP_TOKEN = 'S9xZv2avu4REIdEZhsDGgglvS';
var FOOD_TRUCK_HOST = 'data.sfgov.org';
var FOOD_TRUCK_PATH = '/resource/jjew-r69b.json';

var numRecords = 50000;
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
    // TODO(shane): figure out why JSON.parse(results) throws an error. Then
    // get this try-catch to work.
//        try {
//            foodTrucks = JSON.parse(body);
//            console.log('inside************************', body);
//        } catch(err) {
//            res.statusCode = 400;
//            res.send('error parsing JSON: ' + err.message);
//        }

    var firstFoodTrucks = JSON.parse(results[0]);
    var secondFoodTrucks = JSON.parse(results[1]);

    allFoodTrucks = firstFoodTrucks.concat(secondFoodTrucks);

    foodTruckDocs = convertDataToDocs(allFoodTrucks);

    foodTruckHelpers.updateDatabase(foodTruckDocs);
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

// Given an array of objects, maps the objects to the foodTruckSchema in
// src/models/foodtruck.js
function convertDataToDocs(foodTrucksData) {
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
