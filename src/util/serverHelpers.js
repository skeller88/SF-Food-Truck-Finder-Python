var _ = require('underscore');

// for use in async.parallel()
exports.collectData = function(res, callback) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('error', function(err) {
        console.error('error', err);
    });

    res.on('end', function() {
        callback(null, body);
    });
};

// Given an array of objects, maps the objects to the foodTruckSchema in
// src/models/foodtruck.js
exports.convertDataToDocs = function(foodTrucksData) {
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
};
