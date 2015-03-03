var _ = require('underscore');

// Cache all static files except for .html files.
var re = new RegExp("html$");
exports.cacheControl = function(res, path) {
    console.time('cacheControl');
    if (!re.test(path)) {
        res.setHeader('Cache-Control', 'public, max-age=31557600000');
    }
    console.timeEnd('cacheControl');
};

// Async.parallel() consists of an array of tasks. Each task is passed a
// callback(err, result) which it must call on completion with an
// error err (which can be null) and an optional result value. collectData()
// is invoked by each task to collect the data from a particular request,
// and so collectData() must accept the task callback at the end of data
// collection.
exports.collectData = function(res, callback) {
    var body = '';

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function(err) {
        callback(err, body);
    });
};

// Given an array of objects, maps the objects to the foodtrucks collection
// schema
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

exports.logErrors = function(err, req, res, next) {
    console.error(err.stack);
    next(err);
};

exports.handleErrors = function(err, req, res, next) {
    res.status(res.statusCode || 500);
    res.send(err.message);
};