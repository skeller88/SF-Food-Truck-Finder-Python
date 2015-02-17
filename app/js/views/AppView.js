$ = require('jquery');
Backbone = require('backbone');
geolocation = require('../util/geolocation');

module.exports = Backbone.View.extend({
    el: '#food-truck-app',
    events: {
        'click #find-foodtrucks': 'findFoodTrucks'
    },
    // event handlers
    findFoodTrucks: function() {
        geolocation();
        console.log('findFoodTrucks');
    },
    initialize: function() {
        console.log('initialized');
    }
});