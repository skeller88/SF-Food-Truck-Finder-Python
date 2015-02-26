var db = require('./../config/db');

var FoodTrucks = db.collection('foodtrucks');

// expects a longitude and latitude query string
exports.findClosest = function(req, res, next) {
    var longitude = parseFloat(req.query.longitude);
    var latitude = parseFloat(req.query.latitude);
    var coordinates = [longitude, latitude];

    // TODO(shane): refactor database business logic into separate file.
    FoodTrucks.ensureIndex({ 'location': '2dsphere' })
    .then(function() {
        return FoodTrucks.aggregate([
            {
                '$geoNear': {
                    distanceField: 'distance',
                    // radius of Earth to convert radians --> miles
                    distanceMultiplier: 1/3963.192,
                    maxDistance: 10000000,
                    near: {
                        type: 'Point',
                        coordinates: [-122.397585967453, 37.7921033879545]
                    },
                    spherical: true
                }
            },
            {
                $limit: 10
            }
        ]);
    }).then(function(results) {
        console.log(results);
        db.close();
        res.status(200).send(results);
    });
};