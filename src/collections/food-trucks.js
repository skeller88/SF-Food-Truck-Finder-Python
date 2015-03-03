var db = require('./../config/db');
var FoodTrucks = db.foodtrucks;

var radiusOfEarthInMiles = 3959;
var metersInAMile = 1609.34;
/**
 * @param {options} object - contains the following keys:
 * 'coordinates' - [longitude, latitude],
 * 'limit' - number of food trucks to return,
 * 'within' - radius to search within, in miles
 * @param {callback} function - expects an Error object as 1st parameter and
 * array as 2nd parameter.
 */
exports.findClosestFoodTrucks = function(options, callback) {
    var limit = options.limit || 10;
    // Must be converted to meters because property 'maxDistance' must be in
    // meters.
    var within = (options.within ? options.within * metersInAMile :
        metersInAMile);

    FoodTrucks.ensureIndex({ 'location': '2dsphere' }, function(err, results) {
        FoodTrucks.aggregate([
            {
                '$geoNear': {
                    distanceField: 'distance',
                    // This query must have the property 'spherical: true'.
                    // Because of that, the distance is returned in meters and
                    // needs to be converted to miles.
                    distanceMultiplier: 1/metersInAMile,
                    maxDistance: within,
                    near: {
                        type: 'Point',
                        coordinates: options.coordinates
                    },
                    spherical: true,
                },
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

/**
 * @param {foodTrucks} array of objects - food truck documents to insert
 * @param {callback} function - optional callback for testing. Could also be
 * used to log results or send results to server.
 * Closes the database after completion, because it's invoked by a worker task.
 * findClosestFoodTrucks() is invoked by an API request, so the server needs
 * to stay connected to the database for other requests.
 *
 * TODO(shane): It's possible that this worker task can cause
 * findClosestFoodTrucks() to fail because the collection is dropped, or
 * partially reloaded. Create an intermediate collection in the worker and
 * promote that collection on a successful insert, then drop the original
 * collection.
 */
exports.updateFoodTrucks = function(foodTrucks, callback) {
    FoodTrucks.drop(function(err, result) {
        // TODO(shane): possible to use error logging middleware in a worker
        // task like in src/config/express.js?
        if (err) {
            console.log(err);
        }

        if (result) {
            console.log('Removed "foodtrucks" collection.');
        } else {
            console.log('"foodtrucks" collection does not exist.');
        }

        FoodTrucks.insert(foodTrucks, function(err, results) {
            if (err) {
                console.log(err);
            }

            console.log('Inserted', results.length ,'food trucks.');

            if (callback) {
                callback(results);
            }
        });
    });
};