var mongoose = require('mongoose');

var foodTruckSchema = mongoose.Schema({
    address: String,
    fooditems: String,
    loc: {
        index: '2dsphere',
        type: [Number],
    },
    name: String
});

var FoodTruck = mongoose.model('FoodTruck', foodTruckSchema);

module.exports = FoodTruck;