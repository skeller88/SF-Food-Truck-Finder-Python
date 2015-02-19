$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');
Backbone.$ = $;

var FoodTruck = require('../models/FoodTruck');
var geolocation = require('../util/geolocation');

var APP_TOKEN = 'bjp8KrRvAPtuf809u1UXnI0Z8';
// in meters
var DEFAULT_RADIUS = 100000;
var FOOD_TRUCK_RESOURCE = 'https://data.sfgov.org/resource/rqzj-sfat.json';
var QUERY_STRING_START = '?$where=within_circle(location, ';

module.exports = Backbone.Collection.extend({
    foodTruckKeys: ['address', 'applicant', 'fooditems'],
    getNearbyFoodTrucks: function() {
        console.log('getNearbyFoodTrucks');
        this.fetch({
            error: function(collection, response) {
                console.log('getNearbyFoodTrucks failed ', response);
            },
            success: function(collection, response) {
                console.log('getNearbyFoodTrucks succeeded');
            },
            'X-App-Token': APP_TOKEN
        });
    },
    initialize: function(models, options) {
        this.coordinates = {};
        this.withinRadius = DEFAULT_RADIUS;
        this.on('updateCoordinates', this.getNearbyFoodTrucks);
        this.updateCoordinates();
    },
    model: FoodTruck,
    parse: function(models, options) {
        var self = this;
        return _.map(models, function(model) {
            return _.pick(model, self.foodTruckKeys);
        });
    },
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
    urlRoot: FOOD_TRUCK_RESOURCE,
    url: function() {
        var url = FOOD_TRUCK_RESOURCE + QUERY_STRING_START +
        this.coordinates.latitude + ', ' +
        this.coordinates.longitude + ', ' +
        this.withinRadius + ')';
        return url;
    }
});