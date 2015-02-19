$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

var FoodTruck = require('../models/FoodTruck');
var geolocation = require('../util/geolocation');

// in meters
var DEFAULT_RADIUS = 100000;
var FOOD_TRUCK_RESOURCE = 'https://data.sfgov.org/resource/rqzj-sfat.json';
var QUERY_STRING_START = '?$where=within_circle(location, ';

module.exports = Backbone.Collection.extend({
    getNearbyFoodTrucks: function() {
        console.log('get food trucks');
        this.fetch({
            'X-App-Token': 'bjp8KrRvAPtuf809u1UXnI0Z8'
        });
    },
    initialize: function(models, options) {
        this.coordinates = {};
        this.withinRadius = DEFAULT_RADIUS;
        this.set('withinRadius', DEFAULT_RADIUS);
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
    urlRoot: FOOD_TRUCK_RESOURCE,
    url: function() {
        var url = FOOD_TRUCK_RESOURCE + QUERY_STRING_START +
        this.coordinates.latitude + ', ' +
        this.coordinates.longitude + ', ' +
        this.withinRadius + ')';
        return url;
    }
});