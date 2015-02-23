$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = $;

var FoodTruck = require('../models/FoodTruck');
var geolocation = require('../util/geolocation');

// in meters
var FOOD_TRUCK_RESOURCE = 'http://localhost:3000/foodtrucks/closest';

module.exports = Backbone.Collection.extend({
    getNearbyFoodTrucks: function() {
        console.log('getNearbyFoodTrucks');
        this.fetch({
            data: $.param({
                latitude: this.coordinates.latitude,
                longitude: this.coordinates.longitude
            }),
            error: function(collection, response) {
                console.log('getNearbyFoodTrucks failed ', response);
            },
            success: function(collection, response) {
                console.log('getNearbyFoodTrucks succeeded');
            }
        });
    },
    initialize: function(models, options) {
        this.coordinates = {};
        this.on('updateCoordinates', this.getNearbyFoodTrucks);
        this.updateCoordinates();
    },
    model: FoodTruck,
    updateCoordinates: function() {
        console.log('updateCoordinates');
        var self = this;

        var setCoordinates = function(position) {
            var coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            self.coordinates = coordinates;
            console.log('coordinates are ', self.coordinates);
            self.getNearbyFoodTrucks();
        };

        geolocation(setCoordinates);
    },
    url: FOOD_TRUCK_RESOURCE
});