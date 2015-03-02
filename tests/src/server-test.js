var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var app = require('./../../src/server');
var testResponse = require('./../../src/routes/server-test').testResponse;

describe('Server "/test" route', function() {
    it('should respond to valid requests', function(done) {
        request(app)
            .get('/test')
            .expect(200)
            .end(function(err, res) {
                assert.equal(testResponse, res.text);
                done();
            });
    });

    it('should not respond to invalid requests', function(done) {
        request(app)
            .get('/wrong')
            .expect(404, done);
    });
});

// Coordinates of a random food truck in San Francisco; highly likely that
// these coordinates are within 10 miles of all of the other food trucks.
var sfLatitude = 37.7111428086172;
var sfLongitude = -122.390768390822;

// San Jose's coordinates according to Google
var sjLatitude = 37.3382;
var sjLongitude = 121.8863;

describe('Server "/foodtrucks" route', function() {
    it('should respond to valid requests', function(done) {
        var limit = 10;
        var within = 10;
        var queryString = '?latitude=' + sfLatitude + '&longitude=' +
        sfLongitude + '&limit=' + limit + '&within=' + within;

        request(app)
            .get('/foodtrucks' + queryString)
            .expect(200)
            .end(function(err, res) {
                assert.equal(limit, res.body.length);
                done();
            });
    });
});
