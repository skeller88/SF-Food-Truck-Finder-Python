$ = require('jquery');
_ = require('underscore');
Backbone = require('backbone');

module.exports = Backbone.View.extend({
    className: 'foodtruck',
    render: function() {
        return this.$el.html(this.template(this.model.attributes));
    },
    tagName: 'tr',
    template: _.template(
        '<td><%= applicant %></td><td><%= address %></td><td><%= fooditems %></td>')
});