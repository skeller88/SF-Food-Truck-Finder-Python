$ = require('jquery');
Backbone = require('backbone');

var app = app || {};

app.AppView = Backbone.View.extend({

    el: '#foodtruckapp',
    events: {
        'click #find-foodtrucks': 'findFoodTrucks'
    },

    // event handlers
    findFoodTrucks: function() {
        console.log('findFoodTrucks');
    }
});