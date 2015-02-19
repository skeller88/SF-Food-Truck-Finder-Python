$ = require('jquery');
Backbone = require('backbone');

var FoodTruckView = require('./FoodTruckView');

module.exports = Backbone.View.extend({
    className: 'foodtrucks',
    tagName: 'table',
    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render);
    },
    render: function() {
        console.log('render FoodTrucksView');
        this.$el.children().detach();

        this.$el.html('<th>Food Trucks</th>').append(
            this.collection.map(function(foodTruck) {
                return new FoodTruckView({ model: foodTruck }).render();
            })
        );
    }
});