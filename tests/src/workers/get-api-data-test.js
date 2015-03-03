var chai = require('chai');
var assert = chai.assert;

var getAPIData = require('./../../../src/workers/get-api-data');

// Since getAPIData invokes updateFoodTrucks() in src/collections/food-trucks,
// that function must pass all of its tests in order for the following tests
// to pass.
describe('getAPIData', function() {
    it('should fetch the most recent food trucks from DataSF', function(done) {
        getAPIData(function(err, results) {
            // This assertion is a bit brittle, but 670 is generally the amount
            // of food trucks returned from the food truck resource.
            assert.isAbove(results.length, 670);

            var foodTruck = results[0];
            assert.property(foodTruck, 'address');
            assert.property(foodTruck, 'fooditems');
            assert.property(foodTruck, 'name');
            assert.property(foodTruck, 'location');

            var location = foodTruck.location;

            assert.property(location, 'type');
            assert.property(location, 'coordinates');
            done();
        });
    });
});
