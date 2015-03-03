var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var app = require('./../../../src/server');
var serverHelpers = require('./../../../src/util/server-helpers');

describe('middleware', function() {
    it('does not cache .html files', function(done) {
        request(app)
            .get('/index.html')
            .expect('Cache-Control', "public, max-age=0")
            .expect(200, done);
    });

    it('caches .css files for 1 year', function(done) {
        request(app)
            .get('/css/main.css')
            .expect('Cache-Control', "public, max-age=31557600000")
            .expect(200, done);
    });
});

describe('convertDataToDocs', function() {
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

    var foodTrucksData = [
        {
            applicant: 'jimbo\'s cheese and tomatoes',
            address: '123 jimbo lane',
            fooditems: 'cheese, tomatoes',
            latitude: '37.71',
            longitude: '-122.32',
        },
        {
            applicant: 'Nathan\'s catering',
            address: 'Assessors Block 8720/Lot008',
            fooditems: 'Italian subs, Cuban sandwich, Gyro',
            latitude: '37.72',
            longitude: '-122.32',
        },
        {
            applicant: 'Bombay Blvd.',
            address: '333 MARKET ST',
            fooditems: 'Indian Style: BBQ, Variety of Curries, Rice, Wraps, Breads (Naan, Rotis, Parathas), Desserts, Pizza. Beverages, Condiments, Indian Soups, Salads & Appetizer Varieties.',
            latitude: '37.73',
            longitude: '-122.33',
        },
        {
            applicant: 'Mars',
            address: '333 Mars',
            fooditems: 'Martian food.',
            latitude: '30.73',
            longitude: '-120.33',
        },
    ];

    it('converts data', function() {
        var docs = serverHelpers.convertDataToDocs(foodTrucksData);
        assert.deepEqual(docs, foodTrucks,
            'Did not properly convert data.');
    });
});