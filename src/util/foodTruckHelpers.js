var mongoose = require('mongoose');

var CONNECTION_STRING = require('./dbHelpers').CONNECTION_STRING;
var FoodTruck = require('../models/foodtruck');

exports.updateDatabase = function(foodTrucks) {
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
        FoodTruck.remove(function(err, removedCount) {
            console.log('Removed ', removedCount, ' food truck models.');

            exports.createFoodTrucks(foodTruckDocs)
            .then(function() {
                mongoose.disconnect();
            });
        });
    });

    db.on('error', console.error.bind(console, 'connection error:'));
}

exports.createFoodTrucks = function(foodTrucks) {
    return FoodTruck.create(foodTrucks, function(err, success) {
        if (err) {
            console.error(err);
            mongoose.disconnect();
        }
        var created = Array.prototype.slice.call(arguments, 1);
        console.log('Added', created.length, 'food trucks.');
    });
};

exports.findNearbyFoodTrucks = function() {
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
};