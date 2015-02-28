var chai = require('chai');
var assert = chai.assert;

var db = require('./../../src/config/db');

describe('db', function() {
    it('Is a connection object', function() {
        assert.ok(db, 'No connection object created.');
    });

    it('Is named "foodtrucks".', function() {
        assert.equal(db._name, 'foodtrucks');
    });
});