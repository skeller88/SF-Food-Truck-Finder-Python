$ = require('jquery');
Backbone = require('backbone');

module.exports = Backbone.View.extend({
    className: 'foodtrucks',
    tagName: 'table',
    initialize: function() {
        this.listenTo(this.collection, 'getNearbyFoodTrucks', this.render);
    },
    render: function() {
        this.$el.children().detach();

        this.$el.html('<th>Food Trucks</th>').append(
            this.collection.map(function(foodTruck) {
                return new FoodTruckView({ model: foodTruck }).render();
            })
        );
    }
});