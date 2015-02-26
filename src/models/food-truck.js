var db = require('./../config/db');
var FoodTrucks = db.foodtrucks;

// exports.getCollection = function(name) {
//     var collection = db.collection(name, { strict: true }, function(err) {
//         if (err) {
//             var collection = db.createCollection(name, function(err, r) {
//                 console.log('Collection created: ', 'err', err, 'success\n', r);
//             });
//         }
//     });

//     return collection;
// };
/**
 * @param {array} coordinates - [longitude, latitude]
 * @param {within} integer - maximum radius to search around coordinate
 */
exports.findClosestFoodTrucks = function(coordinates, within) {
    var maxTrucksToShow = 100;
    var within = within || 1000000;

    FoodTrucks.aggregate([
        {
            '$geoNear': {
                distanceField: 'distance',
                // radius of Earth to convert radians --> miles
                distanceMultiplier: 1/3963.192,
                maxDistance: within,
                near: {
                    type: 'Point',
                    coordinates: coordinates
                },
                spherical: true
            }
        },
        {
            $limit: maxTrucksToShow
        }
    ], function(err, r) {
        console.log('err', err, '\nr', r);
    });
};

exports.insertFoodTrucks = function(foodTrucks) {
    FoodTrucks.insertMany(foodTrucks, function(err, r) {
        console.log('err', err, '\nr', r);
    });
};

exports.removeFoodTrucks = function() {
    FoodTrucks.drop(function(err, r) {
        console.log('err', err, '\nr', r);
    });
};

// var mongoose = require('mongoose');

// var foodTruckSchema = mongoose.Schema({
//     address: String,
//     fooditems: String,
//     coordinates: {
//         index: '2dsphere',
//         // [longitude, latitude]
//         type: [Number]
//     },
//     name: String
// });

// exports.FoodTruck = mongoose.model('FoodTruck', foodTruckSchema);

// exports.findClosestFoodTrucks = function(coordinates) {
//     var point = {
//         coordinates: coordinates,
//         type: 'Point'
//     };

//     return  exports.FoodTruck.aggregate([{
//         $geoNear: {
//             distanceField: 'distance',
//             // radius of Earth to convert radians --> miles
//             distanceMultiplier: 1/3963.192,
//             near: point,
//             spherical: true
//         }
//     }], function(err, result) {
//         if (err) {
//             throw Error(err);
//         }
//         console.log(result);
//         return result;
//     });
// };

// /**
//  * @param {array} foodTrucks - The food trucks fetched from server and
//  * transformed, ready to be inserted into the database.
//  */
// exports.updateFoodTrucks = function(foodTrucks) {
//     return exports.FoodTruck.removeAsync().then(function(results) {
//         if (!results[1].ok) {
//             console.error('Error removing food trucks.');
//         }

//         console.log('Removed ', results[0], ' food truck models.');

//         exports.FoodTruck.collection.insert(foodTrucks, function(err, docs) {
//             if (err) {
//                 console.error(err);
//                 throw Error(err);
//             }
//             console.log('Added', docs.length, 'food trucks.');
//             return;
//         });
//     });
// };

