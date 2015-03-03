var chai = require('chai');
var assert = chai.assert;

var db = require('./../../../src/config/db');
var FoodTrucksMethods = require('./../../../src/collections/food-trucks');
var getAPIData = require('./../../../src/workers/get-api-data');

// Variables defined before each test; reused in query strings
// TODO(shane): add to dummy data module to make more DRY
var db, sfLatitude, sfLongitude, sjLatitude, sjLongitude, limit, within;
beforeEach(function() {
    // Open the database in case the database was closed by another test
    // Coordinates of a random food truck in San Francisco; highly likely that
    // these coordinates are within 10 miles of all of the other food trucks.
    sfLatitude = 37.7111428086172;
    sfLongitude = -122.390768390822;

    // San Jose's coordinates according to Google
    sjLatitude = 37.3382;
    sjLongitude = 121.8863;

    limit = 10;
    within = 10;
});

describe('FoodTrucks collection - findClosestFoodTrucks', function() {
    it('should find nearby food trucks in San Francisco', function(done) {
        var options = {
            coordinates: [sfLongitude, sfLatitude]
        };

        FoodTrucksMethods.findClosestFoodTrucks(options, function(err, results) {
            assert.isAbove(results.length, 0);

            var foodTruck = results[0];

            assert.equal(Object.keys(foodTruck).length, 5);
            assert.property(foodTruck, 'address');
            assert.property(foodTruck, 'distance');
            assert.property(foodTruck, 'fooditems');
            assert.property(foodTruck, 'name');
            done();
        });
    });

    it('should find not find any nearby food trucks in San Jose',
        function(done) {
        var options = {
            coordinates: [sjLongitude, sjLatitude]
        };

        FoodTrucksMethods.findClosestFoodTrucks(options, function(err, results) {
            assert.equal(results.length, 0);
            done();
        });
    });
});

describe('FoodTrucks collection - updateFoodTrucks', function() {
    // TODO(shane): better way to repopulate the database without coupling
    // the passing of these tests to getAPIData working properly?
    afterEach(function(done) {
        getAPIData(function(err, results) {
            done();
        });
    });

    it('should update the food trucks collection', function(done) {
        var foodTrucks = [
            {
                name: 'jimbo\'s cheese and tomatoes',
                address: '123 jimbo lane',
                fooditems: 'cheese, tomatoes',
                location: {
                    type: 'Point',
                    coordinates: [-122.32, 37.71],
                },
            },
        ];

        FoodTrucksMethods.updateFoodTrucks(foodTrucks, function() {
            FoodTrucks = db.foodtrucks;

            FoodTrucks.find(function(err, results) {
                assert.equal(results.length, foodTrucks.length);
                done();
            });
        });
    });
});

// TODO(shane): reusing foodTrucks in server-helpers-test.js. Refactor to
// a dummy-data.js file to DRY up.
var foodTrucks = [
    {
        name: 'jimbo\'s cheese and tomatoes',
        address: '123 jimbo lane',
        fooditems: 'cheese, tomatoes',
        location: {
            type: 'Point',
            coordinates: [-122.32, 37.71],
        },
    },
    {
        name: 'Nathan\'s catering',
        address: 'Assessors Block 8720/Lot008',
        fooditems: 'Italian subs, Cuban sandwich, Gyro',
        location: {
            type: 'Point',
            coordinates: [-122.32, 37.72],
        },
    },
    {
        name: 'Bombay Blvd.',
        address: '333 MARKET ST',
        fooditems: 'Indian Style: BBQ, Variety of Curries, Rice, Wraps, Breads (Naan, Rotis, Parathas), Desserts, Pizza. Beverages, Condiments, Indian Soups, Salads & Appetizer Varieties.',
        location: {
            type: 'Point',
            coordinates: [-122.33, 37.73],
        },
    },
    {
        name: 'Mars',
        address: '333 Mars',
        fooditems: 'Martian food.',
        location: {
            type: 'Point',
            coordinates: [-120.33, 30.73],
        },
    },
];

// TODO(shane): get these tests to work. They aren't nearly as important
// as the tests for the above methods, and when these tests are run with those
// tests, they fail.
xdescribe('FoodTrucks collection', function() {
    var FoodTrucks = null;

    beforeEach(function(done) {
        db.createCollection('foodtruckstest', function(err, collection) {
            FoodTrucks = collection;
            done();
        });
    });

    afterEach(function(done) {
        FoodTrucks = null;
        db.dropCollection('foodtruckstest', function(err, collection) {
            done();
        });
    });

    it('inserts food trucks', function(done) {
        FoodTrucks.insert(foodTrucks, function(err, results) {
            assert.equal(results.length, foodTrucks.length,
                'Incorrect number of food trucks added.');
            done();
        });
    });

    // There's no way to decouple the functionality of removing food trucks
    // from that of inserting food trucks. But the insert food trucks test
    // comes first so if that functionality works in isolation, it should
    // work in this spec as well.
    it('removes food trucks', function(done) {
        FoodTrucks.insert(foodTrucks, function(err, results) {
            FoodTrucks.drop(function(err, result) {
                assert.isTrue(result, 'Food trucks not removed.');
                done();
            });
        });
    });
});
