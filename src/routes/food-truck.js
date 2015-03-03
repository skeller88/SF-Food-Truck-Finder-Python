var db = require('./../config/db');
var FoodTrucks = require('./../collections/food-trucks');

// Expects a longitude and latitude query string, and handles the logic of
// defining the optional paramaters "limit" and "within", as well as ensuring
// the proper type of all parameters.
// TODO(shane): implement paging for requests with higher limits (> 30)
exports.find = function(req, res, next) {
    var validParams = {
        latitude: true,
        limit: true,
        longitude: true,
        within: true,
    };

    for (var param in req.query) {
        if (req.query.hasOwnProperty(param) && !validParams[param]) {
            res.status(400);
            return next(new Error('Invalid query parameter.'));
        }
    }

    var limit, within, longitude, latitude;
    try {
        // TODO(shane): make translation of query string to integers
        // into middleware or an inner function in this route handler.
        // TODO(shane): changing the default values of "limit" and "within" may
        // cause certain tests to fail. Make less brittle.
        limit = req.query.limit ? parseInt(req.query.limit) : 10;
        within = req.query.within ? parseInt(req.query.within) : 2;
        longitude = req.query.longitude ? parseFloat(
            req.query.longitude) : undefined;
        latitude = req.query.latitude ? parseFloat(
            req.query.latitude) : undefined;

    } catch(err) {
        res.status(400);
        return next(err);
    }

    if (!(latitude && longitude)) {
        res.status(400);
        return next(new Error('Both latitude and longitude must be defined.'));
    }

    if (limit <= 0 || within <= 0) {
        res.status(400);
        return next(new Error('Limit and within must be >= 0.'));
    }

    var coordinates = [longitude, latitude];

    var options = {
        coordinates: coordinates,
        limit: limit,
        within: within
    };

    FoodTrucks.findClosestFoodTrucks(options, function (err, results) {
        if (err) {
            next(err);
        } else {
            res.status(200).send(results);
        }
    });
};