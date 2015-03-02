var db = require('./../config/db');
var FoodTrucks = db.foodtrucks;

var radiusOfEarthInMiles = 3959;
var metersInAMile = 1609.34;
/**
 * @param {options} object - contains the following keys:
 * 'coordinates' - latitude and longitude,
 * 'limit' - number of food trucks to return,
 * 'within' - radius to search within, in miles
 * @param {callback} function - send result of database query to server
 */
exports.findClosestFoodTrucks = function(options, callback) {
    var limit = options.limit || 10;
    // Must be converted to meters because property 'maxDistance' must be in
    // meters.
    var within = options.within * metersInAMile || 1 * metersInAMile ;

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
 * Closes the database after completion, because it's invoked by a worker task.
 * findClosestFoodTrucks() is invoked by an API request, so the server needs
 * to stay connected to the database for other requests.
 */
exports.updateFoodTrucks = function(foodTrucks) {
    FoodTrucks.drop(function(err, result) {
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
            db.close();
        });
    });
};