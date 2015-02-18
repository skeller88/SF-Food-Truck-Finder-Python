$ = require('jquery');
Backbone = require('backbone');

module.exports = Backbone.View.extend({
    el: '#food-truck-app',
    events: {
        'click #find-foodtrucks': 'findFoodTrucks'
    },
    // event handlers
    findFoodTrucks: function() {
        // emit event to model
        console.log('findFoodTrucks');
    },
    initialize: function() {
        console.log('initialized');
    }
});