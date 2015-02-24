var findClosestFoodTrucks = require('./../models/foodTruck')
.findClosestFoodTrucks;

// expects a longitude and latitude query string
exports.findClosest = function(req, res, next) {
    var longitude = parseFloat(req.query.longitude);
    var latitude = parseFloat(req.query.latitude);
    var coordinates = [longitude, latitude];

    findClosestFoodTrucks(coordinates)
    .then(function(result) {
        console.log(result);
        res.status(200).send(result);
    });
};