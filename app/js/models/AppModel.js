$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

var FoodTrucks = require('../collections/FoodTrucks');
var geolocation = require('../util/geolocation');

module.exports = Backbone.Model.extend({
    initialize: function() {
        var self = this;
        var setUserPosition = function(position) {
            var coordinates = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };

            self.set('foodTrucks', new FoodTrucks([], {
                coordinates: coordinates
            }));

            self.get('foodTrucks').fetch({
                'X-App-Token': 'bjp8KrRvAPtuf809u1UXnI0Z8'
            });
        };

        geolocation(setUserPosition);
    },
});