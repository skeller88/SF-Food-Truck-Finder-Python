var chai = require('chai');
var assert = chai.assert;
var request = require('supertest');

var app = require('./../../../src/server');
var serverHelpers = require('./../../../src/util/server-helpers');
var testResponse = require('./../../../src/routes/server-test').testResponse;

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

});