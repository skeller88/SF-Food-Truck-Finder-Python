var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var app = require('./../../src/server');

// Coordinates of a random food truck in San Francisco; highly likely that
// these coordinates are within 10 miles of all of the other food trucks.
var sfLatitude = 37.7111428086172;
var sfLongitude = -122.390768390822;

// San Jose's coordinates according to Google
var sjLatitude = 37.3382;
var sjLongitude = 121.8863;

var limit = 10;
var within = 10;

xdescribe('Server "/foodtrucks" route', function() {
    it('should return food trucks near a given location', function(done) {
        var queryString = 'latitude=' + sfLatitude + '&longitude=' +
        sfLongitude + '&limit=' + limit + '&within=' + within;

        request(app)
            .get('/foodtrucks' + queryString)
            .expect(200)
            .end(function(err, res) {
                assert.equal(limit, res.body.length);
                done();
            });
    });

    it('should return no food trucks for certain coordinates', function(done) {
        var limit = 10;
        var within = 1;
        var queryString = 'latitude=' + sjLatitude + '&longitude=' +
        sjLongitude + '&limit=' + limit + '&within=' + within;

        request(app)
            .get('/foodtrucks' + queryString)
            .expect(200)
            .end(function(err, res) {
                assert.equal(0, res.body.length);
                done();
            });
    });
});