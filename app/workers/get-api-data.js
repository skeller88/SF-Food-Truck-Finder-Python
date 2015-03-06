var _ = require('underscore');
var async = require('async');
var http = require('http');

var db = require('./../config/db');
var FoodTrucks = require('./../collections/food-trucks');
var serverHelpers = require('./../util/server-helpers');

// TODO(shane): change token to food truck finder token, and don't use
// cleartext.
APP_TOKEN = 'S9xZv2avu4REIdEZhsDGgglvS';
var FOOD_TRUCK_HOST = 'data.sfgov.org';
// TODO(shane): refactor to use the larger and more comprehensive data set
// including the times when the food truck is open:
// var FOOD_TRUCK_PATH = '/resource/jjew-r69b.json';
var FOOD_TRUCK_PATH = '/resource/rqzj-sfat.json';

// DataSF limit on number of records per request is 50000. Having two requests
// makes the API future proof for this particular resource. Currently the
// resource only has ~670 records.
var numRecords = 50000;
var queryString1 = '?$limit=' + numRecords + '&$order=:id';
var queryString2 = '?$limit=' + numRecords + '&$order=:id&$offset=' +
numRecords;

var endpointOptions = {
    headers: {
        'X-App-Token': APP_TOKEN
    },
    host: FOOD_TRUCK_HOST,
};

var firstEndpointOptions = _.chain(endpointOptions).clone().extend({
    path: FOOD_TRUCK_PATH + queryString1
}).value();


var secondEndpointOptions = _.chain(endpointOptions).clone().extend({
    path: FOOD_TRUCK_PATH + queryString2
}).value();

/** TODO(shane): right now this logic isn't necessary because I'm not using
 * the larger database at '/resource/jjew-r69b.json'. Keep it anyways because
 * I plan to switch databases soon.
 * TODO(shane): create requests programmatically so that this logic scales
 * if the dataset grows > 100K.

 * @params {endCallback} function - optional, expects 1) an Error object and
 * 2) an array of results consisting of the food trucks inserted into the
 * database
 */
module.exports = function(endCallback){
    async.parallel([
        function(callback) {
            http.get(firstEndpointOptions, function(res) {
                serverHelpers.collectData(res, callback);
            });
        },
        function(callback) {
            http.get(secondEndpointOptions, function(res) {
                serverHelpers.collectData(res, callback);
            });
        }
    ], function(err, results) {
        if (err) {
            console.error(err);
            return;
        }

        // TODO(shane): catch any JSON.parse() exceptions
        var firstFoodTrucks = JSON.parse(results[0]);
        var secondFoodTrucks = JSON.parse(results[1]);

        // TODO(shane): better way to join arrays without copying both arrays
        allFoodTrucks = firstFoodTrucks.concat(secondFoodTrucks);

        foodTruckDocs = serverHelpers.convertDataToDocs(allFoodTrucks);

        console.log('Downloaded ' + foodTruckDocs.length +
            ' food trucks from DataSF.');

        FoodTrucks.updateFoodTrucks(foodTruckDocs, function(results) {
            endCallback(err, results);
        });
    });
};