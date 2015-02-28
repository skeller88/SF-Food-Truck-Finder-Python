var db = require('./../config/db');
var FoodTrucks = db.foodtrucks;

/**
 * @param {options} object - contains the following keys:
 * 'coordinates' - latitude and longitude,
 * 'limit' - number of food trucks to return,
 * 'within' - radius to search within, in miles
 * @param {callback} function - send result of database query to server
 */
exports.findClosestFoodTrucks = function(options, callback) {
    var limit = options.limit || 10;
    var within = options.within || 100000;

    FoodTrucks.ensureIndex({ 'location': '2dsphere' }, function(err, results) {
        FoodTrucks.aggregate([
            {
                '$geoNear': {
                    distanceField: 'distance',
                    // Because of 'spherical: true', the distance is returned
                    // in meters. Convert meters to miles.
                    distanceMultiplier: 1/1609.34,
                    maxDistance: within,
                    near: {
                        type: 'Point',
                        coordinates: options.coordinates
                    },
                    spherical: true
                }
            },
            {
                $limit: limit
            },
            // $sort must be before $project to take advantage of indexes:
            // docs.mongodb.org/manual/reference/operator/aggregation/sort/
            {
                $sort: {
                    distance: 1,
                    name: 1
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

        ], callback);
    });
};