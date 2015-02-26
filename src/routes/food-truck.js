var db = require('./../config/db');

var FoodTrucks = db.collection('foodtrucks');

// expects a longitude and latitude query string
exports.find = function(req, res, next) {
    var limit = req.query.limit || 10;
    var maxDistance = req.query.within || 100000;
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
                    // Because of 'spherical: true', the distance is returned
                    // in meters. Convert meters to miles.
                    distanceMultiplier: 1/1609.34,
                    maxDistance: maxDistance,
                    near: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    spherical: true
                }
            },
            {
                $project: {
                    _id: 0,
                    address: 1,
                    distance: 1,
                    fooditems: 1,
                    location: 1,
                    name: 1
                }
            },
            {
                $limit: limit
            }
        ]);
    }).then(function(results) {
        console.log(results);
        db.close();
        res.status(200).send(results);
    });
};