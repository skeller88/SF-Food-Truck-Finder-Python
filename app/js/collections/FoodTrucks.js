$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

// in meters
var DEFAULT_RADIUS = 100000;
var FOOD_TRUCK_RESOURCE = 'https://data.sfgov.org/resource/rqzj-sfat.json';
var QUERY_STRING_START = '?$where=within_circle(location, ';

module.exports = Backbone.Collection.extend({
    initialize: function(models, options) {
        this.coordinates = options.coordinates;
        this.withinRadius = options.withinRadius || DEFAULT_RADIUS;
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