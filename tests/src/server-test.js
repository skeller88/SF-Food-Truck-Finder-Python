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
