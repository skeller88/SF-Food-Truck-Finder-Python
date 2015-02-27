// TODO(shane): make automated tests rather than manually checking
// expected output in the command line
// Run using `node src/util/dbHelpers.js
var db = require('./../../src/config/db');

var FoodTrucksTest;

beforeEach(function() {
    FoodTrucksTest = db.createCollection('foodtruckstest');
});

afterEach(function() {
    db.dropCollection('foodtruckstest');
});


console.log(FoodTrucksTest);
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
