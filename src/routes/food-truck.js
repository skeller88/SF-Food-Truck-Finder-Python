var db = require('./../config/db');

var FoodTrucks = require('./../collections/food-trucks');

// expects a longitude and latitude query string
exports.find = function(req, res, next) {
    var limit = req.query.limit;
    var within = req.query.within;
    var longitude = parseFloat(req.query.longitude);
    var latitude = parseFloat(req.query.latitude);
    var coordinates = [longitude, latitude];

    var options = {
        coordinates: coordinates,
        limit: limit,
        within: within
    };

    function sendResponse(err, results) {
        if (err) {
            res.status(500).send('Database query failed: ' + err);
        }
        res.status(200).send(results);
    }

    FoodTrucks.findClosestFoodTrucks(options, sendResponse);
};