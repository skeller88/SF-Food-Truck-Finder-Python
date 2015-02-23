$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');

module.exports = Backbone.View.extend({
    className: 'foodtruck',
    render: function() {
        console.log('render one FoodTruckView');
        console.log(this.model, this.model.attributes);
        return this.$el.html(this.template(this.model.attributes));
    },
    tagName: 'tr',
    template: _.template(
        '<td><%= distance %><td><%= name %></td><td><%= address %></td>' +
        '<td><%= fooditems %></td>')
});