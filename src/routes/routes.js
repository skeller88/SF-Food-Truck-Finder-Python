var foodTruckHelpers = require('../util/foodTruckHelpers');

exports.findClosestFoodTrucks = function(req, res, next) {
    var longitude = parseFloat(req.query.longitude);
    var latitude = parseFloat(req.query.latitude);
    var coordinates = [longitude, latitude];
    foodTruckHelpers.findClosestFoodTrucks(coordinates)
    .then(function(result) {
        console.log(result.length);
    });
};