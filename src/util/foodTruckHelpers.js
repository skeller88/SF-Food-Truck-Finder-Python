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

            FoodTruck.collection.insert(foodTrucks, function(err, docs) {
                if (err) {
                    console.error(err);
                    mongoose.disconnect();
                }
                console.log('Added', docs.length, 'food trucks.');

                mongoose.disconnect();
            });
        });
    });

    db.on('error', console.error.bind(console, 'connection error:'));
}

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