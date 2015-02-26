var _ = require('underscore');

// Cache all static files except for .html files.

var re = new RegExp("html$");

// Utility functions
exports.cacheControl = function(res, path) {
    console.time('cacheControl');
    if (!re.test(path)) {
        res.setHeader('Cache-Control', 'public, max-age=31557600000');
    }
    console.timeEnd('cacheControl');
};

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
    console.log(foodTrucksData);
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
