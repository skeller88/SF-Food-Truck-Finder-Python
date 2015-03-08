var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var app = require('./../../src/server');

// Variables defined before each test; reused in query strings
var sfLatitude, sfLongitude, sjLatitude, sjLongitude, limit, within;
beforeEach(function() {
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

describe('Server "/" route - ', function() {
    it('should serve the index.html file', function(done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=UTF-8')
            .expect(200, done);
    });
});

describe('Server "/foodtrucks" route valid requests - ', function() {
    it('valid "longitude", "latitude", "limit", and "within" parameters',
        function(done) {
        var queryString = 'latitude=' + sfLatitude + '&longitude=' +
        sfLongitude + '&limit=' + limit + '&within=' + within;
        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(200, done);
    });

    it('valid "longitude" and "latitude" parameters only',
        function(done) {
        var queryString = 'latitude=' + sfLatitude + '&longitude=' +
        sfLongitude;
        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(200, done);
    });

});

describe('Server "/foodtrucks" route invalid requests - ', function() {
    it('invalid url', function(done) {
        request(app)
            .get('/wrong')
            .expect(404, done);
    });

    it('invalid parameter', function(done) {
        var queryString = 'latitude=' + sfLatitude + '&longitude=' +
        sfLongitude + '&foo=bar';
        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(400, done);
    });

    it('both latitude and longitude are missing', function(done) {
        request(app)
            .get('/foodtrucks')
            .expect(400, done);
    });

    it('latitude is missing', function(done) {
        var queryString = 'latitude=' + sfLatitude;
        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(400, done);
    });

    it('longitude is missing', function(done) {
        var queryString = 'longitude=' + sfLongitude;
        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(400, done);
    });

    it('"limit" <= 0', function(done) {
        limit = 0;
        var queryString = 'latitude=' + sfLatitude + '&longitude=' +
        sfLongitude + '&limit=' + limit;

        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(400, done);
    });

    it('"within" <= 0', function(done) {
        within = 0;
        var queryString = 'latitude=' + sfLatitude + '&longitude=' +
        sfLongitude + '&within=' + within;

        request(app)
            .get('/foodtrucks')
            .query(queryString)
            .expect(400, done);
    });

});
