var chai = require('chai');
var assert = chai.assert;

var db = require('./../../src/config/db');

describe('FoodTrucks collection', function() {
    var FoodTrucks = null;

    var foodTrucks = [
        {
            name: 'jimbo\'s cheese and tomatoes',
            address: '123 jimbo lane',
            fooditems: 'cheese, tomatoes',
            location: {
                type: 'Point',
                coordinates: [-122.32, 37.71]
            },
        },
        {
            name: 'Nathan\'s catering',
            address: 'Assessors Block 8720/Lot008',
            fooditems: 'Italian subs, Cuban sandwich, Gyro',
            coordinates: [-122.32, 37.72]
        },
        {
            name: 'Bombay Blvd.',
            address: '333 MARKET ST',
            fooditems: 'Indian Style: BBQ, Variety of Curries, Rice, Wraps, Breads (Naan, Rotis, Parathas), Desserts, Pizza. Beverages, Condiments, Indian Soups, Salads & Appetizer Varieties.',
            coordinates: [-122.33, 37.73]
        },
        {
            name: 'Mars',
            address: '333 Mars',
            fooditems: 'Martian food.',
            coordinates: [-120.33, 30.73]
        }
    ];

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
            FoodTrucks.drop(function(err, numRemoved) {
                assert.equal(numRemoved, foodTrucks.length,
                    'Incorrect number of food trucks removed.');
                done();
            });
        });
    });
});
