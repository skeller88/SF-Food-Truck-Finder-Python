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
// src/models/foodTruck.js
exports.convertDataToDocs = function(foodTrucksData) {
    return _.map(foodTrucksData, function(foodTruck) {
        var latitude = parseFloat(foodTruck.latitude);
        var longitude = parseFloat(foodTruck.longitude);

        if (isNaN(latitude) || isNaN(longitude)) {
            latitude = longitude = 0;
        }

        return {
            address: foodTruck.address,
            fooditems: foodTruck.fooditems,
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            name: foodTruck.applicant
        };
    });
};
