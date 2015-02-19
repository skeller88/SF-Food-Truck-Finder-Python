$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;

var FoodTrucks = require('../collections/FoodTrucks');

module.exports = Backbone.Model.extend({
    initialize: function() {
        this.coordinates = {};
        this.set('foodTrucks', new FoodTrucks());
    },
});