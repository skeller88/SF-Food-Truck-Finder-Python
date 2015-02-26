var db = require('./../../src/config/db');
var FoodTrucksMethods = require('./../../src/collections/food-trucks-methods');
var FoodTrucks = db.collection('foodtrucks');

var foodTrucks = [
    {
        name: 'jimbo\'s cheese and tomatoes',
        address: '123 jimbo lane',
        fooditems: 'cheese, tomatoes',
        location: {
            type: 'Point',
            coordinates: [-121.3416406, 37.7813239]
        }
    },
    {
        name: 'Nathan\'s catering',
        address: 'Assessors Block 8720/Lot008',
        fooditems: 'Italian subs, Cuban sandwich, Gyro',
        location: {
            type: 'Point',
            coordinates: [-122.391771646847, 37.7714019465879]
        }
    },
    {
        name: 'Bombay Blvd.',
        address: '333 MARKET ST',
        fooditems: 'Indian Style: BBQ, Variety of Curries, Rice, Wraps, Breads (Naan, Rotis, Parathas), Desserts, Pizza. Beverages, Condiments, Indian Soups, Salads & Appetizer Varieties.',
        location: {
            type: 'Point',
            coordinates: [-122.397585967453, 37.7921033879545]
        }
    }
];

FoodTrucksMethods.deleteFoodTrucks().then(function(results) {
    console.log(results);
    db.close();
});

// FoodTrucksMethods.updateFoodTrucks(foodTrucks).then(function(results) {
//     console.log(results);
// });

// FoodTrucksMethods.findClosestFoodTrucks([-122.397585967453, 37.7921033879545])
// .then(function(err, result) {
//     console.log(err, result);
// });


// FoodTrucks.drop().then(function(err, r) {
//     console.log('err', err, '\nr', r, '\n');
//     return FoodTrucks.insert(foodTrucks);
// }).then(function(err, r) {
//     console.log('err', err, '\nr', r, '\n');
//     return FoodTrucks.ensureIndex({ 'location': '2dsphere' });
// }).then(function(err, r) {
//     console.log('err', err, '\nr', r, '\n');
//     return FoodTrucks.aggregate([
//         {
//             '$geoNear': {
//                 distanceField: 'distance',
//                 // radius of Earth to convert radians --> miles
//                 distanceMultiplier: 1/3963.192,
//                 maxDistance: 10000000,
//                 near: {
//                     type: 'Point',
//                     coordinates: [-122.397585967453, 37.7921033879545]
//                 },
//                 spherical: true
//             }
//         },
//         {
//             $limit: 10
//         }
//     ]);
// }).then(function(err, r) {
//     console.log('err', err, '\nr', r, '\n');
//     db.close();
// });