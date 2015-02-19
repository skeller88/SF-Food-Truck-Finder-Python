$ = require('jquery');
Backbone = require('backbone');

var FoodTrucksView = require('./FoodTrucksView');

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
        this.foodTrucksView = new FoodTrucksView({
            collection: this.model.get('foodTrucks')
        });
        this.render();
    },
    render: function() {
        console.log('render AppView');
        return this.$el.html(
            this.foodTrucksView.$el);
    }

});