var foodTruckHelpers = require('../util/foodTruckHelpers');

// expects a longitude and latitude query string
exports.findClosest = function(req, res, next) {
    var longitude = parseFloat(req.query.longitude);
    var latitude = parseFloat(req.query.latitude);
    var coordinates = [longitude, latitude];

    foodTruckHelpers.findClosestFoodTrucks(coordinates)
    .then(function(result) {
        res.status(200).send(result);
    });
};